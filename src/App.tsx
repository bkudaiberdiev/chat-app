import { useState } from 'react'
import './App.css'
import './styles/global.scss'
import { BrowserRouter, Outlet } from 'react-router-dom';
import Router from './pages/Router';
import { Toaster } from 'react-hot-toast';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Router />
      <Toaster />
    </BrowserRouter>
  )
}

export default App
