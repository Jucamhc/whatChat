import os
import whisper
import sys

nombre = sys.stdin.readline().strip()

def main():
    # Obtener la ruta del archivo Python
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Obtener la ruta absoluta del archivo de audio
    carpeta = os.path.join(script_dir, "audios", "mp3")
    ruta_absoluta = os.path.abspath(os.path.join(carpeta, nombre))

    # Cargar el modelo de Whisper
    model = whisper.load_model("small")

    # Transcribir el archivo de audio
    result = model.transcribe(ruta_absoluta, language="es")

    print(result["text"])

main()

"""  Linux 
 Instalar Whisper
 # pip install git+https://github.com/openai/whisper.git
 # sudo apt update && sudo apt install ffmpeg
 """