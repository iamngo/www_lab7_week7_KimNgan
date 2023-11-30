import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import Home from './home';
import Admin from './admin';
import Cart from './cart';
import Statistic from './admin/Statistic';
import Dashboard from './dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/statistic' element={<Statistic />}/>
        <Route path='/employee-manage' element={<Admin />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/cart' element={<Cart />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
