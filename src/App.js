import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./Components/Login";
import Register from './Components/Register';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
