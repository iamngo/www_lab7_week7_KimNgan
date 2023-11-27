import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import Home from './home';
import Admin from './admin';
import Cart from './cart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/dashboard' element={<Admin />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/cart' element={<Cart />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
