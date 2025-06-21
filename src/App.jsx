// import { useState } from 'react'
// import NoteForm from './components/note-form/NoteForm'

// // import './App.css'

// function App() {

//   return (
//     <>
//     <h1 className="text-5xl text-red-500">Notes Hub</h1>
//     <NoteForm post={null}/>
//     </>
//   )
// }

// export default App

import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Header, Footer } from "./components/index"
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  if (loading) {
    return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
  </div>
)
  }

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App


