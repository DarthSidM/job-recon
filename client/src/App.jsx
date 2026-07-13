import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Protected from './components/Protected';
import Public from './components/Public';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Public />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
