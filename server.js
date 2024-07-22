const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.get('/process-voice', async (req, res) => {
    res.status(200).json({ message: 'hi' });
});

app.post('/process-voice', async (req, res) => {
    try {
        const { voiceFilePath } = req.body;
        console.log(voiceFilePath);
       
        const text = await convertVoiceToText(voiceFilePath);
        console.log(text);

        const hfResponse = await getHuggingFaceResponse(text);
        console.log(hfResponse);
       
        const voiceResponsePath = await convertTextToVoice(hfResponse);

        res.json({ voiceResponsePath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const convertVoiceToText = (voiceFilePath) => {
    return new Promise((resolve, reject) => {
        exec(`python voice.py ${voiceFilePath}`, (error, stdout, stderr) => {
            if (error) {
                console.log("hiik")
                return reject(`Voice to text conversion error: ${stderr}`);
            }
            
            resolve(stdout.trim());
        });
    });
};

const getHuggingFaceResponse = async (text) => {
    const apiKey = "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" ;
    try {
        const response = await axios.post('https://api-inference.huggingface.co/models/gpt2', {
            inputs: text
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        return response.data[0].generated_text.trim();
    } catch (error) {
        
        throw new Error(`Error getting Hugging Face response: ${error.message}`);
    }
};
const convertTextToVoice = (text) => {
    return new Promise((resolve, reject) => {
        
        const escapedText = text
            .replace(/\\/g, '\\\\')  
            .replace(/'/g, "\\'")    
            .replace(/"/g, '\\"')     
            .replace(/\n/g, '');
        const command = `python speech.py "${escapedText}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Error executing Python script:", stderr);
                return reject(`Text to voice conversion error: ${stderr}`);
            }

            console.log("Python script output:", stdout);
            const voiceFilePath = 'response.wav'; 
            resolve(voiceFilePath);
        });
    });
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});