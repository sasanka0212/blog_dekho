import { useEffect, useState } from 'react'
import './App.css'
import conf from './conf/conf'
import { login, logout } from './store/authSlice'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom'

function App() {
  //console.log(conf.appwriteProjectId);
  const [loading, setLoading] = useState(true)
  const displatch = useDispatch()

  useEffect(() => {
    authService.getUser()
      .then((userData) => {
        if(userData) 
          displatch(login({userData}))
        else  
          displatch(logout())
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading 
    ? <div className='min-h-screen bg-gray-400 flex flex-wrap content-between'>
        <div className='w-full block'>
          <Header/>
          <Outlet/>
          <Footer/>
        </div>
      </div>
    : null
}

export default App
