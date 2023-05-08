const router = require('express').Router();
const Message = require('../models/Message');
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
        const output = runPythonScript(inputData);

        // 在這裡處理回傳的結果
        res.send(output);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error running Python script');
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
        const messages = await Message.find({ to }, 'content');
        res.send(messages);

        const contents = messages.map(message => message.content);

        // 將收到的訊息轉成文字檔
        fs.writeFileSync('D:/user/Desktop/MERN/mernchat/python1/img/data.txt', JSON.stringify(contents));
        // 將數據作為JSON字符串傳遞給Python腳本

        const pythonProcess = spawn('python', ['D:/user/Desktop/MERN/mernchat/python1/word123.py', JSON.stringify(contents)]);

        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python output: ${data}`);

        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python error: ${data}`);
        });

        // pythonProcess.on('close', (code) => {
        //     if (code === 0) {
        //         const imagePath = path.join(__dirname, '../../python1/img/wordcloud.png');
        //         if (fs.existsSync(imagePath)) {
        //             const imageData = fs.readFileSync(imagePath);
        //             // 將圖片資料回傳給前端
        //             res.set('Content-Type', 'image/png');
        //             res.send(imageData);
        //         } else {
        //             console.error('Wordcloud image not found');
        //             res.sendStatus(404);
        //         }
        //     } else {
        //         console.error(`Python process exited with code ${code}`);
        //         res.sendStatus(500);
        //     }
        // });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});


module.exports = router