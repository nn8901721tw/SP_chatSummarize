const router = require('express').Router();
const Message = require('../models/Message');
const { spawn } = require('child_process');
const { log } = require('console');
const fs = require('fs');
const path = require('path');

//NLP MODEL
router.get('/inference', async (req, res) => {
    const { to } = req.query;
    console.log(to);
    try {

        const messages = await Message.find({ to }, 'from.name content');
        const inputData = {
            text: messages.reduce((accumulator, message) => {
                return `${accumulator}${message.from.name}: ${message.content} `;
            }, '')
        };
        console.log(inputData);
        console.log(typeof (inputData));
        //////////////////////////////////////////////////////////////////////////////////
        // const messages = await Message.find({ to }, 'content');
        // res.send(messages);
        // const inputData = messages.map(message => message.content);
        //////////////////////////////////////////////////////////////////////////////////
        // // 將收到的訊息轉成文字檔
        // fs.writeFileSync('D:/user/Desktop/MERN/mernchat/python1/img/data.txt', JSON.stringify(contents));
        // 將數據作為JSON字符串傳遞給Python腳本

        //範例data
        // const inputData = {
        //     text: "Jeff: Can I train a Transformers model on Amazon SageMaker? Philipp: Sure you can use the new Hugging Face Deep Learning Container. Jeff: ok. Jeff: and how can I get started? Jeff: where can I find documentation? Philipp: ok, ok you can find everything here.",
        // };
        const pythonProcess = spawn('python', ['D:/user/Desktop/MERN/SP_mernchat/python1/model.py', JSON.stringify(inputData)]);
        let data1 = "";
        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python output: ${data}`);
            data1 = data;
            // res.redirect(302, '/chat/inferenceResult?data=' + encodeURIComponent(data));
        });

        // pythonProcess.stdout.on('end', () => {
        //     console.log(`Python process exited with code 0 and output: ${data1}`);
        //     window.location.href = `/chat/inferenceResult?data=${encodeURIComponent(data1)}`;
        // });

        const redirectUrl = '/chat/inferenceResult';
        pythonProcess.stdout.on('end', () => {
            console.log(`Python process exited with code 0 and output: ${data1}`);
            const encodedData = encodeURIComponent(data1);
            const url = `${redirectUrl}?data=${encodedData}`;
            // 將url傳遞給前端
            res.send({ url });
        });
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python error: ${data}`);
            res.sendStatus(500);
        });
        // pythonProcess.on('close', (code) => {
        //     if (code !== 0) {
        //         console.error(`Python process exited with code ${code}`);
        //         res.sendStatus(500);
        //     }
        // });

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});






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