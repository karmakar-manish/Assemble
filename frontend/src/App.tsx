import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthUserHook } from './hooks/useAuthUserHook'
import { Loader } from 'lucide-react'
import { ToastContainer } from 'react-toastify'


function App() {

  //get the current user details from "/auth/me" route of middleware
  const {data: authUser, isLoading} = useAuthUserHook()

  //for showing the loading screen
  if(isLoading)
  {
    return <div className='h-screen flex flex-col justify-center items-center'>
      <Loader className="animate-spin size-10"/>
    </div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={authUser?<Homepage/>: <Navigate to={"/login"}/>}/>
          <Route path='/signup' element={!authUser?<SignupPage/>: <Navigate to={"/"}/>}/>
          <Route path='/login' element={!authUser?<LoginPage/>: <Navigate to={"/"}/>}/>
          <Route path='/settings' element={<SettingsPage/>}/>
          <Route path='/profile' element={authUser?<ProfilePage/>: <Navigate to={"/login"}/>}/>
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  )
}

export default App
