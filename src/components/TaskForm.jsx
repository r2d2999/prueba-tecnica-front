import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTask } from '../servicios/service'; // Asegúrate de que esta función está importada correctamente

export default function TaskForm({ show, handleClose, fetchTasks }) {
  // Estado para los campos del formulario
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  // Función para manejar el cambio en el input de nombre
  const handleTaskNameChange = (event) => setTaskName(event.target.value);

  // Función para manejar el cambio en el input de descripción
  const handleTaskDescriptionChange = (event) => setTaskDescription(event.target.value);

  // Función para manejar el envío del formulario
  const handleSaveTask = async () => {
    // Crear un objeto con los datos de la nueva tarea
    const newTask = {
      title: taskName,
      description: taskDescription,
      completed: false, // Por defecto, la tarea no está completada
    };

    try {
      // Enviar la nueva tarea al backend
      await createTask(newTask);

      // Limpiar el formulario después de enviar
      setTaskName('');
      setTaskDescription('');

      // Llamar a fetchTasks para actualizar la lista de tareas
      fetchTasks();

      // Cerrar el modal
      handleClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="taskName" className="form-label">Task Name</label>
              <input
                type="text"
                className="form-control"
                id="taskName"
                placeholder="Enter task name"
                value={taskName}
                onChange={handleTaskNameChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="taskDescription" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="taskDescription"
                rows="3"
                placeholder="Enter task description"
                value={taskDescription}
                onChange={handleTaskDescriptionChange}
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTask}>
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
