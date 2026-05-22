# 🌌 Antigravity Kanban — Gerenciador de Tarefas Inteligente

Bem-vindo ao **Antigravity Kanban**! Um organizador visual de fluxo de trabalho moderno, responsivo e premium, desenvolvido inteiramente com **TypeScript Vanilla** e **CSS Puro**, rodando sob o ecossistema rápido do **Vite**.

Este projeto foi projetado com foco em excelente experiência de usuário (UX), oferecendo transições de arrastar e soltar (Drag & Drop) extremamente fluidas, persistência confiável de dados localmente e uma estética visual *Dark Mode* sofisticada com efeitos de *Glassmorphism*.

---

## ✨ Funcionalidades Principais

- **📦 Drag & Drop Nativo & Fluido**: Arraste seus cards de tarefa entre as colunas do quadro para mudar o status instantaneamente, com efeitos visuais modernos e elegantes que guiam o movimento.
- **🛠️ CRUD Completo de Tarefas**:
  - **Criação**: Adicione tarefas fornecendo título (com limite de 80 caracteres), descrição detalhada (até 500 caracteres) e classificação de prioridade.
  - **Edição**: Altere os dados de qualquer tarefa existente a qualquer momento abrindo o modal de edição rápida.
  - **Exclusão**: Exclua cards indesejados com confirmação simples para manter seu quadro limpo.
- **🚥 Classificação por Prioridade**: As tarefas são marcadas por níveis de prioridade (**Baixa**, **Média** e **Alta**), cada uma estilizada com cores harmoniosas e elegantes.
- **💾 Persistência com LocalStorage**: Todas as suas alterações são gravadas em tempo real no navegador. Você nunca perderá o progresso ao atualizar a página.
- **📊 Contadores Dinâmicos**: Acompanhe o volume de trabalho em cada etapa ("Não Iniciado", "Iniciado", "Concluído") através de contadores no cabeçalho de cada coluna que atualizam em tempo real.
- **💫 Design Premium & Micro-Animações**: Desenvolvido sob uma estética escura, aproveitando gradientes sutis, transparências de vidro (glassmorphism) e transições suaves nas interações.

---

## 🚀 Tecnologias Utilizadas

O projeto destaca-se por não utilizar frameworks pesados de interface (como React ou Vue), apostando no alto desempenho do desenvolvimento nativo:

- **HTML5**: Estrutura semântica focada em acessibilidade e SEO.
- **CSS3 (Custom Properties & Modern Layouts)**: Design responsivo estruturado com **Flexbox** e **CSS Grid**. Uso extensivo de variáveis CSS para facilitar temas e efeitos visuais premium.
- **TypeScript**: Utilizado para garantir a tipagem estática forte, prevenção de erros e estruturação orientada a objetos robusta.
- **Vite**: Ferramenta de build ultrarápida que otimiza o ciclo de desenvolvimento e gera bundles leves em produção.

---

## 📂 Estrutura de Arquivos

A arquitetura do projeto segue princípios de **Separação de Responsabilidades (Clean Code)**, garantindo que a lógica de negócios não dependa da camada visual:

```text
📁 Projeto Kanban/
├── 📁 dist/                      # Arquivos prontos para produção (gerado após o build)
├── 📁 src/
│   ├── 📁 assets/                # Imagens, ícones e recursos estáticos
│   ├── 📄 types.ts               # Definições das interfaces e tipos TypeScript (Task, Priority, Status)
│   ├── 📄 kanban.ts              # Classe KanbanBoard (Lógica de negócios, CRUD e LocalStorage)
│   ├── 📄 dom.ts                 # Classe KanbanDOM (Manipulação de interface, eventos de Drag & Drop e modais)
│   ├── 📄 main.ts                # Inicializador principal que conecta as classes no carregamento do DOM
│   └── 📄 style.css              # Toda a estilização premium, layout e animações do projeto
├── 📄 index.html                 # Ponto de entrada do documento HTML
├── 📄 package.json               # Configurações do projeto e scripts npm
├── 📄 tsconfig.json              # Configurações de compilação do TypeScript
├── 📄 start.bat                  # Script automatizado de inicialização rápida para Windows
└── 📄 .gitignore                 # Definição de arquivos ignorados pelo Git
```

---

## 🛠️ Como Executar o Projeto

Você tem duas formas simples de rodar a aplicação localmente:

### Método 1: Inicialização Rápida no Windows (Recomendado)
Se você estiver utilizando o sistema operacional **Windows**, há um script preparado que instala as dependências necessárias de forma automática e inicia o servidor abrindo o navegador:

1. Dê um duplo clique no arquivo **`start.bat`** na raiz do projeto.
2. O prompt de comando abrirá, instalará os pacotes (`npm install`) se não existirem, iniciará o servidor Vite e abrirá o Kanban no seu navegador padrão (`http://localhost:5173`).

---

### Método 2: Execução Manual (Qualquer Sistema Operacional)

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   *Após iniciar, abra a URL exibida no console (geralmente `http://localhost:5173`) no seu navegador.*

3. **Compilar para produção (Build):**
   ```bash
   npm run build
   ```
   *Este comando gerará os arquivos estáticos prontos para publicação na pasta `/dist`.*

4. **Visualizar o build localmente:**
   ```bash
   npm run preview
   ```

---

## 🧠 Detalhes de Arquitetura e Boas Práticas

- **Desacoplamento Visual e Lógico**: A classe `KanbanBoard` (em `src/kanban.ts`) gerencia exclusivamente a manipulação do array de tarefas e a sincronização do `localStorage`. Ela não sabe que o DOM existe. Isso facilita testes unitários e futuras migrações de interface.
- **Robustez no LocalStorage**: O carregamento de dados é protegido por blocos `try/catch`. Caso o armazenamento local falhe ou esteja corrompido, a aplicação é reiniciada suavemente com um conjunto de **tarefas de exemplo** elegantes para que o usuário entenda o funcionamento do quadro de imediato.
- **Validação de Inputs**: O formulário do modal possui restrições nativas de obrigatoriedade e comprimento de caracteres, garantindo a integridade dos dados antes de criar ou atualizar as tarefas.

---

Desenvolvido com carinho para oferecer o gerenciamento de tarefas mais fluido do universo! 🚀🌌
