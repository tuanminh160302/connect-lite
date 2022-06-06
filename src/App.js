import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header.component';

function App() {
  return (
    <div className='App w-full h-full'>
      <Header />
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
