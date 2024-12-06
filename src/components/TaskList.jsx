import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from './TaskForm';
import { getTasks, deleteTask } from '../servicios/service'; // Asegúrate de tener deleteTask en tu servicio
import TaskItem from './TaskItem';
import Swal from 'sweetalert2'; // Importar SweetAlert2

export default function TaskList() {
  const [show, setShow] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar errores
  const [selectedTask, setSelectedTask] = useState(null); // Para guardar la tarea seleccionada

  const cerrar = () => setShow(false);
  const abrir = () => setShow(true);

  const cerrarItem = () => setShowItem(false);
  const abrirItem = (task) => {
    setSelectedTask(task);  // Establecer la tarea seleccionada
    setShowItem(true);
  };

  // Función para obtener las tareas desde el servicio
  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      console.log(response.data); // Verifica que sea un arreglo
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Error fetching tasks');
    } finally {
      setLoading(false); // Aseguramos que se cambie el estado de loading independientemente del éxito o error
    }
  };

  // Función para eliminar una tarea con confirmación
  const handleDelete = async (id) => {
    // Mostrar una alerta de confirmación antes de eliminar
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta tarea se eliminará permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        // Llamada al servicio para eliminar la tarea
        await deleteTask(id);
        // Después de eliminar, actualizamos la lista de tareas
        setTasks(tasks.filter((task) => task.id !== id));
        Swal.fire('Eliminado', 'La tarea ha sido eliminada', 'success'); // Mensaje de éxito
      } catch (error) {
        console.error('Error deleting task:', error);
        setError('Error deleting task');
        Swal.fire('Error', 'Hubo un problema al eliminar la tarea', 'error'); // Mensaje de error
      }
    }
  };

  // Llamamos a la API cuando el componente se monte
  useEffect(() => {
    fetchTasks();
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  return (
    <div>
      <div>Task List</div>
      <div className="header">
        <button className="btn btn-success" onClick={abrir}>
          Add new Task
        </button>
      </div>

      {/* Mostrar tareas si ya fueron cargadas */}
      {loading ? (
        <p>Loading tasks...</p> // Mensaje de carga
      ) : error ? (
        <p>{error}</p> // Mensaje de error
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">COMPLETED</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.completed ? 'Sí' : 'No'}</td>
                <td>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-primary" onClick={() => abrirItem(task)}>
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(task.id)} // Llamada a la función de eliminar
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal para agregar tarea */}
      <TaskForm show={show} handleClose={cerrar} fetchTasks={fetchTasks} />
      {/* Modal para mostrar detalles de la tarea */}
      <TaskItem show={showItem} handleClose={cerrarItem} task={selectedTask} fetchTasks={fetchTasks} />
    </div>
  );
}
