import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTask } from '../servicios/service'; 

export default function TaskForm({ show, handleClose, fetchTasks }) {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleTaskNameChange = (event) => setTaskName(event.target.value);

  const handleTaskDescriptionChange = (event) => setTaskDescription(event.target.value);

  const handleSaveTask = async () => {
    const newTask = {
      title: taskName,
      description: taskDescription,
      completed: false,
    };

    try {
      await createTask(newTask);

      setTaskName('');
      setTaskDescription('');

      fetchTasks();

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
