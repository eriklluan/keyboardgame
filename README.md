# KeyGame | EdTech Full-Stack Solution

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://keyboardgame-main.vercel.app)
[![Backend: Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)
[![Frontend: Vanilla JS](https://img.shields.io/badge/Frontend-Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[English](#english) | [Portugues](#portugues)

**Live demo:** https://keyboardgame-main.vercel.app

<img src="demo-screenshots/game-interface.png" alt="KeyGame interface" width="800">

## English

**KeyGame** is a high-performance, full-stack educational platform designed to bridge the digital literacy gap. It transforms keyboard fluency, a critical bottleneck in developer productivity, into a gamified and measurable learning experience.

### Business Impact & Real-World Validation

Unlike many portfolio projects, KeyGame was engineered to solve a validated classroom bottleneck inside **Programe seu Futuro**, an educational initiative by **Unijui** in Ijui, Brazil. Public school students attend a full year of introductory programming classes, and I have worked on the project for one year as a teacher.

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

## Portugues

**KeyGame** e uma solucao educacional full-stack de alta eficiencia criada para reduzir uma lacuna de fluencia digital. O projeto transforma o dominio de atalhos de teclado, um gargalo importante na produtividade de quem esta aprendendo programacao, em uma experiencia gamificada e mensuravel.

### Impacto Real & Validacao em Sala

Diferente de muitos projetos de portfolio, o KeyGame foi criado para resolver um gargalo observado em sala dentro do **Programe seu Futuro**, uma iniciativa educacional da **Unijui** em Ijui, Brasil. Estudantes do ensino publico participam de um ano inteiro de aulas introdutorias de programacao, e eu atuo no projeto ha um ano como professor.

- **Publico-alvo:** 22+ estudantes ativos em introducao a programacao.
- **Problema:** observacao em sala mostrou conclusao de tarefas mais lenta quando os alunos nao dominavam atalhos de teclado.
- **Resultado:** maior engajamento por meio de ranking competitivo, feedback imediato e pratica repetivel.
- **Escalabilidade:** arquitetura serverless pensada para picos de uso em sala com baixo custo operacional.

<img src="demo-screenshots/erik-presenting.jpeg" alt="Erik apresentando o KeyGame" width="480">

### Capacidades do Produto

- Modo pratica sem login.
- Modo turma usando codigo de acesso.
- Modo professor para criar turmas, gerenciar rankings, resetar pontuacoes e limpar dados.
- Desafios rapidos de atalhos.
- Modo quiz.
- Modo de aprendizado guiado com explicacao, tarefa e validacao.
- Progressao por dificuldade: facil, medio e dificil.
- Sistema de pontuacao com combos, bonus por acerto perfeito e penalidades leves.
- Ranking global e por turma com Supabase/PostgreSQL.
- Interface bilingue: portugues e ingles.

### Arquitetura Tecnica & Decisoes

#### Frontend de Alta Eficiencia

- **JavaScript puro, sem framework:** escolhido para maximizar compatibilidade com computadores de poucos recursos em escolas publicas e evitar peso desnecessario no carregamento.
- **Gerenciamento de estado customizado:** controla estados do jogo, combos, dificuldade, validacao e transicoes de interface sem bibliotecas pesadas.
- **Experiencia single-page:** mantem o fluxo de aprendizagem rapido e direto para uso em sala.

#### Backend Serverless & Persistencia

- **Arquitetura:** funcoes serverless em Node.js hospedadas na Vercel.
- **Banco de dados:** Supabase/PostgreSQL para turmas, usuarios, pontuacoes e rankings.
- **Seguranca:** credenciais por variaveis de ambiente, chave de acesso especifica para professor e schema Supabase com Row Level Security habilitado.
- **Design de API:** rotas separadas por dominio: jogador, rankings e operacoes do professor.

### Endpoints da API

| Metodo | Endpoint | Descricao |
| :--- | :--- | :--- |
| `POST` | `/api/player/join` | Registra ou entra em uma turma. |
| `POST` | `/api/player/score` | Envia e acumula pontuacao do jogador. |
| `GET` | `/api/rankings` | Busca rankings globais e por turma. |
| `POST` | `/api/teacher/classroom` | Cria ou atualiza uma turma. |
| `POST` | `/api/teacher/reset` | Reseta pontuacoes da turma. |
| `POST` | `/api/teacher/clear` | Limpa registros de turma ou banco com confirmacao. |

### Mentalidade de Engenharia: Desenvolvimento Assistido por IA

Este projeto tambem funciona como um estudo pratico de produtividade moderna em engenharia de software.

- **Fluxo de trabalho:** usei IA para prototipacao rapida, apoio na implementacao, geracao de testes automatizados, documentacao e iteracao.
- **Responsabilidade:** a IA atuou como multiplicador, enquanto mantive responsabilidade pelo desenho do sistema, tomada de decisoes, aplicacao em sala, validacao e resultado final.

### Qualidade

- **Smoke testing:** verificacoes automatizadas para caminhos criticos como entrada de jogador, envio de pontuacao, atualizacao de ranking e fluxos do professor.
- **Deploy:** publicacao na Vercel para iteracao rapida a partir de feedback em sala.
- **Configuracao:** valores sensiveis sao tratados por variaveis de ambiente e nao ficam versionados no repositorio.

### Stack Tecnica

| Camada | Tecnologia |
| :--- | :--- |
| Frontend | HTML5, CSS3, JavaScript ES6+ |
| Backend | Node.js Serverless Functions |
| Banco de dados | Supabase/PostgreSQL |
| DevOps | Vercel |
| Testes | Runner customizado em Node.js |

### Como Rodar

```bash
git clone https://github.com/eriklluan/keyboardgame.git
cd keyboardgame
npm install
npm run dev
```

Crie as variaveis de ambiente localmente ou na Vercel:

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
TEACHER_ACCESS_KEY=optional_teacher_key
```

Execute os testes:

```bash
npm test
```

### Contato

- **GitHub:** https://github.com/eriklluan
- **LinkedIn:** https://www.linkedin.com/in/erikllasch
- **Email:** erikllasch@gmail.com
