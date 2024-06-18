import { useState, useEffect } from "react";
import { TTask } from "./types/types";
import List from "./components/List";
import Form from "./components/Form";


const setLocalStorage = (tasks: TTask[]): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const getFromLocalStorage = (): TTask[] => {
  const storageTasks = localStorage.getItem('tasks');
  return storageTasks ? JSON.parse(storageTasks) : []
}

function Component() {
  const [tasks, setTasks] = useState<TTask[]>(() => getFromLocalStorage())

  useEffect(() => {
    setLocalStorage(tasks)
  },[tasks])

  const addTask = (newTask: TTask) => {
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id: string) => {
    const taskUpdated = tasks.map(task => {
      if(task.id === id) {
        return {...task, isCompleted: !task.isCompleted}
      }
      return task;
    })
    setTasks(taskUpdated)
  }



  return (
    <div>
      <Form addTask={addTask}/>
      <List toggleTask={toggleTask} tasks={tasks}/>
    </div>
  );
}
export default Component;
