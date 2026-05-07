# KeyGame | Solução EdTech Full-Stack

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://keyboardgame-main.vercel.app)
[![Backend: Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)
[![Frontend: Vanilla JS](https://img.shields.io/badge/Frontend-Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[English](#english) | [Português](#português)

**Live demo:** https://keyboardgame-main.vercel.app

<img src="demo-screenshots/game-interface.png" alt="Interface do KeyGame" width="800">

## English

**KeyGame** is a high-performance, full-stack educational platform designed to bridge the digital literacy gap. It transforms keyboard fluency, a critical bottleneck in developer productivity, into a gamified and measurable learning experience.

### Business Impact & Real-World Validation

Unlike many portfolio projects, KeyGame was engineered to solve a validated classroom bottleneck inside **Programe seu Futuro**, an educational initiative by **Unijuí** in Ijuí, Brazil. Public school students attend a full year of introductory programming classes, and I have worked on the project for one year as a teacher.

- **Target audience:** 22+ active students in introductory programming.
- **Problem:** classroom observation showed slower task completion when students lacked keyboard shortcut fluency.
- **Outcome:** improved engagement through competitive rankings, immediate feedback loops, and repeatable practice.
- **Scalability:** serverless architecture designed for classroom usage spikes with minimal infrastructure overhead.

<img src="demo-screenshots/students-playing.jpeg" alt="Students using KeyGame in class" width="800">

### Product Capabilities

- Practice mode without login.
- Classroom mode using a class code.
- Teacher mode to create classrooms, manage rankings, reset scores, and clear data.
- Quick shortcut challenges.
- Quiz mode.
- Guided learning mode with explanation, task, and validation.
- Difficulty progression: easy, medium, and hard.
- Score system with combos, flawless bonus, and light penalties.
- Global and classroom rankings backed by Supabase/PostgreSQL.
- Bilingual interface: Portuguese and English.

### Technical Architecture & Decisions

#### High-Efficiency Frontend

- **Vanilla JavaScript, no framework:** chosen to maximize compatibility with low-resource computers in public schools and avoid unnecessary bundle overhead.
- **Custom state management:** handles game state, scoring combos, difficulty, validation, and UI transitions without heavy libraries.
- **Single-page experience:** keeps the learning flow fast and direct for classroom use.

#### Serverless Backend & Persistence

- **Architecture:** decoupled Node.js serverless functions hosted on Vercel.
- **Database:** Supabase/PostgreSQL stores classrooms, users, scores, and leaderboards.
- **Security:** environment-based credential management, teacher-specific access key, and Supabase schema with Row Level Security enabled.
- **API design:** routes are split by domain: player, rankings, and teacher operations.

### API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/player/join` | Register or join a classroom. |
| `POST` | `/api/player/score` | Submit and accumulate player scores. |
| `GET` | `/api/rankings` | Get global and classroom rankings. |
| `POST` | `/api/teacher/classroom` | Create or update a classroom. |
| `POST` | `/api/teacher/reset` | Reset classroom scores. |
| `POST` | `/api/teacher/clear` | Clear classroom or database records with confirmation. |

### Engineering Mindset: AI-Assisted Development

This project is also a case study in modern engineering productivity.

- **Workflow:** I used AI for rapid prototyping, implementation support, automated test generation, documentation, and iteration.
- **Ownership:** AI acted as a multiplier, while I maintained ownership of the system design, decision-making, classroom implementation, validation, and final result.

### Quality Assurance

- **Smoke testing:** automated checks for critical paths such as player join, score submit, ranking update, and teacher flows.
- **Deployment:** Vercel deployment enables fast iteration based on classroom feedback.
- **Configuration:** sensitive values are handled through environment variables instead of being committed to the repository.

### Technical Stack

| Layer | Technology |
| :--- | :--- |
| Frontend | HTML5, CSS3, ES6+ JavaScript |
| Backend | Node.js Serverless Functions |
| Database | Supabase/PostgreSQL |
| DevOps | Vercel |
| Testing | Custom Node.js test runner |

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

### Contact

- **GitHub:** https://github.com/eriklluan
- **LinkedIn:** https://www.linkedin.com/in/erikllasch
- **Email:** erikllasch@gmail.com

## Português

O **KeyGame** é uma solução educacional full-stack de alta eficiência, projetada para reduzir a lacuna de fluência digital. O projeto transforma o domínio de atalhos de teclado, um gargalo crítico na produtividade de novos desenvolvedores, em uma experiência de aprendizado gamificada, imersiva e mensurável.

### Impacto Real e Validação em Campo

Diferentemente de projetos estritamente acadêmicos, o KeyGame foi concebido para resolver um problema real identificado no **Programe seu Futuro**, uma iniciativa educacional da **Unijuí** em Ijuí/RS. Como instrutor do projeto, pude validar a solução diretamente com o público-alvo.

- **Público-alvo:** mais de 22 estudantes ativos em cursos introdutórios de programação.
- **Problema:** a observação em sala de aula revelou uma redução no ritmo de execução das tarefas devido à falta de familiaridade com atalhos essenciais.
- **Resultado:** aumento expressivo no engajamento por meio de rankings competitivos, loops de feedback imediato e prática deliberada.
- **Escalabilidade:** arquitetura serverless dimensionada para suportar picos simultâneos de tráfego em ambiente escolar com custo operacional zero.

<img src="demo-screenshots/erik-presenting.jpeg" alt="Erik apresentando o KeyGame" width="480">

### Funcionalidades do Produto

- **Modo Prática:** acesso imediato sem necessidade de autenticação.
- **Modo Turma:** entrada simplificada via código de acesso exclusivo.
- **Painel do Instrutor:** gestão completa de turmas, rankings, redefinição de pontuações e limpeza de dados.
- **Desafios Dinâmicos:** testes rápidos de reflexo e memória motora.
- **Aprendizado Guiado:** módulos com explicação teórica, tarefa prática e validação em tempo real.
- **Progressão de Dificuldade:** níveis Fácil, Médio e Difícil para evolução gradual.
- **Sistema de Pontuação:** algoritmo com combos, bônus de desempenho (flawless) e penalidades leves.
- **Persistência de Dados:** rankings globais e locais integrados ao Supabase/PostgreSQL.
- **Internacionalização:** interface bilíngue (Português e Inglês).

### Arquitetura Técnica e Decisões de Engenharia

#### Frontend de Baixa Latência

- **Vanilla JavaScript (ES6+):** optei por não utilizar frameworks para maximizar a compatibilidade com o hardware legado das escolas públicas, garantindo um *footprint* mínimo e carregamento instantâneo.
- **Gerenciamento de Estado Customizado:** implementação de uma camada leve de estado para controlar o fluxo do jogo, pontuações e transições de UI sem dependências externas.
- **SPA (Single Page Application):** experiência fluida que mantém o foco do aluno no aprendizado, sem recarregamentos de página.

#### Backend Serverless e Persistência

- **Infraestrutura:** funções serverless em Node.js hospedadas na Vercel, garantindo alta disponibilidade e escalonamento sob demanda.
- **Banco de Dados:** utilização do Supabase para persistência de dados, aproveitando o poder do PostgreSQL.
- **Segurança:** implementação de políticas de **Row Level Security (RLS)** no banco de dados, gestão de credenciais via variáveis de ambiente e chaves de acesso administrativo.

### Endpoints da API

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/player/join` | Registro ou ingresso em uma turma específica. |
| `POST` | `/api/player/score` | Submissão e acumulação de pontuação do jogador. |
| `GET` | `/api/rankings` | Recuperação de rankings globais e por turma. |
| `POST` | `/api/teacher/classroom` | Criação ou atualização de configurações de turma. |
| `POST` | `/api/teacher/reset` | Reinicialização das pontuações de uma turma. |
| `POST` | `/api/teacher/clear` | Limpeza de registros com confirmação de segurança. |

### Mentalidade de Engenharia: Desenvolvimento Assistido por IA

Este projeto também atua como um estudo de caso em **produtividade moderna**.

- **Workflow:** utilizei ferramentas de IA para acelerar a prototipagem, apoiar a implementação de lógicas complexas, gerar testes automatizados e refinar a documentação.
- **Propriedade Técnica:** a IA funcionou como um multiplicador de capacidade (*force multiplier*), enquanto mantive a autoridade sobre o design do sistema, decisões arquiteturais e validação prática em ambiente real.

### Qualidade e Confiabilidade

- **Smoke Testing:** verificações automatizadas para caminhos críticos, garantindo que o fluxo "Join -> Score -> Ranking" seja resiliente.
- **CI/CD:** deploy automatizado via Vercel, permitindo iterações rápidas baseadas no feedback colhido em tempo real nas aulas.

### Stack Técnica

| Camada | Tecnologia |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript ES6+ |
| **Backend** | Node.js (Serverless Functions) |
| **Banco de Dados** | Supabase (PostgreSQL) |
| **DevOps** | Vercel |
| **Testes** | Test Runner customizado em Node.js |

### Configuração e Instalação

```bash
git clone https://github.com/eriklluan/keyboardgame.git
cd keyboardgame
npm install
npm run dev
```

Configure as variáveis de ambiente localmente ou no painel da Vercel:

```bash
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
TEACHER_ACCESS_KEY=chave_opcional_professor
```

Executar testes:

```bash
npm test
```

### Contato

- **GitHub:** https://github.com/eriklluan
- **LinkedIn:** https://www.linkedin.com/in/erikllasch
- **Email:** erikllasch@gmail.com
