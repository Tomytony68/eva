import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from "react-native";

export default function App() {
  const [screen, setScreen] = useState("Inicio");
  const [dark, setDark] = useState(false);

  // -------------------------
  // TAREAS
  // -------------------------

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Terminar proyecto de React",
      subject: "Programación",
      date: "Hoy",
      done: false,
    },
    {
      id: 2,
      title: "Leer capítulo 4",
      subject: "Bases de Datos",
      date: "Mañana",
      done: false,
    },
    {
      id: 3,
      title: "Quiz de matemáticas",
      subject: "Matemáticas",
      date: "15 Sep",
      done: true,
    },
  ]);

  const [newTask, setNewTask] = useState("");

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

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  // -------------------------
  // NOTAS
  // -------------------------

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "React Hooks",
      text: "useState permite manejar el estado de los componentes.",
    },
    {
      id: 2,
      title: "SQL",
      text: "SELECT permite consultar información de una tabla.",
    },
  ]);

  const [newNote, setNewNote] = useState("");

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

  // -------------------------
  // CHAT
  // -------------------------

  const [messages, setMessages] = useState([
    {
      user: "Laura",
      text: "¿Alguien ya terminó el proyecto?",
    },
    {
      user: "Carlos",
      text: "Yo voy por la mitad 😅",
    },
    {
      user: "Tú",
      text: "Yo lo termino esta tarde.",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

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

  // -------------------------
  // POMODORO
  // -------------------------

  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          setRunning(false);
          return 25 * 60;
        }

        return value - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");

    const secs = (seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${secs}`;
  };

  // -------------------------
  // DATOS
  // -------------------------

  const grades = [
    {
      subject: "Programación",
      grade: 4.8,
    },
    {
      subject: "Matemáticas",
      grade: 4.2,
    },
    {
      subject: "Bases de Datos",
      grade: 4.6,
    },
    {
      subject: "Inglés",
      grade: 4.5,
    },
  ];

  const average =
    grades.reduce((total, item) => total + item.grade, 0) /
    grades.length;

  const schedule = [
    {
      time: "8:00 AM",
      subject: "Programación",
      room: "Aula 301",
      color: "#6366F1",
    },
    {
      time: "10:00 AM",
      subject: "Matemáticas",
      room: "Aula 204",
      color: "#EC4899",
    },
    {
      time: "1:00 PM",
      subject: "Bases de Datos",
      room: "Laboratorio",
      color: "#14B8A6",
    },
    {
      time: "3:00 PM",
      subject: "Inglés",
      room: "Aula 102",
      color: "#F59E0B",
    },
  ];

  // -------------------------
  // COLORES
  // -------------------------

  const colors = {
    background: dark ? "#10131C" : "#F5F7FB",
    card: dark ? "#191C27" : "#FFFFFF",
    text: dark ? "#FFFFFF" : "#182033",
    secondary: dark ? "#A8ADBA" : "#7B8190",
    border: dark ? "#292D3A" : "#E8EAF0",
    input: dark ? "#222530" : "#FFFFFF",
    purple: "#6366F1",
    purpleLight: dark ? "#292B48" : "#EEF0FF",
  };

  // -------------------------
  // COMPONENTES
  // -------------------------

  const Header = ({ title, subtitle }) => (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.headerTitle,
            { color: colors.text },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.headerSubtitle,
            { color: colors.secondary },
          ]}
        >
          {subtitle}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.iconButton,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
        onPress={() => setDark(!dark)}
      >
        <Text style={styles.iconText}>
          {dark ? "☀️" : "🌙"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const Card = ({ children, style }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  const StatCard = ({ icon, title, value, description }) => (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.statTop}>
        <Text style={{ color: colors.secondary }}>
          {title}
        </Text>

        <View
          style={[
            styles.statIcon,
            { backgroundColor: colors.purpleLight },
          ]}
        >
          <Text>{icon}</Text>
        </View>
      </View>

      <Text
        style={[
          styles.statValue,
          { color: colors.text },
        ]}
      >
        {value}
      </Text>

      <Text style={styles.positive}>
        {description}
      </Text>
    </View>
  );

  // -------------------------
  // DASHBOARD
  // -------------------------

  const Dashboard = () => (
    <>
      <Header
        title="Buenos días, Juan 👋"
        subtitle="Aquí tienes un resumen de tu vida universitaria."
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.statsContainer}>
          <StatCard
            icon="📊"
            title="Promedio"
            value={average.toFixed(1)}
            description="↑ 0.3 este semestre"
          />

          <StatCard
            icon="✓"
            title="Tareas pendientes"
            value={tasks.filter((t) => !t.done).length}
            description="Mantén el ritmo 💪"
          />

          <StatCard
            icon="📚"
            title="Materias"
            value="6"
            description="Este semestre"
          />

          <StatCard
            icon="⏱️"
            title="Horas estudiadas"
            value="24h"
            description="↑ 12% esta semana"
          />
        </View>

        <Card>
          <View style={styles.cardHeader}>
            <Text
              style={[
                styles.cardTitle,
                { color: colors.text },
              ]}
            >
              📋 Próximas tareas
            </Text>

            <TouchableOpacity
              onPress={() => setScreen("Tareas")}
            >
              <Text style={styles.link}>
                Ver todas
              </Text>
            </TouchableOpacity>
          </View>

          {tasks.slice(0, 3).map((task) => (
            <TaskItem
              key={task.id}
              task={task}
            />
          ))}
        </Card>

        <Card>
          <View style={styles.cardHeader}>
            <Text
              style={[
                styles.cardTitle,
                { color: colors.text },
              ]}
            >
              📅 Horario de hoy
            </Text>

            <TouchableOpacity
              onPress={() => setScreen("Horario")}
            >
              <Text style={styles.link}>
                Ver horario
              </Text>
            </TouchableOpacity>
          </View>

          {schedule.map((item) => (
            <ScheduleItem
              key={item.time}
              item={item}
            />
          ))}
        </Card>

        <Card>
          <View style={styles.cardHeader}>
            <Text
              style={[
                styles.cardTitle,
                { color: colors.text },
              ]}
            >
              📊 Calificaciones
            </Text>

            <TouchableOpacity
              onPress={() =>
                setScreen("Calificaciones")
              }
            >
              <Text style={styles.link}>
                Detalles
              </Text>
            </TouchableOpacity>
          </View>

          {grades.map((item) => (
            <GradeItem
              key={item.subject}
              item={item}
            />
          ))}
        </Card>

        <Card>
          <View style={styles.cardHeader}>
            <Text
              style={[
                styles.cardTitle,
                { color: colors.text },
              ]}
            >
              ⏱️ Pomodoro
            </Text>

            <TouchableOpacity
              onPress={() => setScreen("Pomodoro")}
            >
              <Text style={styles.link}>
                Abrir
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.smallPomodoro}>
            <Text
              style={[
                styles.smallTimer,
                { color: colors.text },
              ]}
            >
              {formatTime()}
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setRunning(!running)}
            >
              <Text style={styles.primaryButtonText}>
                {running ? "Pausar" : "Comenzar"}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </>
  );

  // -------------------------
  // TASK ITEM
  // -------------------------

  const TaskItem = ({ task }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          task.done && {
            backgroundColor: colors.purple,
            borderColor: colors.purple,
          },
        ]}
        onPress={() => toggleTask(task.id)}
      >
        {task.done && (
          <Text style={styles.checkText}>✓</Text>
        )}
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.taskTitle,
            {
              color: task.done
                ? colors.secondary
                : colors.text,
              textDecorationLine: task.done
                ? "line-through"
                : "none",
            },
          ]}
        >
          {task.title}
        </Text>

        <Text
          style={[
            styles.taskSubject,
            { color: colors.secondary },
          ]}
        >
          {task.subject}
        </Text>
      </View>

      <View
        style={[
          styles.dateBadge,
          {
            backgroundColor: dark
              ? "#292D39"
              : "#F1F2F5",
          },
        ]}
      >
        <Text
          style={[
            styles.dateText,
            { color: colors.secondary },
          ]}
        >
          {task.date}
        </Text>
      </View>
    </View>
  );

  // -------------------------
  // HORARIO ITEM
  // -------------------------

  const ScheduleItem = ({ item }) => (
    <View style={styles.scheduleItem}>
      <Text
        style={[
          styles.time,
          { color: colors.secondary },
        ]}
      >
        {item.time}
      </Text>

      <View
        style={[
          styles.scheduleLine,
          { backgroundColor: item.color },
        ]}
      />

      <View>
        <Text
          style={[
            styles.className,
            { color: colors.text },
          ]}
        >
          {item.subject}
        </Text>

        <Text
          style={[
            styles.classRoom,
            { color: colors.secondary },
          ]}
        >
          {item.room}
        </Text>
      </View>
    </View>
  );

  // -------------------------
  // NOTAS
  // -------------------------

  const Notes = () => (
    <>
      <Header
        title="📚 Mis apuntes"
        subtitle="Guarda tus notas de clase."
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Card>
          <View style={styles.inputRow}>
            <TextInput
              value={newNote}
              onChangeText={setNewNote}
              placeholder="Escribe un nuevo apunte..."
              placeholderTextColor="#999"
              style={[
                styles.input,
                {
                  backgroundColor: colors.input,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={addNote}
            >
              <Text style={styles.addButtonText}>
                +
              </Text>
            </TouchableOpacity>
          </View>

          {notes.map((note) => (
            <View
              key={note.id}
              style={[
                styles.note,
                {
                  backgroundColor: dark
                    ? "#302F22"
                    : "#FFF9DF",
                },
              ]}
            >
              <Text
                style={[
                  styles.noteTitle,
                  { color: colors.text },
                ]}
              >
                {note.title}
              </Text>

              <Text style={styles.noteText}>
                {note.text}
              </Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </>
  );

  // -------------------------
  // TAREAS
  // -------------------------

  const Tasks = () => (
    <>
      <Header
        title="✓ Mis tareas"
        subtitle="Organiza tus trabajos pendientes."
      />

      <ScrollView>
        <Card>
          <View style={styles.inputRow}>
            <TextInput
              value={newTask}
              onChangeText={setNewTask}
              placeholder="Nueva tarea..."
              placeholderTextColor="#999"
              style={[
                styles.input,
                {
                  backgroundColor: colors.input,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              onSubmitEditing={addTask}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={addTask}
            >
              <Text style={styles.addButtonText}>
                +
              </Text>
            </TouchableOpacity>
          </View>

          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
            />
          ))}
        </Card>
      </ScrollView>
    </>
  );

  // -------------------------
  // CALIFICACIONES
  // -------------------------

  const GradeItem = ({ item }) => (
    <View style={styles.grade}>
      <View style={styles.gradeHeader}>
        <Text
          style={[
            styles.gradeSubject,
            { color: colors.text },
          ]}
        >
          {item.subject}
        </Text>

        <Text style={styles.gradeNumber}>
          {item.grade}
        </Text>
      </View>

      <View
        style={[
          styles.progressBackground,
          {
            backgroundColor: dark
              ? "#30333F"
              : "#ECEEF3",
          },
        ]}
      >
        <View
          style={[
            styles.progressBar,
            {
              width: `${item.grade * 20}%`,
            },
          ]}
        />
      </View>
    </View>
  );

  const Grades = () => (
    <>
      <Header
        title="📊 Calificaciones"
        subtitle="Consulta tu rendimiento académico."
      />

      <ScrollView>
        <Card>
          <View style={styles.averageBox}>
            <Text style={styles.averageNumber}>
              {average.toFixed(1)}
            </Text>

            <Text
              style={[
                styles.averageLabel,
                { color: colors.secondary },
              ]}
            >
              Promedio general
            </Text>
          </View>

          {grades.map((item) => (
            <GradeItem
              key={item.subject}
              item={item}
            />
          ))}
        </Card>
      </ScrollView>
    </>
  );

  // -------------------------
  // HORARIO
  // -------------------------

  const Schedule = () => (
    <>
      <Header
        title="📅 Mi horario"
        subtitle="Tus próximas clases."
      />

      <ScrollView>
        <Card>
          <Text
            style={[
              styles.dayTitle,
              { color: colors.text },
            ]}
          >
            Lunes
          </Text>

          {schedule.map((item) => (
            <ScheduleItem
              key={item.time}
              item={item}
            />
          ))}
        </Card>
      </ScrollView>
    </>
  );

  // -------------------------
  // POMODORO
  // -------------------------

  const Pomodoro = () => (
    <>
      <Header
        title="⏱️ Pomodoro"
        subtitle="Concéntrate y aprovecha tu tiempo."
      />

      <Card>
        <View style={styles.pomodoroContainer}>
          <View
            style={[
              styles.timerCircle,
              {
                borderColor: dark
                  ? "#393C62"
                  : "#E6E7FF",
              },
            ]}
          >
            <Text
              style={[
                styles.timerText,
                { color: colors.text },
              ]}
            >
              {formatTime()}
            </Text>

            <Text
              style={[
                styles.timerLabel,
                { color: colors.secondary },
              ]}
            >
              Concentración
            </Text>
          </View>

          <View style={styles.timerButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setRunning(!running)}
            >
              <Text style={styles.primaryButtonText}>
                {running ? "Pausar" : "Comenzar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.secondaryButton,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => {
                setRunning(false);
                setSeconds(25 * 60);
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
                Reiniciar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </>
  );

  // -------------------------
  // GRUPOS
  // -------------------------

  const Groups = () => (
    <>
      <Header
        title="👥 Grupos de estudio"
        subtitle="Estudia junto a tus compañeros."
      />

      <ScrollView>
        <Card>
          <Group
            letter="R"
            name="Grupo de React"
            description="8 estudiantes · 3 mensajes nuevos"
          />

          <Group
            letter="M"
            name="Matemáticas II"
            description="5 estudiantes · Examen viernes"
          />

          <Group
            letter="B"
            name="Bases de Datos"
            description="6 estudiantes · Proyecto grupal"
          />
        </Card>

        <Card>
          <Text
            style={[
              styles.cardTitle,
              {
                color: colors.text,
                marginBottom: 15,
              },
            ]}
          >
            Crear un grupo
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              + Crear grupo
            </Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </>
  );

  const Group = ({
    letter,
    name,
    description,
  }) => (
    <View style={styles.group}>
      <View style={styles.groupAvatar}>
        <Text style={styles.groupAvatarText}>
          {letter}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.groupName,
            { color: colors.text },
          ]}
        >
          {name}
        </Text>

        <Text
          style={[
            styles.groupDescription,
            { color: colors.secondary },
          ]}
        >
          {description}
        </Text>
      </View>
    </View>
  );

  // -------------------------
  // CHAT
  // -------------------------

  const Chat = () => (
    <>
      <Header
        title="💬 Chat"
        subtitle="Habla con tus compañeros."
      />

      <Card style={{ flex: 1 }}>
        <ScrollView style={{ maxHeight: 400 }}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={styles.message}
            >
              <Text style={styles.messageUser}>
                {message.user}
              </Text>

              <View
                style={[
                  styles.bubble,
                  {
                    backgroundColor: dark
                      ? "#292D38"
                      : "#F1F2F6",
                  },
                ]}
              >
                <Text
                  style={{ color: colors.text }}
                >
                  {message.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="#999"
            style={[
              styles.input,
              {
                backgroundColor: colors.input,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            onSubmitEditing={sendMessage}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={sendMessage}
          >
            <Text style={styles.addButtonText}>
              ➤
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </>
  );

  // -------------------------
  // CONTENIDO
  // -------------------------

  const renderScreen = () => {
    switch (screen) {
      case "Tareas":
        return <Tasks />;

      case "Horario":
        return <Schedule />;

      case "Calificaciones":
        return <Grades />;

      case "Pomodoro":
        return <Pomodoro />;

      case "Apuntes":
        return <Notes />;

      case "Grupos":
        return <Groups />;

      case "Chat":
        return <Chat />;

      default:
        return <Dashboard />;
    }
  };

  // -------------------------
  // APP
  // -------------------------

  return (
    <SafeAreaView
      style={[
        styles.safe,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        barStyle={
          dark ? "light-content" : "dark-content"
        }
        backgroundColor={colors.background}
      />

      <View style={styles.app}>
        <View style={styles.content}>
          {renderScreen()}
        </View>

        {/* BARRA DE NAVEGACIÓN */}

        <View
          style={[
            styles.bottomNav,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <NavButton
            icon="⌂"
            label="Inicio"
            active={screen === "Inicio"}
            onPress={() => setScreen("Inicio")}
          />

          <NavButton
            icon="✓"
            label="Tareas"
            active={screen === "Tareas"}
            onPress={() => setScreen("Tareas")}
          />

          <NavButton
            icon="📅"
            label="Horario"
            active={screen === "Horario"}
            onPress={() => setScreen("Horario")}
          />

          <NavButton
            icon="📚"
            label="Apuntes"
            active={screen === "Apuntes"}
            onPress={() => setScreen("Apuntes")}
          />

          <NavButton
            icon="💬"
            label="Chat"
            active={screen === "Chat"}
            onPress={() => setScreen("Chat")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

// -------------------------
// NAV BUTTON
// -------------------------

function NavButton({
  icon,
  label,
  active,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.navButton}
      onPress={onPress}
    >
      <Text
        style={[
          styles.navIcon,
          {
            color: active
              ? "#6366F1"
              : "#9298A6",
          },
        ]}
      >
        {icon}
      </Text>

      <Text
        style={[
          styles.navLabel,
          {
            color: active
              ? "#6366F1"
              : "#9298A6",
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// -------------------------
// ESTILOS
// -------------------------

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  app: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 15,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: "800",
  },

  headerSubtitle: {
    fontSize: 13,
    marginTop: 5,
  },

  iconButton: {
    width: 43,
    height: 43,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  iconText: {
    fontSize: 18,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statCard: {
    width: "48%",
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },

  statTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  statValue: {
    fontSize: 25,
    fontWeight: "800",
    marginTop: 8,
  },

  positive: {
    color: "#10B981",
    fontSize: 11,
    marginTop: 4,
  },

  card: {
    borderRadius: 17,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
  },

  link: {
    color: "#6366F1",
    fontSize: 13,
    fontWeight: "600",
  },

  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    gap: 10,
  },

  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#CED2DC",
    justifyContent: "center",
    alignItems: "center",
  },

  checkText: {
    color: "white",
    fontWeight: "bold",
  },

  taskTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  taskSubject: {
    fontSize: 11,
    marginTop: 3,
  },

  dateBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
  },

  dateText: {
    fontSize: 10,
  },

  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  time: {
    width: 65,
    fontSize: 11,
  },

  scheduleLine: {
    width: 4,
    height: 42,
    borderRadius: 5,
    marginRight: 13,
  },

  className: {
    fontSize: 14,
    fontWeight: "700",
  },

  classRoom: {
    fontSize: 11,
    marginTop: 3,
  },

  grade: {
    marginBottom: 17,
  },

  gradeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  gradeSubject: {
    fontSize: 13,
  },

  gradeNumber: {
    color: "#6366F1",
    fontWeight: "800",
  },

  progressBackground: {
    height: 7,
    borderRadius: 10,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#6366F1",
    borderRadius: 10,
  },

  smallPomodoro: {
    alignItems: "center",
    paddingVertical: 10,
  },

  smallTimer: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 12,
  },

  primaryButton: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "white",
    fontWeight: "700",
  },

  secondaryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 8,
  },

  inputRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 13,
  },

  addButton: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  note: {
    padding: 17,
    borderRadius: 13,
    marginBottom: 12,
  },

  noteTitle: {
    fontWeight: "800",
    fontSize: 15,
    marginBottom: 7,
  },

  noteText: {
    color: "#74706A",
    lineHeight: 20,
    fontSize: 13,
  },

  averageBox: {
    alignItems: "center",
    marginBottom: 25,
  },

  averageNumber: {
    color: "#6366F1",
    fontSize: 48,
    fontWeight: "900",
  },

  averageLabel: {
    fontSize: 13,
  },

  dayTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 20,
  },

  pomodoroContainer: {
    alignItems: "center",
    paddingVertical: 25,
  },

  timerCircle: {
    width: 245,
    height: 245,
    borderRadius: 125,
    borderWidth: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  timerText: {
    fontSize: 47,
    fontWeight: "900",
  },

  timerLabel: {
    fontSize: 12,
    marginTop: 3,
  },

  timerButtons: {
    flexDirection: "row",
    marginTop: 25,
  },

  group: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  groupAvatar: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  groupAvatarText: {
    color: "white",
    fontWeight: "800",
    fontSize: 18,
  },

  groupName: {
    fontWeight: "700",
    fontSize: 14,
  },

  groupDescription: {
    fontSize: 11,
    marginTop: 3,
  },

  message: {
    marginBottom: 15,
  },

  messageUser: {
    color: "#6366F1",
    fontWeight: "800",
    fontSize: 12,
    marginBottom: 4,
  },

  bubble: {
    padding: 11,
    borderRadius: 11,
    alignSelf: "flex-start",
  },

  bottomNav: {
    height: 72,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 5,
  },

  navButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 65,
  },

  navIcon: {
    fontSize: 19,
    marginBottom: 3,
  },

  navLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
});
