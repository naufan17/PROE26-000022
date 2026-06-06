import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Payment from './pages/Payment'
import Bill from './pages/Bill'
// import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/bill" element={<Bill />} />
    </Routes>
  )
}

export default App
