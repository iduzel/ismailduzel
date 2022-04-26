import React from 'react'
import { Link } from 'react-router-dom'
import './AdminNav.scss'

const AdminNav = () => {
  return (
    <div className='admin-nav'>
      <ul className='navbar-nav text-uppercase ml-auto'>
               <li className='nav-item'>
                   <Link to="/admin">Admin</Link>
               </li>
               <li className='nav-item'>
                   <Link to="/admin/category">Departments</Link>
               </li>

           </ul>
    </div>
  )
}

export default AdminNav