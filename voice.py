import speech_recognition as sr
import pyttsx3
import sys


r = sr.Recognizer()


def SpeakText(Text):
    eng = pyttsx3.init()
    eng.say(Text)
    eng.runAndWait()


def process_audio_file(file_path):
    try:
       
        with sr.AudioFile(file_path) as source:
          
            r.adjust_for_ambient_noise(source, duration=0.2)
            
           
            audio_data = r.record(source)
            
          
            Text = r.recognize_google(audio_data)
            Text = Text.lower()

            print(Text)
            SpeakText(Text)
            
    except sr.RequestError as e:
        print("Error with the request; {0}".format(e))
        
    except sr.UnknownValueError:
        print("Unknown error occurred")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python voice.py sample.wav")
        sys.exit(1)

    audio_file = sys.argv[1]
    process_audio_file(audio_file)
