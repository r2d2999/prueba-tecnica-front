import axios from '../utils/axios';  


const API_URL = 'http://localhost:5000';



export const getTasks = async () => {
  return await axios.get(`${API_URL}/tasks`);
};

export const deleteTask = async (id) => {
  return await axios.delete(`${API_URL}/tasks/${id}`);
};




// Función para actualizar el estado de una tarea
export const updateTask = (id, updatedTask) => {
    return axios.put(`/tasks/${id}`, updatedTask);
  };




export const createTask = (newTask) => {
    return axios.post('/tasks', newTask);
  };
  




