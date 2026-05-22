# Projeto de Conversão de Texto em Fala

Este projeto é uma aplicação Python que converte texto em fala utilizando a biblioteca Kokoro. O formato de áudio foi alterado para MP3 para melhor visualização em plataformas como WhatsApp.

## Funcionalidades

- Conversão de texto em fala com diferentes vozes.
- Geração de arquivos de áudio a partir do texto fornecido.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/ecodelearn/ia_audio_kokoro.git
   cd ia_audio_kokoro
   ```

2. Instale o UV (escolha uma das opções abaixo):

   - Usando pipx:
     ```bash
     pipx install uv
     ```
   - Usando pip:
     ```bash
     pip install uv
     ```
   - Usando Homebrew (macOS/Linux):
     ```bash
     brew install uv
     ```

3. Crie e ative o ambiente virtual com UV:
   ```bash
   uv venv
   source .venv/bin/activate
   ```

4. Instale as dependências:
   ```bash
   uv pip install -r requirements.txt
   ```

## Uso

Para usar a função de conversão de texto em fala, você pode chamar a função `text_to_speech`:

```python
from kokoro import KPipeline

text_to_speech("Seu texto aqui", "voz_desejada", "caminho/do/audio.mp3")
```

## Contribuição

Sinta-se à vontade para contribuir com melhorias e correções. Faça um fork do repositório e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License.

