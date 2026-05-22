from kokoro import KPipeline
import soundfile as sf
import numpy as np
import torch
from pathlib import Path

path_audios = Path(__file__).parent / 'audios'

lang_code = 'p'
voices = ['pm_santa', 'pf_dora', 'pm_alex']

pipeline = KPipeline(lang_code=lang_code)

def text_to_speech(text, voice, audio_path):

    generator = pipeline(text, voice=voice)

    audio_chunks = []

    for gs, ps, audio in generator:
        audio_chunks.append(audio)

    audio = np.concatenate(audio_chunks)
    path_audio = path_audios / f'{audio_path}.mp3'
    sf.write(path_audio, audio, 24000)

if __name__ == '__main__':
    
    text = '''
Olá, Tiago! Aqui é o Daniel. 

Descobri seu Audio Kokoro no GitHub e fiquei fascinado pela “alma sonora” que você capturou. Para dar ainda mais vida ao projeto, vou preparar a partitura textual — ou seja, um README.md detalhado — que oriente futuros colaboradores sobre instalação, uso e propósito do Kokoro.

Em breve você verá um pull request meu com essa adição. Espero que esse README faça o fluxo de contribuição soar tão bem quanto a trilha que você criou. 

Um grande abraço e até já no PR!
— Daniel
'''
    for v in voices:
        text_to_speech(text, v, v)

