# KeyGame - Educational Keyboard Shortcut Game

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://keyboardgame-main.vercel.app)
[![Backend: Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)
[![Frontend: Vanilla JS](https://img.shields.io/badge/Frontend-Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[English](#english) | [Portugues](#portugues)

**Live demo:** https://keyboardgame-main.vercel.app

**Portfolio case study:** [PORTFOLIO.md](PORTFOLIO.md)

KeyGame is a gamified web application created from a real classroom need: helping beginner students become faster and more confident with keyboard shortcuts while learning programming.

<img src="demo-screenshots/game-interface.png" alt="KeyGame interface" width="800">

## Portfolio Snapshot

| Area | Evidence |
| :--- | :--- |
| Real problem | Built during the Programe seu Futuro extension project after observing students struggling with basic shortcuts. |
| Product thinking | Includes player, teacher, and practice flows for a classroom environment. |
| Frontend | Single-page experience with practice, quiz, guided learning, scoring, and bilingual content. |
| Backend | Vercel Serverless Functions connected to Supabase/PostgreSQL. |
| Quality | Automated API tests and frontend smoke checks for core flows. |
| Deployment | Public production demo hosted on Vercel. |

## English

### Overview

KeyGame is a full-stack educational tool designed to improve digital literacy through repetition, feedback, and classroom-friendly gamification. It was developed in the context of the **Programe seu Futuro (Unijui)** project, where students were learning programming concepts and needed more fluency with common Windows/Linux shortcuts.

### Main Features

- Practice mode without login.
- Player mode with classroom code.
- Teacher mode to create classrooms, view rankings, reset scores, and clear data.
- Quick shortcut challenges.
- Quiz mode.
- Guided learning mode with explanation, practical task, and validation.
- Difficulty progression: easy, medium, and hard.
- Score system with combos, flawless bonus, and light penalties.
- Bilingual interface: `pt-BR` and `en`.
- Global and classroom rankings backed by Supabase.

### Real-World Use

The project was applied in a classroom environment with **22 students**. The ranking and game flow helped transform repetitive shortcut practice into a more engaging activity.

<img src="demo-screenshots/students-playing.jpeg" alt="Students using KeyGame in class" width="800">

### Technical Decisions

- **Vanilla JavaScript frontend:** keeps the app lightweight and easy to run on low-resource computers.
- **Serverless backend:** Vercel functions separate player, ranking, and teacher operations.
- **Supabase persistence:** stores classrooms and student scores in PostgreSQL.
- **Environment-based configuration:** keeps Supabase credentials and teacher access keys outside the codebase.
- **Automated tests:** cover player join, scoring, rankings, teacher flows, and key frontend smoke checks.

### Tech Stack

- HTML5
- CSS3
- JavaScript
- Node.js
- Vercel Serverless Functions
- Supabase/PostgreSQL

### API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/player/join` | Register or join a classroom. |
| `POST` | `/api/player/score` | Submit and accumulate player score. |
| `GET` | `/api/rankings` | Get global and class rankings. |
| `POST` | `/api/teacher/classroom` | Create or update a classroom. |
| `POST` | `/api/teacher/reset` | Reset class scores. |
| `POST` | `/api/teacher/clear` | Clear class or database records with confirmation. |

### Setup

```bash
git clone https://github.com/eriklluan/keyboardgame.git
cd keyboardgame
npm install
npm run dev
```

Create environment variables locally or in Vercel:

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
TEACHER_ACCESS_KEY=optional_teacher_key
```

Run tests:

```bash
npm test
```

## Portugues

### Visao Geral

O KeyGame e uma ferramenta educacional full-stack criada para melhorar a fluencia digital de estudantes por meio de repeticao, feedback e gamificacao. O projeto nasceu no contexto do **Programe seu Futuro (Unijui)**, onde os alunos estavam aprendendo programacao e precisavam ganhar velocidade com atalhos comuns de Windows/Linux.

### Funcionalidades

- Modo pratica sem login.
- Modo jogador com codigo de turma.
- Modo professor para criar turmas, ver rankings, resetar pontuacoes e limpar dados.
- Desafios rapidos de atalhos.
- Modo quiz.
- Aprendizado guiado com explicacao, tarefa pratica e validacao.
- Progressao por dificuldade: facil, medio e dificil.
- Sistema de pontuacao com combos, bonus por acerto perfeito e penalidades leves.
- Interface bilingue: `pt-BR` e `en`.
- Ranking global e por turma usando Supabase.

### Impacto Real

O projeto foi aplicado em uma turma com **22 estudantes**. O ranking e a dinamica de jogo ajudaram a transformar o treino repetitivo de atalhos em uma atividade mais envolvente.

<img src="demo-screenshots/erik-presenting.jpeg" alt="Erik apresentando o KeyGame" width="420">

### Decisoes Tecnicas

- **Frontend em JavaScript puro:** app leve, simples de abrir e adequado para computadores escolares com poucos recursos.
- **Backend serverless:** funcoes da Vercel separadas por jogador, ranking e professor.
- **Persistencia com Supabase:** turmas e pontuacoes salvas em PostgreSQL.
- **Configuracao por variaveis de ambiente:** credenciais e chave do professor ficam fora do codigo.
- **Testes automatizados:** cobertura dos fluxos de entrada, pontuacao, ranking, professor e smoke tests de interface.

### Sobre Mim

Sou Erik Luan Lasch, estudante de Engenharia de Software, com interesse em criar solucoes simples, uteis e conectadas a problemas reais. Este projeto representa minha capacidade de observar uma dificuldade concreta, transformar isso em produto, implementar frontend e backend, testar, documentar e publicar uma versao funcional.
