# Criptografia Assimétrica e Assinatura Digital com RSA em Python

Este repositório contém uma implementação prática e didática de conceitos de **Criptografia Assimétrica** e **Assinatura Digital** utilizando o algoritmo **RSA**. O projeto foi desenvolvido em Python, fazendo uso da robusta biblioteca [`cryptography`](https://cryptography.io/en/latest/).

O objetivo principal deste projeto é demonstrar de forma clara como funciona o ciclo de vida de chaves criptográficas RSA (geração, salvamento, leitura), assim como sua aplicação prática em:
1. **Cifragem e Decifragem de Mensagens** (Garantia de Confidencialidade)
2. **Assinatura e Verificação Digital** (Garantia de Autenticidade, Integridade e Não-repúdio)

---

## 📂 Estrutura do Projeto

Abaixo estão descritos os principais arquivos presentes no repositório:

*   **`criar_chaves.py`**: Script responsável por gerar o par de chaves RSA (pública e privada) de 2048 bits e salvá-las no formato PEM.
*   **`usar_chaves.py`**: Contém as funções utilitárias que realizam os processos de cifragem, decifragem, assinatura e verificação utilizando as chaves geradas. Também possui um fluxo demonstrativo interativo em seu ponto de entrada (`__main__`).
*   **`pyproject.toml`**: Arquivo de configuração de empacotamento e dependências Python moderno, utilizando o padrão PEP 621.
*   **`private.pem`** & **`public.pem`**: Arquivos gerados contendo, respectivamente, a chave privada e a chave pública do sistema.

> [!WARNING]
> **Segurança com a Chave Privada (`private.pem`):** A chave privada nunca deve ser compartilhada ou exposta publicamente. Ela deve ser armazenada com segurança em ambientes produtivos, preferencialmente protegida com senha (passphrase) ou em cofres de chaves.

---

## 🛠️ Tecnologias e Ferramentas

*   **Python 3.13+**
*   **[uv](https://github.com/astral-sh/uv)**: Gerenciador e instalador de pacotes extremamente rápido para Python.
*   **`cryptography`**: Biblioteca padrão do ecossistema Python para primitivas criptográficas seguras.
*   **`fastapi`** & **`uvicorn`**: Preparado no arquivo de dependências para futuras exposições de API Web.

---

## 🚀 Instalação e Execução

### Pré-requisitos
Certifique-se de possuir o Python instalado em sua máquina. É altamente recomendável utilizar o **`uv`** para a gestão do ambiente virtual e dependências, por ser moderno e de altíssimo desempenho.

### Passo a Passo

1. **Clone o repositório ou acesse a pasta do projeto:**
   ```bash
   cd 2026_assinatura_publica_privada
   ```

2. **Crie e ative o ambiente virtual:**
   Com o **`uv`**:
   ```bash
   uv venv
   # No Windows (PowerShell/CMD):
   .venv\Scripts\activate
   # No Linux/macOS:
   source .venv/bin/activate
   ```

3. **Instale as dependências:**
   ```bash
   uv pip install -r pyproject.toml
   ```

---

## 📖 Como Usar

O fluxo de uso consiste em duas etapas simples: **gerar as chaves** e, em seguida, **utilizá-las**.

### 1. Geração das Chaves
Execute o script `criar_chaves.py` para gerar as chaves pública e privada:

```bash
python criar_chaves.py
# ou com uv:
uv run criar_chaves.py
```

Isso criará dois novos arquivos no diretório raiz:
*   `private.pem`: A chave privada RSA (2048 bits).
*   `public.pem`: A chave pública RSA correspondente.

### 2. Executando a Demonstração (Cifragem, Decifragem e Assinatura)
Com as chaves criadas, execute o script `usar_chaves.py` para rodar os testes e entender o funcionamento na prática:

```bash
python usar_chaves.py
# ou com uv:
uv run usar_chaves.py
```

O console exibirá o fluxo detalhado das operações efetuadas:
*   A mensagem original a ser processada.
*   A assinatura gerada a partir da mensagem (usando a chave privada) e sua posterior validação com sucesso (usando a chave pública).
*   A mensagem criptografada (cifrada com a chave pública) e, por fim, o resultado da sua descriptografia bem-sucedida (com a chave privada).

---

## 🧠 Conceitos Teóricos Abordados

### Criptografia Assimétrica (Pública / Privada)
Diferente da criptografia simétrica (onde a mesma chave cifra e decifra), a criptografia assimétrica utiliza um **par de chaves**:
*   **Chave Pública**: Compartilhada livremente. Qualquer pessoa pode usá-la para **criptografar** uma mensagem destinada a você.
*   **Chave Privada**: Mantida sob seu controle absoluto. Apenas ela consegue **descriptografar** mensagens que foram cifradas com sua chave pública correspondente.

### Assinatura Digital
O processo de assinatura inverte o uso das chaves para garantir integridade e autoria:
1.  **Assinar (Chave Privada)**: O emissor gera um hash da mensagem e o cifra com sua *chave privada*, produzindo a assinatura.
2.  **Verificar (Chave Pública)**: O receptor utiliza a *chave pública* do emissor para descriptografar o hash e validar se a mensagem não foi alterada e se realmente partiu de quem possui a chave privada correspondente.

---

## 🛡️ Detalhes de Implementação (Código)

### Configurações de Padding e Hash Utilizados
Para garantir um alto nível de segurança contra ataques criptográficos modernos, o código utiliza os melhores padrões da biblioteca `cryptography`:

*   **Cifragem/Decifragem**: É utilizado o padding **OAEP (Optimal Asymmetric Encryption Padding)** combinado com a função de espalhamento hash **SHA-256** tanto no algoritmo de hash principal quanto na MGF1 (Mask Generation Function 1).
*   **Assinatura/Verificação**: É utilizado o padding **PKCS1v15** em conjunto com **SHA-256** para validação das assinaturas.
