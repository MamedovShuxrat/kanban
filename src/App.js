import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Board from './Pages/Board'
import Footer from './components/Footer/Footer';
import Def from './Pages/Def';
import TasksList from './components/TasksList/TasksList';
import TaskCreationForm from './components/TaskCreationForm'
import AddSelectTask from './components/AddSelectTask';

import './App.scss';

// Сильно на будущее
// const BOARDS_CONFIG = [
//   {
//     title: 'Backlog'
//   },
//   {
//     title: 'Ready'
//   },
//   {
//     title: 'InProgress'
//   },
//   {
//     title: 'Finished'
//   }
// ]

function App() {

  const [backlogTasks, setBacklogTasks] = useState([]);
  const [readyTasks, setReadyTasks] = useState([]);
  const [InProgressTasks, setInProgressTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);

  console.log(InProgressTasks, 'InProgressTasks');
  console.log(finishedTasks, 'finishedTasks');

  const onAddItemHandler = (item) => {
    setBacklogTasks((state) => [...state, item])
  }

  const [backlogLength, setBacklogLength] = useState(0)
  useEffect(() => {
    setBacklogLength(backlogTasks.length)
    // const finishLength = finished.length
  }, [backlogTasks])


  const onMoveItemHandlerReady = (taskId) => {
    const movedTask = backlogTasks.find(task => task.id === taskId);
    const updatedBacklogTasks = backlogTasks.filter(task => task.id !== taskId);

    setBacklogTasks(updatedBacklogTasks);
    setReadyTasks(prevState => [...prevState, movedTask]);
  };

  const onMoveItemHandlerInProgress = (taskId) => {
    const movedTask = InProgressTasks.find(task => task.id === taskId);
    const updatedInProgressTasks = InProgressTasks.filter(task => task.id !== taskId);

    setInProgressTasks(updatedInProgressTasks);
    setFinishedTasks(prevState => [...prevState, movedTask]);
  };

  const onMoveItemHandlerFinished = (taskId) => {
    const movedTask = finishedTasks.find(task => task.id === taskId);
    const updatedFinishedTasks = finishedTasks.filter(task => task.id !== taskId);

    setFinishedTasks(updatedFinishedTasks);
    setInProgressTasks(prevState => [...prevState, movedTask]);
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={
          <Board >
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
              tasks={InProgressTasks}
              onMoveItem={onMoveItemHandlerInProgress}
            >
              <AddSelectTask tasks={readyTasks} onMoveItem={onMoveItemHandlerInProgress} />
            </TasksList>

            <TasksList
              title="Finished"
              tasks={finishedTasks}
              onMoveItem={onMoveItemHandlerFinished}
            >
              <AddSelectTask tasks={InProgressTasks} onMoveItem={onMoveItemHandlerFinished} />
            </TasksList>
          </Board>
        } />
        <Route path="/def" element={<Def />} />
      </Routes>
      <Footer backlogCount={backlogLength} />
    </div>
  );
}

export default App;
