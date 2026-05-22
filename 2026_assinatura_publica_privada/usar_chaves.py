from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding

# =========================
# 🔒 Codificar (ENCRYPT)
# =========================
def codificar(mensagem: str, caminho_chave_publica: str) -> bytes:

    with open(caminho_chave_publica, "rb") as f:
        public_key = serialization.load_pem_public_key(f.read())

    mensagem_bytes = mensagem.encode()

    mensagem_criptografada = public_key.encrypt(
        mensagem_bytes,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    return mensagem_criptografada


# =========================
# 🔓 Decodificar (DECRYPT)
# =========================
def decodificar(mensagem_criptografada: bytes, caminho_chave_privada: str) -> str:

    with open(caminho_chave_privada, "rb") as f:
        private_key = serialization.load_pem_private_key(
            f.read(),
            password=None
        )

    mensagem_original = private_key.decrypt(
        mensagem_criptografada,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    return mensagem_original.decode()


# =========================
# ✍️ ASSINAR (chave privada)
# =========================
def assinar(mensagem: str, caminho_chave_privada: str) -> bytes:

    with open(caminho_chave_privada, "rb") as f:
        private_key = serialization.load_pem_private_key(f.read(), password=None)

    assinatura = private_key.sign(
        mensagem.encode(),
        padding.PKCS1v15(),
        hashes.SHA256()
    )

    return assinatura


# =========================
# ✅ VERIFY (chave pública)
# =========================
def verificar(mensagem: str, assinatura: bytes, caminho_chave_publica: str) -> bool:
    with open(caminho_chave_publica, "rb") as f:
        public_key = serialization.load_pem_public_key(f.read())

    try:
        public_key.verify(
            assinatura,
            mensagem.encode(),
            padding.PKCS1v15(),
            hashes.SHA256()
        )
        return True
    except Exception:
        return False
    

if __name__ == '__main__':

    linha = lambda: print('-'*50)
        

    linha()
    mensagem = "Mensagem super secreta 🔐"
    print(mensagem)

    linha()
    print('# ✍️ Assinar')
    assinatura = assinar(mensagem, "private.pem")
    print(assinatura)

    linha()
    print('# ✅ Verificar')
    valido = verificar(mensagem, assinatura, "public.pem")
    print(valido)

    linha()
    print('# 🔒 Criptografar')
    cripto = codificar(mensagem, "public.pem")
    print(cripto)

    linha()
    print('# 🔓 Descriptografar')
    original = decodificar(cripto, "private.pem")
    print(original)