import win32com.client
import sys

def speak_text(text):
   
    speaker = win32com.client.Dispatch("SAPI.SpVoice")
   
    speaker.Speak(text)

if __name__ == "__main__":
  
    if len(sys.argv) != 2:
        print("Usage: python speech.py \"text_to_speak\"")
        sys.exit(1)

    text = sys.argv[1]
    

    speak_text(text)
