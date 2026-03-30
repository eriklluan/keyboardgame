⌨️ Keyboard Learning App | "Programe seu Futuro" Project
An interactive web application designed to boost digital literacy and help beginner students master essential keyboard commands and shortcuts.

🎯 Project Overview
This software was born from a real-world need identified during my time as a scholarship instructor for the Programe seu Futuro (Unijuí) extension project.

As we transitioned the curriculum to MIT App Inventor, I noticed that students often struggled with the creative flow due to a lack of familiarity with keyboard shortcuts. This tool serves as a pedagogical bridge, providing a gamified way for students to memorize commands that are essential for coding and productivity.

🤖 AI-Assisted Development
This project serves as a case study for AI-Driven Development (AIDD). I leveraged the industry’s leading generative tools to accelerate the prototyping phase while maintaining high code quality:

Claude & ChatGPT: Utilized for architecting the event-handling logic and structuring the project’s core components.

GitHub Copilot: Integrated into the workflow for real-time code completion and boilerplate optimization.

Engineering Note: As a Software Engineering student, my role was that of a System Architect. I was responsible for drafting the prompts, validating the AI-generated logic, implementing accessibility standards, and ensuring the final product met the specific educational requirements of the Unijuí labs.

🚀 Tech Stack & Deployment
Frontend: HTML5, CSS3, and Vanilla JavaScript.

Infrastructure: Automated CI/CD deployment via Vercel.

Versioning: Git & GitHub.

✨ Key Features
Interactive Practice: Drills for essential shortcuts like Ctrl+C, Ctrl+V, Alt+Tab, and system navigation.

Instant Visual Feedback: Real-time responses to help students correct errors and reinforce learning.

Lab-Ready Design: Optimized for the desktop environments found in university computer labs.

🔗 Live Demo
Check out the application in action: https://keyboardgame-main.vercel.app

👨‍💻 About Me
Erik

Software Engineering Student (3rd Semester).

Scholarship Holder at the "Programe seu Futuro" Extension Project - Unijuí.

Focus: Full Stack Development & AI Innovation.

Pro-Tips for your GitHub Profile:
The "About" Section: In the right-hand sidebar of your GitHub repo, add a short description: "Pedagogical web app for the Programe seu Futuro project (Unijuí). Built with AI-assisted engineering (Claude/GPT/Copilot)."

Add Topics: Add tags to your repository like javascript, education, ai-assisted, software-engineering, and unijui. This makes your project easier to find.

Screenshot: Don't forget to add a screenshot or a small GIF of the app running. It makes the README much more engaging!

## Backend Setup (Supabase)

Add these two global variables before the main script in `index.html`:

```html
<script>
  window.SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
  window.SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
</script>
```

Create the tables in Supabase SQL Editor:

```sql
create table if not exists turmas (
  id text primary key,
  codigo text unique not null,
  nome text not null
);

create table if not exists users (
  id text primary key,
  username text not null,
  pontos integer not null default 0,
  turma text not null references turmas(codigo) on update cascade
);
```
