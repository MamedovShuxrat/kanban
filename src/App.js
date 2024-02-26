import './App.scss';
import Header from './components/header/Header';
import Board from './pages/Board'
import Footer from './components/footer/Footer';
import Def from './pages/Def';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/def" element={<Def />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
