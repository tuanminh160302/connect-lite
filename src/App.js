import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import People from './pages/People';
import Project from './pages/Projects';
import Skills from './pages/Skills';
import Skill from './pages/Skill'
import Header from './components/Header.component';
import Preloader from './components/Preloader';
import Admin from './pages/Admin';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserContext } from './lib/context';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { createUserDocument } from './firebase/firebase.init';
import { useSelector, useDispatch } from 'react-redux';
import { togglePreloader } from './redux/preloaderSlice';
import slideEase from './lib/customEase';
import Profile from './pages/Profile';
import { fetchUserData } from './firebase/firebase.init'
import MenuPanel from './components/MenuPanel.component';
import { useLocation } from 'react-router';
import { useMutation } from '@apollo/client';
import { CreateUsers } from './graphql';

const App = () => {

  const auth = getAuth()
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [createUserRecord, {data, loading, error}] = useMutation(CreateUsers)

  if (loading) console.log('Creating/Updating/Merging user record')
 
  const showPreloader = useSelector((state) => state.preloader.show)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(togglePreloader(true))
    onAuthStateChanged(auth, (user) => {
      if (user) {
        createUserDocument(user).then(() => {
          setUser(user)
          fetchUserData(user.uid).then((res) => {
            console.log(res)
            setUserData(res)
            createUserRecord({variables: {input: res}}).then(() => {
              console.log(res)
              dispatch(togglePreloader(false))
            }).catch(err => {})
          })
        })
      } else {
        setUser(null)
        dispatch(togglePreloader(false))
      }
    })
  }, [auth])

  useEffect(() => {
    //Initiate custom ease
    slideEase()
  }, [])

  useEffect(() => {
    dispatch(togglePreloader(true))
  }, [location.pathname])

  return (
    <UserContext.Provider value={{ user, userData }}>
      <div className='App bg-bg_light w-full h-fit flex flex-row'>
        {showPreloader ? <Preloader /> : null}
        <div><Toaster /></div>
        <Header />
        {
          user ?
            <MenuPanel /> : null
        }
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/people' element={<People />}></Route>
          <Route path='/people/:username' element={<Profile />}></Route>
          <Route path='/projects' element={<Project />}></Route>
          <Route path='/skills' element={<Skills />}></Route>
          <Route path='/skills/:skill' element={<Skill />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
        </Routes>
      </div>
    </UserContext.Provider>
  )
}

export default App;
