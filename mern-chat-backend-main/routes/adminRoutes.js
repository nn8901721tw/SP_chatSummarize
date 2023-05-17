const router = require('express').Router();
const Message = require('../models/Message');
const Process = require('../models/Process');
const { spawn } = require('child_process');
const { exec } = require('child_process');
const execSync = require("child_process").execSync;
const { log } = require('console');
const fs = require('fs');
const path = require('path');


function runPythonScript(inputData) {
    const pythonScriptPath = path.join(__dirname, '../../python1/model.py');
    const command = `python ${pythonScriptPath} "${JSON.stringify(inputData).replace(/"/g, '\\"')}"`;
    const output = execSync(command);
    return output.toString();
}

//NLP MODEL_exec
router.get('/inference', async (req, res) => {
    const { to, user } = req.query;       //接收到的user為 Json string 格式
    console.log(to);
    console.log("user :" + user);
    try {
        const messages = await Message.find({ to }, 'from.name content');
        const inputData = {
            text: messages.reduce((accumulator, message) => {
                return `${accumulator}${message.from.name}: ${message.content} `;
            }, "")
        };
        console.log(inputData);
        const output = runPythonScript(inputData);

        const userData = JSON.parse(user);          // 將user從 Json string 格式 轉為 Json Object

        console.log("userData為" + userData);
        const { name, email, status, _id, __v } = userData;
        const formattedUser = {
            name,
            email,
            status,
            _id,
            __v
        };
        console.log("format :  是" + typeof (formattedUser) + name + "END");

        const currentTime = Date.now();

        const newProcess = await Process.create({
            result: output,
            from: formattedUser,
            to,
            createdAt: currentTime
        });


        console.log(newProcess);

        // 在這裡處理回傳的結果
        res.send(output);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error running Python script');
    }
});

// 呈現 Inference後的結果 ，在 Process Component 呈現 。
router.get('/process', async (req, res) => {
    const { fromId } = req.query;

    try {
        let query = {};

        if (fromId) {
            query = { 'from._id': fromId };
        }

        const processData = await Process.find(query);
        res.json(processData);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving Process data');
    }
});



// NLP MODEL _spawn
// router.get('/inference', async (req, res) => {
//     const { to } = req.query;
//     console.log(to);
//     try {

//         const messages = await Message.find({ to }, 'from.name content');
//         const inputData = {
//             text: messages.reduce((accumulator, message) => {
//                 return `${accumulator}${message.from.name}: ${message.content} `;
//             }, '')
//         };
//         console.log(inputData);
//         console.log(typeof (inputData));

//         const pythonScriptPath = path.join(__dirname, '../../python1/model.py');
//         const pythonProcess = spawn('python', [pythonScriptPath, JSON.stringify(inputData)]);

//         let data1 = "";
//         pythonProcess.stdout.on('data', (data) => {
//             console.log(`Python output: ${data}`);
//             data1 = data;
//         });

//         const redirectUrl = '/chat/inferenceResult';
//         pythonProcess.stdout.on('end', () => {
//             console.log(`Python process exited with code 0 and output: ${data1}`);
//             res.send("data1");
//             // try {
//             //     const inferenceResult = JSON.parse(data1);
//             //     const resultData = {
//             //         data: inferenceResult,
//             //         messages: messages.map((message) => {
//             //             return {
//             //                 from: message.from.name,
//             //                 content: message.content
//             //             };
//             //         })
//             //     };
//             //     res.json(resultData);
//             // } catch (error) {
//             //     console.error(`Error parsing inference result: ${error}`);
//             //     res.status(500).send({ error: 'Error parsing inference result.' });
//             // }
//         });


// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send(err);
// //     }
// // });






// wordcloud
router.get('/wordCloud', async (req, res) => {
    const { to } = req.query;
    console.log(to);

    try {
        const messages = await Message.find({ to }, 'from.name content');
        const inputData = {
            text: messages.reduce((accumulator, message) => {
                return `${accumulator}${message.from.name}: ${message.content} `;
            }, "")
        };
        console.log(inputData);

        const contents = messages.map(message => message.content);
        console.log(contents)
        console.log(typeof contents)

        // 將收到的訊息轉成文字檔
        fs.writeFileSync(path.join(__dirname, '../../python1/img/data2.txt'), contents.join('\n'));

        // 執行Python腳本，生成文字雲並返回圖片路徑
        const pythonProcess = spawn('python', [path.join(__dirname, '../../python1/wc.py')]);

        pythonProcess.stdout.on('data', data => {
            const imagePath = path.join(data.toString().trim());
            console.log(imagePath)
            console.log('Wordcloud image path:', imagePath);

            // 將圖片轉換為 Base64 字符串
            const base64Image = getImageAsBase64(imagePath);
            console.log(base64Image);

            // 返回圖片的 Base64 字符串
            res.send(base64Image);
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

function getImageAsBase64(imagePath) {
    const imageData = fs.readFileSync(imagePath);
    const base64Image = Buffer.from(imageData).toString('base64');
    return base64Image;
};

module.exports = router