# voice-conversion

Status: 
In this model. The backend part will be running accurately. The user need to give voice as input and the voice will be converted into a text. In my code it is connected with hugging face api key and the response will be sent back. The response which was sent back as a text is then converted to a voice output. 
When it comes to the front end . If you click the start recording button it will listen to your audio input and once if you click the stop recording . Your audio input will be played but the connectivity between the frontend and the back end is still under development 

Methodology :

1. Voice.py is used to convert the audio input to the text format
2. Speech.py is used to convert the speech to the text
3. Server.js incorporates these python files and uses hugging face as a language model
4. Server.js is then locally run in postman and the backend side is deployed.
5. Index.html contains the html and javascript code and they further have a space for improvement.


   The output screenshot of backend is attached kindly view for reference

