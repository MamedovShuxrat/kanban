import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { DndContext, closestCenter, KeyboardSensor, TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

import TaskList from '../components/taskList/TaskList';
import Task from '../components/task/Task';

const Board = ({ sendDataToParent }) => {

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const [tasks, setTasks] = useState({
    backlog: [],
    ready: [],
    inProgress: [],
    finish: [],

  })
  console.log(tasks);

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

  const handleTaskDrop = ({ active, over }) => {
    setTasks(prevTasks => {
      const activeList = prevTasks[active.id];
      const overList = prevTasks[over.id];

      if (active.id === over.id) {
        console.log(prevTasks);
        return prevTasks;
      }
      const activeIndex = activeList.findIndex(task => task.id === active.id,);
      const overIndex = overList.findIndex(task => task.id === over.id);
      const movedTask = activeList[activeIndex];

      const updatedActiveList = arrayMove(activeList, activeIndex, overIndex);
      const updatedOverList = [...overList.slice(0, overIndex), movedTask, ...overList.slice(overIndex)];

      return {
        ...prevTasks,
        [active.id]: updatedActiveList,
        [over.id]: updatedOverList
      }
    })
  }



  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim() !== '') {
      const newTask = { id: uuid(), title: newTaskTitle };
      const updatedTasks = { ...tasks, backlog: [...tasks.backlog, newTask] }
      setTasks(updatedTasks)
      setNewTaskTitle('');
    }
  };
  const allTasks = Object.values(tasks).filter(Array.isArray).flat();
  console.log(allTasks);
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleTaskDrop}>
      <SortableContext items={allTasks} strategy={rectSortingStrategy}>
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
      </SortableContext>
    </DndContext>
  )
}

export default Board

