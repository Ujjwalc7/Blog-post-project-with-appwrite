// import { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import authService from './appwrite/auth'
// import {login, logout} from './store/authSlice'
// import {Header, Footer} from './components'
// import { Outlet } from 'react-router-dom'


// function App() {
//   const [loading, setLoading]= useState(true)
//   const dispacth = useDispatch()
//   useEffect(()=>{
//     authService.getCurrentUser()
//     .then((userData) => {
//       if(userData){
//         dispacth(login({userData}))
//       }else{
//         dispacth(logout())
//       }
//     } )
//     .finally(() => setLoading(false))
//   },[])

//   return !loading ? (
//     <div className=' min-h-screen flex flex-wrap 
//       bg-gray-400 justify-center'>
//       <div>
//         <Header/>
//         <main>
//           <Outlet/>
//         </main>
//         <Footer/>
//       </div>
//     </div>
//   ) : (
//     <div>
//       <h1>loading</h1>
//     </div>
//   )
// }

// export default App




import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App