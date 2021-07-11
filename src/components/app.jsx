import React, { useEffect, useState } from 'react';
import '../css/index.scss';

const App = () => {
  const [error, setError] = useState(false);
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    let isMounted = true; 
    const getTasks = () => {
      fetch('http://localhost:4000/api/todo')
        .then(result => result.json())
        .then(body => {
          if (isMounted) setTasks(body);
        })
        .catch(error => setError(true));
      return () => { isMounted = false };
    };
    getTasks();
  }, []);
  
  if (tasks === null) {
    return null;
  }

  return (
    <div className="app">
      <h1>Front End Test</h1>
      {tasks.length > 0 ? (
        <ul className="Task__item">
          {tasks.map(task => (
            <li className="Task__item" key={task.id}>
              {task.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results</p>
      )}
    </div>
  );
}

export default App;