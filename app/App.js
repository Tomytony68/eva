import React, { useEffect, useState } from "react";

export default function App() {
  const [active, setActive] = useState("Dashboard");
  const [dark, setDark] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Entrega de proyecto React", subject: "Programación", date: "Hoy", done: false },
    { id: 2, title: "Leer capítulo 4", subject: "Bases de Datos", date: "Mañana", done: false },
    { id: 3, title: "Quiz de matemáticas", subject: "Matemáticas", date: "15 Sep", done: true },
  ]);

  const [notes, setNotes] = useState([
    { id: 1, title: "React Hooks", text: "useState permite manejar el estado de los componentes." },
    { id: 2, title: "SQL", text: "SELECT permite consultar información de una tabla." },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState([
    { user: "Laura", text: "¿Alguien ya terminó el proyecto?" },
    { user: "Carlos", text: "Yo voy por la mitad 😅" },
    { user: "Tú", text: "Yo lo termino esta tarde." },
  ]);

  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setRunning(false);
          return 25 * 60;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () => {
    const min = Math.floor(seconds / 60).toString().padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        subject: "Personal",
        date: "Hoy",
        done: false,
      },
    ]);

    setNewTask("");
  };

  const addNote = () => {
    if (!newNote.trim()) return;

    setNotes([
      ...notes,
      {
        id: Date.now(),
        title: "Nuevo apunte",
        text: newNote,
      },
    ]);

    setNewNote("");
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        user: "Tú",
        text: newMessage,
      },
    ]);

    setNewMessage("");
  };

  const menu = [
    ["Dashboard", "⌂"],
    ["Horario", "📅"],
    ["Tareas", "✓"],
    ["Calificaciones", "📊"],
    ["Pomodoro", "⏱"],
    ["Apuntes", "📚"],
    ["Grupos", "👥"],
    ["Chat", "💬"],
  ];

  const schedule = [
    ["8:00", "Programación", "Aula 301", "#6366f1"],
    ["10:00", "Matemáticas", "Aula 204", "#ec4899"],
    ["13:00", "Bases de Datos", "Laboratorio", "#14b8a6"],
    ["15:00", "Inglés", "Aula 102", "#f59e0b"],
  ];

  const grades = [
    ["Programación", 4.8],
    ["Matemáticas", 4.2],
    ["Bases de Datos", 4.6],
    ["Inglés", 4.5],
  ];

  const average =
    grades.reduce((sum, item) => sum + item[1], 0) / grades.length;

  return (
    <div className={dark ? "app dark" : "app"}>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: Inter, Arial, sans-serif;
          background: #f5f7fb;
        }

        button, input, textarea {
          font: inherit;
        }

        .app {
          min-height: 100vh;
          display: flex;
          background: #f6f7fb;
          color: #182033;
        }

        .dark {
          background: #10131c;
          color: #f3f4f6;
        }

        /* SIDEBAR */

        .sidebar {
          width: 250px;
          min-height: 100vh;
          background: #ffffff;
          border-right: 1px solid #e8eaf0;
          padding: 25px 16px;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 10;
        }

        .dark .sidebar {
          background: #171a24;
          border-color: #292d3a;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 10px 30px;
        }

        .logo-icon {
          width: 42px;
          height: 42px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          color: white;
          font-weight: bold;
          font-size: 21px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          box-shadow: 0 8px 20px rgba(99,102,241,.25);
        }

        .logo h2 {
          font-size: 21px;
        }

        .logo span {
          color: #6366f1;
        }

        .menu-title {
          font-size: 11px;
          color: #9ca3af;
          font-weight: bold;
          margin: 15px 12px 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .nav {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .nav button {
          border: none;
          background: transparent;
          padding: 12px 14px;
          border-radius: 10px;
          cursor: pointer;
          color: #6b7280;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 13px;
          transition: .2s;
        }

        .dark .nav button {
          color: #a8adba;
        }

        .nav button:hover {
          background: #f0f1ff;
          color: #6366f1;
        }

        .nav button.active {
          background: #eef0ff;
          color: #5b5ee7;
          font-weight: 700;
        }

        .dark .nav button.active {
          background: #282b43;
        }

        .nav-icon {
          width: 23px;
          text-align: center;
          font-size: 17px;
        }

        .profile {
          position: absolute;
          bottom: 22px;
          left: 18px;
          right: 18px;
          padding: 13px;
          border-top: 1px solid #eee;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dark .profile {
          border-color: #2b2e39;
        }

        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg,#fbbf24,#f97316);
          color: white;
          font-weight: bold;
        }

        .profile small {
          color: #8a91a0;
        }

        /* MAIN */

        .main {
          margin-left: 250px;
          width: calc(100% - 250px);
          padding: 30px 38px;
          max-width: 1500px;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .topbar h1 {
          font-size: 28px;
          margin-bottom: 5px;
        }

        .topbar p {
          color: #8a91a0;
        }

        .top-actions {
          display: flex;
          gap: 10px;
        }

        .icon-button {
          width: 42px;
          height: 42px;
          border: 1px solid #e5e7eb;
          border-radius: 11px;
          background: white;
          cursor: pointer;
        }

        .dark .icon-button {
          background: #191c27;
          border-color: #303442;
          color: white;
        }

        /* DASHBOARD CARDS */

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 22px;
        }

        .stat {
          background: white;
          border-radius: 17px;
          padding: 20px;
          border: 1px solid #eceef3;
        }

        .dark .stat,
        .dark .card {
          background: #191c27;
          border-color: #292d3a;
        }

        .stat-top {
          display: flex;
          justify-content: space-between;
          color: #8a91a0;
          font-size: 13px;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: #eef0ff;
        }

        .stat h2 {
          margin-top: 13px;
          font-size: 27px;
        }

        .positive {
          color: #10b981;
          font-size: 12px;
          margin-top: 5px;
        }

        /* GRID */

        .grid {
          display: grid;
          grid-template-columns: 1.35fr .9fr;
          gap: 20px;
        }

        .card {
          background: white;
          border: 1px solid #eceef3;
          border-radius: 17px;
          padding: 22px;
          margin-bottom: 20px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .card-header h3 {
          font-size: 17px;
        }

        .view {
          color: #6366f1;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 13px;
        }

        /* TASKS */

        .task {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 0;
          border-bottom: 1px solid #f0f1f4;
        }

        .dark .task {
          border-color: #2a2e39;
        }

        .task:last-child {
          border: none;
        }

        .check {
          width: 22px;
          height: 22px;
          border-radius: 7px;
          border: 2px solid #cfd3dd;
          cursor: pointer;
          display: grid;
          place-items: center;
          background: transparent;
          color: white;
        }

        .check.done {
          background: #6366f1;
          border-color: #6366f1;
        }

        .task-info {
          flex: 1;
        }

        .task-info strong {
          display: block;
          font-size: 14px;
        }

        .task.done-text strong {
          text-decoration: line-through;
          color: #9ca3af;
        }

        .task-info small {
          color: #9298a6;
        }

        .date {
          background: #f3f4f6;
          padding: 5px 9px;
          border-radius: 7px;
          font-size: 11px;
          color: #6b7280;
        }

        .dark .date {
          background: #292d39;
        }

        /* SCHEDULE */

        .schedule-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 13px 0;
        }

        .time {
          width: 48px;
          color: #9ca3af;
          font-size: 12px;
        }

        .class-line {
          width: 4px;
          height: 38px;
          border-radius: 5px;
        }

        .class-info {
          flex: 1;
        }

        .class-info strong {
          display: block;
          font-size: 14px;
        }

        .class-info small {
          color: #9298a6;
        }

        /* GRADES */

        .grade {
          margin-bottom: 17px;
        }

        .grade-label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 7px;
          font-size: 13px;
        }

        .progress {
          height: 7px;
          background: #edf0f4;
          border-radius: 20px;
          overflow: hidden;
        }

        .dark .progress {
          background: #2c303b;
        }

        .progress div {
          height: 100%;
          background: linear-gradient(90deg,#6366f1,#8b5cf6);
          border-radius: 20px;
        }

        /* POMODORO */

        .pomodoro {
          text-align: center;
          padding: 20px 0;
        }

        .timer {
          width: 190px;
          height: 190px;
          border-radius: 50%;
          margin: 5px auto 20px;
          display: grid;
          place-items: center;
          border: 10px solid #e9eaff;
          box-shadow: inset 0 0 0 8px #f7f7ff;
        }

        .dark .timer {
          border-color: #35385a;
          box-shadow: inset 0 0 0 8px #202332;
        }

        .timer span {
          font-size: 39px;
          font-weight: 800;
        }

        .timer small {
          display: block;
          color: #8b91a0;
          font-size: 12px;
          text-align: center;
        }

        .primary {
          border: none;
          background: linear-gradient(135deg,#6366f1,#7c3aed);
          color: white;
          padding: 11px 24px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
        }

        .secondary {
          border: 1px solid #dddfea;
          background: white;
          padding: 10px 17px;
          border-radius: 9px;
          cursor: pointer;
          margin-left: 7px;
        }

        .dark .secondary {
          background: #222530;
          border-color: #373b49;
          color: white;
        }

        /* FORMS */

        .form {
          display: flex;
          gap: 8px;
          margin-bottom: 15px;
        }

        .form input,
        .form textarea {
          flex: 1;
          border: 1px solid #e0e3ea;
          border-radius: 9px;
          padding: 11px 13px;
          outline: none;
          background: white;
          color: #182033;
        }

        .dark input,
        .dark textarea {
          background: #222530;
          border-color: #363a48;
          color: white;
        }

        .form button {
          border: none;
          background: #6366f1;
          color: white;
          border-radius: 9px;
          padding: 0 17px;
          cursor: pointer;
        }

        /* NOTES */

        .notes {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .note {
          background: #fffbea;
          border-radius: 13px;
          padding: 17px;
          min-height: 120px;
        }

        .dark .note {
          background: #29281e;
        }

        .note h4 {
          margin-bottom: 9px;
        }

        .note p {
          color: #74706a;
          font-size: 13px;
          line-height: 1.5;
        }

        /* CHAT */

        .messages {
          height: 320px;
          overflow-y: auto;
          margin-bottom: 15px;
        }

        .message {
          margin-bottom: 13px;
        }

        .message strong {
          font-size: 12px;
          color: #6366f1;
        }

        .bubble {
          display: inline-block;
          margin-top: 4px;
          background: #f1f2f6;
          padding: 9px 12px;
          border-radius: 10px;
          font-size: 13px;
        }

        .dark .bubble {
          background: #292d38;
        }

        /* PAGE */

        .page-title {
          margin-bottom: 22px;
        }

        .page-title h2 {
          font-size: 24px;
        }

        .page-title p {
          color: #8a91a0;
          margin-top: 5px;
        }

        .full {
          width: 100%;
        }

        .empty {
          text-align: center;
          padding: 50px;
          color: #9298a6;
        }

        /* MOBILE */

        @media(max-width: 1000px) {
          .stats {
            grid-template-columns: repeat(2,1fr);
          }

          .grid {
            grid-template-columns: 1fr;
          }
        }

        @media(max-width: 700px) {
          .sidebar {
            width: 70px;
            padding: 20px 8px;
          }

          .logo h2,
          .menu-title,
          .nav button span,
          .profile > div {
            display: none;
          }

          .logo {
            justify-content: center;
            padding: 0 0 25px;
          }

          .nav button {
            justify-content: center;
            padding: 13px;
          }

          .profile {
            justify-content: center;
          }

          .main {
            margin-left: 70px;
            width: calc(100% - 70px);
            padding: 20px;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .notes {
            grid-template-columns: 1fr;
          }

          .topbar h1 {
            font-size: 22px;
          }
        }
      `}</style>

      {/* SIDEBAR */}

      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">U</div>
          <h2>Uni<span>Hub</span></h2>
        </div>

        <div className="menu-title">MENÚ PRINCIPAL</div>

        <nav className="nav">
          {menu.map(([name, icon]) => (
            <button
              key={name}
              className={active === name ? "active" : ""}
              onClick={() => setActive(name)}
            >
              <span className="nav-icon">{icon}</span>
              <span>{name}</span>
            </button>
          ))}
        </nav>

        <div className="profile">
          <div className="avatar">JD</div>
          <div>
            <strong>Juan David</strong>
            <small>Estudiante</small>
          </div>
        </div>
      </aside>

      {/* MAIN */}

      <main className="main">

        <div className="topbar">
          <div>
            <h1>
              {active === "Dashboard"
                ? "Buenos días, Juan 👋"
                : active}
            </h1>

            <p>
              {active === "Dashboard"
                ? "Aquí tienes un resumen de tu vida universitaria."
                : "Administra tu información académica desde aquí."}
            </p>
          </div>

          <div className="top-actions">
            <button className="icon-button">🔔</button>
            <button
              className="icon-button"
              onClick={() => setDark(!dark)}
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* DASHBOARD */}

        {active === "Dashboard" && (
          <>
            <section className="stats">
              <div className="stat">
                <div className="stat-top">
                  <span>Promedio</span>
                  <div className="stat-icon">📊</div>
                </div>
                <h2>{average.toFixed(1)}</h2>
                <div className="positive">↑ 0.3 este semestre</div>
              </div>

              <div className="stat">
                <div className="stat-top">
                  <span>Tareas pendientes</span>
                  <div className="stat-icon">✓</div>
                </div>
                <h2>{tasks.filter(t => !t.done).length}</h2>
                <div className="positive">Mantén el ritmo 💪</div>
              </div>

              <div className="stat">
                <div className="stat-top">
                  <span>Materias</span>
                  <div className="stat-icon">📚</div>
                </div>
                <h2>6</h2>
                <div className="positive">Este semestre</div>
              </div>

              <div className="stat">
                <div className="stat-top">
                  <span>Horas estudiadas</span>
                  <div className="stat-icon">⏱</div>
                </div>
                <h2>24h</h2>
                <div className="positive">↑ 12% esta semana</div>
              </div>
            </section>

            <div className="grid">
              <div>
                <div className="card">
                  <div className="card-header">
                    <h3>📋 Próximas tareas</h3>
                    <button
                      className="view"
                      onClick={() => setActive("Tareas")}
                    >
                      Ver todas
                    </button>
                  </div>

                  {tasks.map((task) => (
                    <div
                      className={
                        task.done
                          ? "task done-text"
                          : "task"
                      }
                      key={task.id}
                    >
                      <button
                        className={
                          task.done
                            ? "check done"
                            : "check"
                        }
                        onClick={() => toggleTask(task.id)}
                      >
                        {task.done ? "✓" : ""}
                      </button>

                      <div className="task-info">
                        <strong>{task.title}</strong>
                        <small>{task.subject}</small>
                      </div>

                      <span className="date">
                        {task.date}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3>📅 Horario de hoy</h3>
                    <button
                      className="view"
                      onClick={() => setActive("Horario")}
                    >
                      Ver horario
                    </button>
                  </div>

                  {schedule.map((item) => (
                    <div className="schedule-item" key={item[0]}>
                      <div className="time">{item[0]}</div>
                      <div
                        className="class-line"
                        style={{ background: item[3] }}
                      />
                      <div className="class-info">
                        <strong>{item[1]}</strong>
                        <small>{item[2]}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="card">
                  <div className="card-header">
                    <h3>📊 Calificaciones</h3>
                    <button
                      className="view"
                      onClick={() =>
                        setActive("Calificaciones")
                      }
                    >
                      Detalles
                    </button>
                  </div>

                  {grades.map((grade) => (
                    <div className="grade" key={grade[0]}>
                      <div className="grade-label">
                        <span>{grade[0]}</span>
                        <strong>{grade[1]}</strong>
                      </div>

                      <div className="progress">
                        <div
                          style={{
                            width: `${grade[1] * 20}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3>⏱ Pomodoro</h3>
                  </div>

                  <div className="pomodoro">
                    <div className="timer">
                      <div>
                        <span>{formatTime()}</span>
                        <small>Concentración</small>
                      </div>
                    </div>

                    <button
                      className="primary"
                      onClick={() => setRunning(!running)}
                    >
                      {running ? "Pausar" : "Comenzar"}
                    </button>

                    <button
                      className="secondary"
                      onClick={() => {
                        setRunning(false);
                        setSeconds(25 * 60);
                      }}
                    >
                      Reiniciar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAREAS */}

        {active === "Tareas" && (
          <div className="card full">
            <div className="card-header">
              <h3>✓ Mis tareas</h3>
            </div>

            <div className="form">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Escribe una nueva tarea..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTask();
                }}
              />
              <button onClick={addTask}>Agregar</button>
            </div>

            {tasks.map((task) => (
              <div
                className={
                  task.done
                    ? "task done-text"
                    : "task"
                }
                key={task.id}
              >
                <button
                  className={
                    task.done
                      ? "check done"
                      : "check"
                  }
                  onClick={() => toggleTask(task.id)}
                >
                  {task.done ? "✓" : ""}
                </button>

                <div className="task-info">
                  <strong>{task.title}</strong>
                  <small>{task.subject}</small>
                </div>

                <span className="date">{task.date}</span>
              </div>
            ))}
          </div>
        )}

        {/* HORARIO */}

        {active === "Horario" && (
          <div className="card">
            <div className="card-header">
              <h3>📅 Horario semanal</h3>
            </div>

            {schedule.map((item) => (
              <div className="schedule-item" key={item[0]}>
                <div className="time">{item[0]}</div>

                <div
                  className="class-line"
                  style={{ background: item[3] }}
                />

                <div className="class-info">
                  <strong>{item[1]}</strong>
                  <small>{item[2]} · Lunes</small>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CALIFICACIONES */}

        {active === "Calificaciones" && (
          <div className="card">
            <div className="card-header">
              <h3>📊 Mis calificaciones</h3>
              <strong style={{ color: "#6366f1" }}>
                Promedio: {average.toFixed(1)}
              </strong>
            </div>

            {grades.map((grade) => (
              <div className="grade" key={grade[0]}>
                <div className="grade-label">
                  <span>{grade[0]}</span>
                  <strong>{grade[1]}</strong>
                </div>

                <div className="progress">
                  <div
                    style={{
                      width: `${grade[1] * 20}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* POMODORO */}

        {active === "Pomodoro" && (
          <div className="card">
            <div className="pomodoro">
              <h2 style={{ marginBottom: 10 }}>
                Sesión de concentración
              </h2>

              <p style={{ color: "#9298a6", marginBottom: 15 }}>
                Estudia durante 25 minutos y descansa.
              </p>

              <div className="timer">
                <div>
                  <span>{formatTime()}</span>
                  <small>Pomodoro</small>
                </div>
              </div>

              <button
                className="primary"
                onClick={() => setRunning(!running)}
              >
                {running ? "Pausar" : "Comenzar"}
              </button>

              <button
                className="secondary"
                onClick={() => {
                  setRunning(false);
                  setSeconds(25 * 60);
                }}
              >
                Reiniciar
              </button>
            </div>
          </div>
        )}

        {/* APUNTES */}

        {active === "Apuntes" && (
          <div className="card">
            <div className="card-header">
              <h3>📚 Mis apuntes</h3>
            </div>

            <div className="form">
              <input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Escribe un nuevo apunte..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") addNote();
                }}
              />

              <button onClick={addNote}>
                Guardar
              </button>
            </div>

            <div className="notes">
              {notes.map((note) => (
                <div className="note" key={note.id}>
                  <h4>{note.title}</h4>
                  <p>{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GRUPOS */}

        {active === "Grupos" && (
          <div className="grid">
            <div className="card">
              <div className="card-header">
                <h3>👥 Mis grupos</h3>
              </div>

              <div className="task">
                <div className="avatar">R</div>
                <div className="task-info">
                  <strong>Grupo de React</strong>
                  <small>8 estudiantes · 3 mensajes nuevos</small>
                </div>
              </div>

              <div className="task">
                <div className="avatar">M</div>
                <div className="task-info">
                  <strong>Matemáticas II</strong>
                  <small>5 estudiantes · Examen viernes</small>
                </div>
              </div>

              <div className="task">
                <div className="avatar">B</div>
                <div className="task-info">
                  <strong>Bases de Datos</strong>
                  <small>6 estudiantes · Proyecto grupal</small>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: 15 }}>
                + Crear grupo
              </h3>

              <input
                className="full"
                placeholder="Nombre del grupo"
                style={{
                  padding: 12,
                  borderRadius: 9,
                  border: "1px solid #dddfea",
                }}
              />

              <button
                className="primary"
                style={{ marginTop: 12 }}
              >
                Crear grupo
              </button>
            </div>
          </div>
        )}

        {/* CHAT */}

        {active === "Chat" && (
          <div className="card">
            <div className="card-header">
              <h3>💬 Chat de estudiantes</h3>
              <span style={{ color: "#10b981", fontSize: 12 }}>
                ● 12 conectados
              </span>
            </div>

            <div className="messages">
              {messages.map((message, index) => (
                <div className="message" key={index}>
                  <strong>{message.user}</strong>
                  <br />
                  <span className="bubble">
                    {message.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="form">
              <input
                value={newMessage}
                onChange={(e) =>
                  setNewMessage(e.target.value)
                }
                placeholder="Escribe un mensaje..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />

              <button onClick={sendMessage}>
                Enviar
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}