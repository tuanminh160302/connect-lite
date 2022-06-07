import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header.component';
import Preloader from './components/Preloader';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserContext } from './lib/context';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { createUserDocument } from './firebase/firebase.init';
import { useSelector, useDispatch } from 'react-redux';
import { togglePreloader } from './redux/preloaderSlice';

const App = () => {

  const auth = getAuth()
  const [user, setUser] = useState(null)

  const showPreloader = useSelector((state) => state.preloader.show)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(togglePreloader(true))
    onAuthStateChanged(auth, (user) => {
      if (user) {
        createUserDocument(user).then(() => {
          setUser(user)
          dispatch(togglePreloader(false))
        })
      } else {
        setUser(null)
        dispatch(togglePreloader(false))
      }
    })
  }, [auth])

  return (
    <UserContext.Provider value={user}>
      <div className='App bg-bg_light w-full h-full'>
        {showPreloader ? <Preloader /> : null}
        <div><Toaster/></div>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </div>
    </UserContext.Provider>
  )
}

export default App;
