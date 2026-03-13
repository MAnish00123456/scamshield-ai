import whisper

# load whisper model once when server starts
model = whisper.load_model("base")


async def process_audio(file_path):

    # speech → text using Whisper
    result = model.transcribe(file_path)

    transcript = result["text"]

    return transcript