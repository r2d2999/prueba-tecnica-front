import logo from './logo.svg';
import './App.css';
import Task from './Task';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TaskList/>

      </header>
    </div>
    
  );
}

export default App;
