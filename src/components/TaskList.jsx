import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from './TaskForm';
import { getTasks, deleteTask } from '../servicios/service'; 
import TaskItem from './TaskItem';
import Swal from 'sweetalert2'; 

export default function TaskList() {
  const [show, setShow] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [selectedTask, setSelectedTask] = useState(null); 

  const cerrar = () => setShow(false);
  const abrir = () => setShow(true);

  const cerrarItem = () => setShowItem(false);
  const abrirItem = (task) => {
    setSelectedTask(task);  
    setShowItem(true);
  };

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Error fetching tasks');
    } finally {
      setLoading(false); 
    }
  };

  const handleDelete = async (id) => {
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
        await deleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
        Swal.fire('Eliminado', 'La tarea ha sido eliminada', 'success'); 
      } catch (error) {
        console.error('Error deleting task:', error);
        setError('Error deleting task');
        Swal.fire('Error', 'Hubo un problema al eliminar la tarea', 'error'); 
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); 

  return (
    <div>
      <div>Task List</div>
      <div className="header">
        <button className="btn btn-success" onClick={abrir}>
          Add new Task
        </button>
      </div>

      {loading ? (
        <p>Loading tasks...</p> 
      ) : error ? (
        <p>{error}</p> 
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
                      onClick={() => handleDelete(task.id)} 
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

      <TaskForm show={show} handleClose={cerrar} fetchTasks={fetchTasks} />
      <TaskItem show={showItem} handleClose={cerrarItem} task={selectedTask} fetchTasks={fetchTasks} />
    </div>
  );
}
