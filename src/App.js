import './App.scss';
import Header from './components/header/Header';
import Board from './pages/Board'
import Footer from './components/footer/Footer';
import Def from './pages/Def';

import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';

function App() {
  const [data, setData] = useState(null);
  const receiveDataFromChild = (receivedData) => {
    setData(receivedData);
  };
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Board sendDataToParent={receiveDataFromChild} />} />
        <Route path="/def" element={<Def />} />
      </Routes>
      <Footer data={data} />
    </div>
  );
}

export default App;
