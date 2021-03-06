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
import { useSelector, useDispatch } from 'react-redux';
import { togglePreloader } from './redux/preloaderSlice';
import slideEase from './lib/customEase';
import Profile from './pages/Profile';
import MenuPanel from './components/MenuPanel.component';
import { useLocation } from 'react-router';
import { useMutation, useLazyQuery } from '@apollo/client';
import { CreateUsers, QueryPeople, QueryUser } from './graphql';

const App = () => {

  const auth = getAuth()
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [queryUser] = useLazyQuery(QueryUser)
  const [createUserRecord, {data, loading, error}] = useMutation(CreateUsers, {
    refetchQueries: () => [{
      query: QueryPeople
    }]
  })
 
  const showPreloader = useSelector((state) => state.preloader.show)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(togglePreloader(true))
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        console.log(user)
        queryUser({variables: {where: {uid: user.uid}}}).then((res) => {
          const createdAt = res.data.users.length ? user.metadata.createdAt : new Date().getTime().toString()
          const userObject = {
            createdAt,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            username: user.email.split("@")[0],
          }
          if (!res.data.users.length) {
            setUserData(userObject)
            createUserRecord({variables: {input: userObject}}).then((res) => {
              console.log(res)
              dispatch(togglePreloader(false))
            }).catch(err => console.log(err))
          } else {
            setUserData(userObject)
            dispatch(togglePreloader(false))
            console.log("User record already exists")
          }
        })
      } else {
        setUser(null)
        setUserData(null)
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
        <div className="text-xs"><Toaster/></div>
        <Header />
        {
          user ?
            <MenuPanel /> : null
        }
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          {/* <Route path='/dashboard' element={<Dashboard />}></Route> */}
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
