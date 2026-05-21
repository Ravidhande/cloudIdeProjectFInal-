# ☁️ CloudIDE

A web-based code editor that lets you write and run code directly in the browser — no local setup required. Built with a Node.js backend and a JavaScript frontend, with support for multiple programming languages and an isolated execution environment.

---

## 🚀 Features

- **Multi-language support** — Run Python, JavaScript, TypeScript, Java, C, C++, Rust and more
- **Live code execution** — Execute code instantly via Docker-isolated containers
- **Interactive terminal** — Full stdin/stdout support, including `input()` prompts
- **Real-time resource monitoring** — CPU, Memory, and Network usage at a glance
- **File explorer** — Create, open, and manage files within your workspace
- **Collaborative editing** — Live session sharing with Collab mode
- **Dark-themed editor** — Syntax-highlighted, developer-friendly UI

---

## 🗂️ Project Structure

```
cloudIdeProjectFInal-/
├── frontend/          # React/JS frontend — editor UI, terminal, file explorer
├── backend/           # Node.js backend — code execution engine, API, Docker runner
├── .gitignore
└── package-lock.json
```

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|--------------------------------------|
| Frontend  | JavaScript, HTML, CSS                |
| Backend   | Node.js, Express                     |
| Execution | Docker (isolated containers)         |
| Runtime   | Python 3.11, Node.js, Java, C/C++   |

---

## ⚙️ Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) (v18 or above)
- [Docker](https://www.docker.com/) (required for code execution)
- npm (comes with Node.js)

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Ravidhande/cloudIdeProjectFInal-.git
cd cloudIdeProjectFInal-
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Start the backend server

```bash
cd backend
npm start
```

The backend will start on `http://localhost:5000` (or whichever port is configured).

### 5. Start the frontend

```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:3000`.

---

## 🐳 Docker Setup

Code execution relies on Docker. Make sure Docker Desktop (or Docker Engine on Linux) is running before you hit **Run**.

To verify Docker is working:

```bash
docker --version
docker run hello-world
```

If you see `Runtime error: spawn docker ENOENT`, it means Docker is either not installed or not in your system PATH. Install it from [docker.com](https://www.docker.com/get-started) and restart your terminal.

---

## 🖥️ Usage

1. Open the app in your browser at `http://localhost:3000`
2. Select your preferred language from the top bar (Python, JavaScript, etc.)
3. Write your code in the editor
4. Click **▶ Run** (or press `Ctrl + Enter`) to execute
5. View output, errors, and input prompts in the terminal panel below

---

## 🧩 Environment Panel

The right panel shows:
- **CPU, Memory, Network** usage in real time
- **Runtime info** — Python version, container status
- **Open files** in the current workspace

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is open source. Feel free to use, modify, and distribute it.

---

## 👨‍💻 Author

**Ravidhande** — [GitHub Profile](https://github.com/Ravidhande)

---

> Built as a final project to demonstrate cloud-based code execution, real-time collaboration, and modern web IDE architecture.
