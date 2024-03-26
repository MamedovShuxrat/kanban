import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import BoardPage from './pages/BoardPage'
import Footer from './components/Footer/Footer'
import TaskDetailPage from './pages/TaskDetailPage'
import TasksList from './components/TasksList/TasksList'
import TaskCreationForm from './components/TaskCreationForm'
import AddSelectTask from './components/AddSelectTask'

import './App.scss'


function App() {

  function useLocalStorageState(key, initialValue) {
    const [state, setState] = useState(() => {
      const storedValue = localStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : initialValue
    })

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState]
  }

  const [backlogTasks, setBacklogTasks] = useLocalStorageState('backlogTasks', [])
  const [readyTasks, setReadyTasks] = useLocalStorageState('readyTasks', [])
  const [inProgressTasks, setInProgressTasks] = useLocalStorageState('inProgressTasks', [])
  const [finishedTasks, setFinishedTasks] = useLocalStorageState('finishedTasks', [])


  const onAddItemHandler = (item) => {
    setBacklogTasks((state) => [...state, item])
  }

  const [backlogLength, setBacklogLength] = useState(0)
  const [finishLength, setFinishLength] = useState(0)

  useEffect(() => {
    setBacklogLength(backlogTasks.length)
    setFinishLength(finishedTasks.length)
  }, [backlogTasks, finishedTasks])

  const onMoveItemHandlerReady = (taskId) => {
    const movedTask = backlogTasks.find(task => task.id === taskId)
    const updatedBacklogTasks = backlogTasks.filter(task => task.id !== taskId)

    setBacklogTasks(updatedBacklogTasks)
    setReadyTasks(prevState => [...prevState, movedTask])
  }

  const onMoveItemHandlerInProgress = (taskId) => {
    const movedTask = readyTasks.find(task => task.id === taskId)
    const updatedInProgressTasks = readyTasks.filter(task => task.id !== taskId)

    setReadyTasks(updatedInProgressTasks)
    setInProgressTasks(prevState => [...prevState, movedTask])
  }

  const onMoveItemHandlerFinished = (taskId) => {
    const movedTask = inProgressTasks.find(task => task.id === taskId)
    const updatedFinishedTasks = inProgressTasks.filter(task => task.id !== taskId)

    setInProgressTasks(updatedFinishedTasks)
    setFinishedTasks(prevState => [...prevState, movedTask])
  }
  const onUpdateTask = (updatedTask) => {
    setBacklogTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task))
    setReadyTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task))
    setInProgressTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task))
    setFinishedTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task))
  }



  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path="/" element={
          <BoardPage >
            <TasksList
              title="Backlog"
              tasks={backlogTasks}>

              <TaskCreationForm
                onSubmit={onAddItemHandler}
                backlogTasks={backlogTasks} />

            </TasksList>

            <TasksList
              title="Ready"
              tasks={readyTasks}
              onMoveItem={onMoveItemHandlerReady}
            >
              <AddSelectTask tasks={backlogTasks} onMoveItem={onMoveItemHandlerReady} />
            </TasksList>

            <TasksList
              title="In Progress"
              tasks={inProgressTasks}
              onMoveItem={onMoveItemHandlerInProgress}
            >
              <AddSelectTask tasks={readyTasks} onMoveItem={onMoveItemHandlerInProgress} />
            </TasksList>

            <TasksList
              title="Finished"
              tasks={finishedTasks}
              onMoveItem={onMoveItemHandlerFinished}
            >
              <AddSelectTask tasks={inProgressTasks} onMoveItem={onMoveItemHandlerFinished} />
            </TasksList>
          </BoardPage>
        } />
        <Route path="/task/:id" element={
          <TaskDetailPage
            backlogTasks={backlogTasks}
            readyTasks={readyTasks}
            inProgressTasks={inProgressTasks}
            finishedTasks={finishedTasks}
            onUpdateTask={onUpdateTask} />
        } />
      </Routes>
      <Footer backlogCount={backlogLength} finishCount={finishLength} />
    </div>
  )
}

export default App 
