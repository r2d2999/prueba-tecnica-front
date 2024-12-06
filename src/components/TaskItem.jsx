import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateTask } from '../servicios/service'; // Asegúrate de tener esta función

export default function TaskItem({ show, handleClose, task, fetchTasks }) {
  const [completed, setCompleted] = useState(false); // Estado para el checkbox
  const [description, setDescription] = useState(''); // Estado para la descripción

  // Usamos useEffect para configurar el estado cuando el componente se monta
  useEffect(() => {
    if (task) {
      setCompleted(task.completed); // Inicializa el checkbox según el valor de completed
      setDescription(task.description || ''); // Inicializa la descripción de la tarea
    }
  }, [task]); // Se ejecuta cada vez que cambian los props, por ejemplo cuando se pasa una tarea

  // Función para manejar el cambio del checkbox
  const handleCheckboxChange = () => {
    setCompleted(!completed); // Cambiar el estado del checkbox
  };

  // Función para manejar el cambio en la descripción
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Actualiza el estado de la descripción
  };

  // Función para guardar la tarea actualizada
  const handleSave = async () => {
    try {
      const updatedTask = {
        description, // Enviamos la descripción actualizada
        completed, // Enviamos el estado del checkbox
      };
      await updateTask(task.id, updatedTask); // Actualizar la tarea en la base de datos
      fetchTasks(); // Recargar las tareas después de la actualización
      handleClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="completed" className="form-label">
              Completed
            </label>
            <input
              type="checkbox"
              id="completed"
              checked={completed} // El estado del checkbox depende de `completed`
              onChange={handleCheckboxChange} // Actualiza el estado cuando cambia el checkbox
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className="form-control"
              rows="3"
              value={description} // El valor de la descripción depende del estado
              onChange={handleDescriptionChange} // Actualiza la descripción cuando cambia el valor
              placeholder="Enter task description"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
