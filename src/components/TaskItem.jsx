import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateTask } from '../servicios/service'; 

export default function TaskItem({ show, handleClose, task, fetchTasks }) {
  const [completed, setCompleted] = useState(false); 
  const [description, setDescription] = useState(''); 

  useEffect(() => {
    if (task) {
      setCompleted(task.completed); 
      setDescription(task.description || ''); 
    }
  }, [task]); 

  const handleCheckboxChange = () => {
    setCompleted(!completed); 
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); 
  };

  const handleSave = async () => {
    try {
      const updatedTask = {
        description, 
        completed,
      };
      await updateTask(task.id, updatedTask); 
      fetchTasks(); 
      handleClose(); 
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
              checked={completed} 
              onChange={handleCheckboxChange} 
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
              value={description} 
              onChange={handleDescriptionChange} 
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
