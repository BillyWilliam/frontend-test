import React, { useEffect, useState } from "react";
import "../css/index.scss";

const App = () => {
  const [error, setError] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    console.log("Tasks useEffect", tasks);
    let isMounted = true;
    const getTasks = () => {
      fetch("http://localhost:4000/api/todo")
        .then((result) => result.json())
        .then((body) => {
          if (isMounted) {
            setTasks(body);
            separateTasks(body);
          }
        })
        .catch((error) => setError(true));
      return () => {
        isMounted = false;
      };
    };
    getTasks();
  }, [setTasks]);

  function separateTasks(tasks) {
    console.log("separateTasks", tasks);
    if (tasks) {
      const findDoneTasks = tasks.filter((t) => t.isDone === "1");
      const sortDoneTasks = findDoneTasks.sort((a, b) =>
        a.importance > b.importance ? 1 : -1
      );
      const findIncompleteTasks = tasks.filter((t) => t.isDone === "0");
      const sortIncompleteTasks = findIncompleteTasks.sort((a, b) =>
        a.importance > b.importance ? 1 : -1
      );
      console.log("Done Tasks", sortDoneTasks);
      console.log("Incomplete Tasks", sortIncompleteTasks);
      setDoneTasks(sortDoneTasks);
      setIncompleteTasks(sortIncompleteTasks);
    }
  }

  // const handleOnChange = (item) => {
  //   console.log(item);
  //   const updateCheckedTask = tasks.map(t => {
  //     if (t.id === item.id) {
  //       if (t.isDone === "1") {
  //         t.isDone = "0";
  //         return t;
  //       }
  //       if (t.isDone === "0") {
  //         t.isDone = "1";
  //         return t;
  //       }
  //     }
  //   });
  //   setTasks(updateCheckedTask);
  // }

  return (
    <div className="app">
      <h1>Front End Test</h1>
      <div className="Tasks">
        {tasks !== null && tasks.length > 0 ? (
          <>
            {incompleteTasks.length > 0 && (
              <ul className="Task__list">
                {incompleteTasks.map((t) => (
                  <li className="Task__item" key={t.id}>
                    <div className="Task__checkbox">
                      <img src="src/assets/icon-tick.svg" alt="Icon Cross" />
                    </div>
                    <h4 className="Task__title">
                      {t.title}
                    </h4>
                    <button type="button" className="Task__button">
                      <img src="src/assets/icon-cross.svg" alt="Icon Cross" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {doneTasks.length > 0 && (
              <ul className="Task__list complete">
                {doneTasks.map((t) => (
                  <li className="Task__item" key={t.id}>
                    <div className="Task__checkbox">
                      <img src="src/assets/icon-tick.svg" alt="Icon Cross" />
                    </div>
                    <h4 className="Task__title">
                      {t.title}
                    </h4>
                    <button type="button" className="Task__button">
                      <img src="src/assets/icon-cross.svg" alt="Icon Cross" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p>No results</p>
        )}
      </div>
    </div>
  );
};

export default App;
