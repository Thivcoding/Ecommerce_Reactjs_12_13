
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from '../pages/dashboard/Dashboard'
// import PrivateRoute from './PrivateRoute'S
import AdminRoute from './AdminRoute'
import NotFound from '../pages/errors/NotFound'
import AdminLayout from '../layouts/AdminLayout'
import UserList from '../pages/users/UserList'
import UserCreate from '../pages/users/UserCreate'
import UserEdit from '../pages/users/UserEdit'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>

            {/* public route */}
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>

            <Route path='/login' element={<Login/>}/>

            {/* admin */}
            <Route path='/admin' element={
              <AdminRoute>
                  <AdminLayout/>
              </AdminRoute>
              }>
                  {/* child routes */}
                  <Route index element={<Dashboard/>}/>

                  {/* page user */}
                  <Route path='users' element={<UserList/>}/> 
                  <Route path='users/create' element={<UserCreate/>}/>
                  <Route path='users/edit/:id' element={<UserEdit/>}/>

            </Route>

            {/* Not Found page */}
            <Route path='*' element={<NotFound/>} />

        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes