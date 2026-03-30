# ⌨️ Keyboard Learning App | "Programe seu Futuro" Project

An interactive web application designed to boost digital literacy and help beginner students master essential keyboard commands and shortcuts.

## 🎯 Project Overview
This software was born from a real-world need identified during my time as a scholarship instructor for the **Programe seu Futuro (Unijuí)** extension project.

As we transitioned the curriculum to MIT App Inventor, I noticed that students often struggled with creative flow due to limited familiarity with keyboard shortcuts. This tool works as a pedagogical bridge, providing a gamified experience to memorize commands that are essential for coding and productivity.

## 🤖 AI-Assisted Development
This project is a practical case study in **AI-Driven Development (AIDD)**.

- **Claude & ChatGPT**: Used for architecture decisions, event-flow design, and interaction logic.
- **GitHub Copilot**: Used for real-time completions, repetitive code acceleration, and refactoring support.

**Engineering Note:** As a Software Engineering student, I acted as the **System Architect**. I drafted prompts, validated AI-generated logic, implemented accessibility-minded flows, and aligned the final system with the educational context of Unijuí labs.

## 🚀 Tech Stack & Deployment
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Vercel Serverless Functions (`/api/*`)
- **Database:** Supabase (PostgreSQL)
- **Infrastructure:** Vercel CI/CD
- **Versioning:** Git & GitHub

## ✨ Key Features
- Interactive shortcut practice (Windows/system + editing commands)
- Real-time visual feedback for correct/incorrect actions
- Difficulty-based scoring model:
  - Easy = 10 points
  - Medium = 25 points
  - Hard = 50 points
- Bonus mechanics:
  - Flawless bonus (no mistakes)
  - Combo bonus (streaks)
- Light penalties for mistakes/timeouts

### Access Profiles
- **Player Mode**
  - Simple classroom join via code
  - Username optional (auto-generated if empty)
  - Score persistence in ranking
- **Teacher Mode**
  - Create classroom with unique code
  - View classroom ranking
  - Reset classroom score for new competitions
- **Practice Mode**
  - Learn and practice without user/classroom requirements

### Rankings
- Global ranking (all users)
- Classroom ranking (filtered by class code)
- Ordered by score (descending)

## 🧱 Backend Architecture
The frontend communicates with server-side endpoints:

- `POST /api/player/join`
- `POST /api/player/score`
- `GET /api/rankings?turma=CODE`
- `POST /api/teacher/classroom`
- `POST /api/teacher/reset`

This keeps privileged database operations outside the browser.

## 🗃️ Database Schema
See: `supabase/schema.sql`

Core entities:
- `users (id, username, pontos, turma, created_at, updated_at)`
- `turmas (id, codigo, nome, created_at)`

Includes indexes, trigger for `updated_at`, and base RLS read policies.

## ⚙️ Environment Variables (Vercel)
Configure in Vercel Project Settings:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TEACHER_ACCESS_KEY` (optional but recommended)

## 🔗 Live Demo
Check out the application in action:

**https://keyboardgame-main.vercel.app**

## 👨‍💻 About Me
**Erik**

- Software Engineering Student (3rd Semester)
- Scholarship Holder at the "Programe seu Futuro" Extension Project - Unijuí
- Focus: Full Stack Development & AI Innovation

## 📌 GitHub Profile Tips
- **About Section suggestion:**
  - *Pedagogical web app for the Programe seu Futuro project (Unijuí). Built with AI-assisted engineering (Claude/GPT/Copilot).*
- **Repository topics:**
  - `javascript`, `education`, `ai-assisted`, `software-engineering`, `unijui`, `supabase`, `vercel`
- **Media:**
  - Add at least one screenshot or short GIF of gameplay/ranking flow.
