import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import TaskList from '../components/taskList/TaskList';
import Task from '../components/task/Task';

const Board = ({ sendDataToParent }) => {
  const [tasks, setTasks] = useState({
    backlog: [],
    ready: [],
    inProgress: [],
    finish: [],

  })

  const sendData = () => {
    const data = {
      backlogCount: tasks.backlog.length,
      finishCount: tasks.finish.length,
    }
    sendDataToParent(data)
  }

  useEffect(() => {
    sendData()
  }, [tasks])

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [isInput, setIsInput] = useState(false)

  const handleTaskDrop = (taskId, targetList) => {
    setTasks(prevTasks => {
      console.log(prevTasks, taskId);
      console.log(targetList);
      const updatedTasks = { ...prevTasks };


      const taskToMoveIndex = updatedTasks[targetList].find(task => task.id === taskId);

      if (taskToMoveIndex !== -1) {
        updatedTasks[targetList] = updatedTasks[targetList].filter(task => task.id !== taskId);
      }
      return updatedTasks;
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim() !== '') {
      const newTask = { id: uuid(), title: newTaskTitle };
      const updatedTasks = { ...tasks, backlog: [...tasks.backlog, newTask] }
      setTasks(updatedTasks)
      setNewTaskTitle('');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='Board'>
        <div className="container">
          <div className="board__wrapper">
            <TaskList title="Backlog" tasks={tasks.backlog} onTaskDrop={handleTaskDrop}>
              {tasks.backlog.map(task =>
                <Task key={task.id} id={task.id} title={task.title} />
              )}
              <form className='form' onSubmit={handleAddTask}>
                {isInput && <input
                  className='board__input'
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="_______________________" />
                }
                {
                  isInput ? <button
                    disabled={newTaskTitle.length < 1}
                    className={` submit-btn  ${newTaskTitle.length < 1 ? "disabled" : ""}`}
                    type="submit"
                    onClick={() => setIsInput(!isInput)}>
                    Submit
                  </button> :
                    <button
                      onClick={() => setIsInput(!isInput)}
                      className='add__card-btn'
                      type="submit">
                      Add Card
                    </button>
                }
              </form>
            </TaskList>
            <TaskList title="Ready" tasks={tasks.ready} onTaskDrop={handleTaskDrop}>
              {tasks.ready.map(task => (
                <Task key={task.id} id={task.id} title={task.title} />
              ))}
            </TaskList>
            <TaskList title="InProgress" tasks={tasks.inProgress} onTaskDrop={handleTaskDrop}>
              {tasks.inProgress.map(task => (
                <Task key={task.id} id={task.id} title={task.title} />
              ))}
            </TaskList>
            <TaskList title="Finished" tasks={tasks.finish} onTaskDrop={handleTaskDrop}>
              {tasks.finish.map(task => (
                <Task key={task.id} id={task.id} title={task.title} />
              ))}
            </TaskList>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default Board