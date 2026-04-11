⌨️ KeyGame: Treino de Atalhos Gamificado

📌 Visão Geral
O KeyGame é uma aplicação web full-stack desenvolvida para solucionar um gargalo educacional real: a falta de fluidez digital entre jovens que possuem contato predominante com dispositivos móveis.

O projeto foi aplicado na prática com uma turma de 22 alunos (13 a 15 anos) do projeto de extensão PIBEX "Programe seu Futuro" da Unijuí. A ferramenta transforma o aprendizado de atalhos essenciais do Windows/Linux (como Ctrl+C, Ctrl+V, Win+E) em uma experiência lúdica e competitiva.

🚀 O Game em Ação
Acesse o projeto: https://keyboardgame-main.vercel.app

<p align="center">
<img src="demo-screenshots/game-interface.png" alt="Interface do KeyGame" width="600px">

<em>Interface principal focada em simplicidade e performance.</em>
</p>

🛠️ Decisões de Engenharia
Para atender aos requisitos de um ambiente escolar com recursos de hardware limitados, priorizei escolhas que garantissem eficiência:

Frontend Vanilla JavaScript: Construído sem frameworks para garantir um TTI (Time-to-Interactive) baixíssimo. Isso permite que o app rode perfeitamente mesmo em computadores mais antigos.

Sincronização em Tempo Real: Utilização do Supabase (PostgreSQL + WebSockets) para criar um ranking global vivo, fomentando o engajamento através da competição saudável entre os alunos.

Segurança (RLS): Implementação de políticas de Row Level Security no banco de dados para garantir que as pontuações sejam enviadas de forma íntegra.

Suporte Bilíngue: Motor de tradução customizado para que os alunos pratiquem inglês técnico (fundamental na área de TI) enquanto jogam.

📈 Impacto Real e Metodologia
A aplicação nasceu de um problema real: a maioria dos alunos não sabia realizar comandos básicos por nunca ter tido contato frequente com computadores.

Engajamento: O sistema de ranking motivou os alunos a repetirem os exercícios.

Resultado Prático: Após o uso do KeyGame, os alunos demonstraram maior agilidade nas oficinas posteriores de Scratch e lógica de programação.

<p align="center">
<img src="demo-screenshots/students-playing.jpeg" alt="Alunos utilizando o KeyGame" width="600px">

<em>Alunos do projeto PIBEX utilizando a ferramenta em sala de aula.</em>
</p>

🎮 Funcionalidades
Perfil Aluno: Entrada simplificada via código de turma para disputa de ranking.

Modo Professor: Painel para criação de turmas e gerenciamento de pontuações (reset e limpeza de dados).

Modos de Jogo: 
* Atalho Rápido: Executar a combinação para a ação descrita.
* Quiz: Identificar a função de um atalho exibido.
* Aprendizado: Prática livre de comandos.

⚙️ Como Rodar Localmente

**Pré-requisitos**
Servidor local (ex: extensão Live Server do VS Code) ou Node.js.

Conta no Supabase (URL e chaves de API).

**Instalação**
Clone o repositório:

```bash
git clone https://github.com/erikllasch/KeyGame.git
```

**Configuração:**
Crie um arquivo `.env` na raiz com suas credenciais do Supabase:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key  # Para APIs teacher
```

**Execução:**
Abra o index.html ou execute:

```bash
npm install
npm run dev
```

🤖 Desenvolvimento Assistido por IA
Este projeto foi desenvolvido com o auxílio de ferramentas de IA (como Claude e VS Code AI) para o refinamento de lógica e otimização do tempo de desenvolvimento. Essa colaboração foi essencial para entregar uma solução funcional e de impacto social em tempo recorde.

👤 Autor
Erik Luan Lasch

Estudante de Engenharia de Software - Unijuí.

Bolsista PIBEX - "Programe seu Futuro".

[LinkedIn](https://linkedin.com/in/erikllasch) | [GitHub](https://github.com/erikllasch)
