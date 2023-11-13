import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store  from '../src/store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Protected} from './components/index.js'
import MyPosts from './pages/MyPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'





// add imports of pages
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        path:'/',
        element:(
        <Protected authentication={false}>
          <Home/>
        </Protected>
        )
      },
      {
        path:'/login',
        element:(
        <Protected authentication={false}>
          <Login/>
        </Protected>
        )
      },
      {
        path:'/signup',
        element:(
          <Protected authentication={false}>
           <Signup/>
        </Protected>
        )
      },
      {
        path:'/my-posts',
        element:(
          <Protected authentication>
            {" "}
           <MyPosts/>
        </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
            <Protected authentication>
                {" "}
                <AddPost />
            </Protected>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <Protected authentication>
                {" "}
                <EditPost />
            </Protected>
        ),
    },
    {
        path: "/post/:slug",
        
         element: (
        <Protected authentication> 
          {" "}
          <Post />
        </Protected> 
         )        
    },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
