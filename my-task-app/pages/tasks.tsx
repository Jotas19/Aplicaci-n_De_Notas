import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Cambiado a useRouter para Next.js
import axiosClient from "../utils/axiosClient";
import withAuth from "../utils/withAuth";
import "../styles/styles.css"; // Importar el archivo de estilos

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string; // Agregar la propiedad dueDate
  status: "Pendiente" | "En progreso" | "Completada"; // Agregar la propiedad status
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  const day = String(localDate.getDate()).padStart(2, "0");
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const year = localDate.getFullYear();
  return `${day}/${month}/${year}`;
};

const Tasks = () => {
  const router = useRouter(); // Inicializar useRouter
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "", // Añadir estado para la fecha de vencimiento
    status: "Pendiente", // Añadir estado para el estado de la tarea
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [removingTaskId, setRemovingTaskId] = useState<number | null>(null);

  // Función para obtener las tareas del usuario autenticado
  const fetchTasks = async () => {
    try {
      const response = await axiosClient.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setErrorMessage(
        "Error al obtener las tareas. Inténtalo de nuevo más tarde."
      );
    }
  };

  const createTask = async () => {
    if (
      !newTask.title.trim() ||
      !newTask.description.trim() ||
      !newTask.dueDate
    ) {
      setErrorMessage(
        "El título, la descripción y la fecha de vencimiento son obligatorios."
      );
      return;
    }

    setErrorMessage("");

    try {
      await axiosClient.post("/tasks", newTask);
      fetchTasks(); // Actualiza la lista de tareas
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        status: "Pendiente",
      }); // Limpiar el formulario
    } catch (error) {
      console.error("Error creating task:", error);
      setErrorMessage("Error al crear la tarea. Inténtalo de nuevo más tarde.");
    }
  };

  const updateTask = async () => {
    if (
      !newTask.title.trim() ||
      !newTask.description.trim() ||
      !newTask.dueDate
    ) {
      setErrorMessage(
        "El título, la descripción y la fecha de vencimiento son obligatorios."
      );
      return;
    }

    setErrorMessage("");

    if (editingTaskId) {
      try {
        await axiosClient.put(`/tasks/${editingTaskId}`, newTask);
        fetchTasks(); // Actualiza la lista de tareas
        setEditingTaskId(null);
        setNewTask({
          title: "",
          description: "",
          dueDate: "",
          status: "Pendiente",
        }); // Limpiar el formulario
      } catch (error) {
        console.error("Error updating task:", error);
        setErrorMessage(
          "Error al actualizar la tarea. Inténtalo de nuevo más tarde."
        );
      }
    }
  };

  const deleteTask = async (id: number) => {
    setRemovingTaskId(id);

    setTimeout(async () => {
      try {
        await axiosClient.delete(`/tasks/${id}`);
        fetchTasks(); // Actualiza la lista de tareas
        setRemovingTaskId(null);
        // Limpiar el formulario después de eliminar la tarea
        setEditingTaskId(null); // Asegurarse de que no haya tarea editando
        setNewTask({
          title: "",
          description: "",
          dueDate: "",
          status: "Pendiente",
        }); // Limpiar el formulario
      } catch (error) {
        console.error("Error deleting task:", error);
        setErrorMessage(
          "Error al eliminar la tarea. Inténtalo de nuevo más tarde."
        );
      }
    }, 300);
  };

  const handleEdit = (task: Task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
    });
    setEditingTaskId(task.id);
  };

  // Manejar el cierre de sesión y eliminar el token
  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token de autenticación
    router.push("/auth"); // Redirige al usuario a la página de inicio de sesión
  };

  // Eliminar el token al abandonar la página
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("token"); // Eliminar el token
    };

    window.addEventListener("beforeunload", handleBeforeUnload); // Agregar el evento

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload); // Limpiar el evento al desmontar
    };
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h2 className="heading">Tareas</h2>
      <button onClick={handleLogout} className="logoutButton">
        Cerrar Sesión
      </button>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <div className="taskContainer">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`taskCard ${
              removingTaskId === task.id ? "scale-out-center" : ""
            }`}
          >
            <h3 className="taskTitle">{task.title}</h3>
            <p className="taskDescription">{task.description}</p>
            <p className="taskDueDate">
              Fecha de vencimiento: {formatDate(task.dueDate)}
            </p>
            <p className="taskStatus">Estado: {task.status}</p>
            <button
              onClick={() => deleteTask(task.id)}
              className="deleteButton"
            >
              Eliminar
            </button>
            <button onClick={() => handleEdit(task)} className="editButton">
              Editar
            </button>
          </div>
        ))}
      </div>
      <div className="formContainer">
        <input
          type="text"
          placeholder="Título"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="input"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="input"
        />
        <input
          type="date"
          placeholder="Fecha de Vencimiento"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          className="input"
        />

        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className="input"
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Completada">Completada</option>
        </select>

        <button
          onClick={editingTaskId ? updateTask : createTask}
          className="createButton"
        >
          {editingTaskId ? "Actualizar Tarea" : "Crear Tarea"}
        </button>
      </div>
    </div>
  );
};

export default withAuth(Tasks);
