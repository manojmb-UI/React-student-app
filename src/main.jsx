import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Login.jsx'
import Signin from './Signin.jsx'
import Layout from './Layout.jsx'
import Dashboard from './Dashboard.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import StudentForm from './components/StudentForm.jsx'
import StudentList from './components/StudentList.jsx'
import StudentView from './components/StudentView.jsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/',
    element:
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'studentList',
        element: <StudentList />
      },
      {
        path: 'studentList/:id',
        element: <StudentList />
      },
      {
        path: 'studentForm',
        element: <StudentForm />
      },
      {
        path: 'studentView',
        element: <StudentView/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
