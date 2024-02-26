import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Board.scss'

import TaskList from '../components/taskList/TaskList';
import Task from '../components/task/Task';

const Board = () => {
  const [backlogTasks, setBacklogTasks] = useState([])
  const [readyTasks, setReadyTasks] = useState([])
  const [inProgressTasks, setInProgressTasks] = useState([])
  const [finishedTasks, setFinishedTasks] = useState([])

  const [backlogList, setBacklogList] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isInput, setIsInput] = useState(false)

  const handleTaskDrop = (taskId, targetList) => {
    const taskToMove = backlogTasks.find(task => task.id === taskId);

    switch (targetList) {
      case 'ready':
        setReadyTasks([...readyTasks, taskToMove]);
        break;
      case 'inProgress':
        setInProgressTasks([...inProgressTasks, taskToMove]);
        break;
      case 'finished':
        setFinishedTasks([...finishedTasks, taskToMove]);
        break;
      default:
        break;
    }

    const updatedBacklogTasks = backlogTasks.filter(task => task.id !== taskId);
    setBacklogTasks(updatedBacklogTasks);
  };

  const handleAddTask = (e) => {
    console.log('sdsds')
    e.preventDefault();
    if (newTaskTitle.trim() !== '') {
      const newTask = { id: uuid(), title: newTaskTitle };
      setBacklogList([...backlogList, newTask]);
      setNewTaskTitle('');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='Board'>
        <div className="container">
          <div className="board__wrapper">
            <TaskList title="Backlog" tasks={backlogList} onTaskDrop={handleTaskDrop}>
              {backlogList.map(task => {
                <Task key={task.id} id={task.id} title={task.title} />
              })}
              <form className='form' onSubmit={handleAddTask}>
                {isInput && <input className='board__input'
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="_______________________"
                />}
                {isInput ? <button className='submit-btn' type="submit" onClick={() => setIsInput(!isInput)}>Submit</button> :
                  <button onClick={() => setIsInput(!isInput)} className='add__card-btn' type="submit">Add Task</button>}
              </form>
            </TaskList>
            <TaskList title="Ready" tasks={readyTasks} onTaskDrop={handleTaskDrop}>
              {readyTasks.map(task => (
                <Task key={task.id} id={task.id} title={task.title} />
              ))}
            </TaskList>
            <TaskList title="InProgress" tasks={inProgressTasks} onTaskDrop={handleTaskDrop}>
              {inProgressTasks.map(task => (
                <Task key={task.id} id={task.id} title={task.title} />
              ))}
            </TaskList>
            <TaskList title="Finished" tasks={finishedTasks} onTaskDrop={handleTaskDrop}>
              {finishedTasks.map(task => (
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