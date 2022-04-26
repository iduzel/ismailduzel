import React, { useContext } from 'react'
import './Employee.scss'
import { Row } from 'react-bootstrap'
import { DataContext } from '../../pages/context/Context';
import { MdDashboard } from 'react-icons/md'
import { FaUserFriends } from 'react-icons/fa'
import { AiTwotoneSetting } from 'react-icons/ai'
import { RiAdminFill } from 'react-icons/ri'
import { Link } from 'react-router-dom';
import avatar from '../../pictures/user1.jpg'

const EmployeeSideMenu = () => {

    const {
        flag,
        setFlag,
        userData,
        setUserData,
        employeeData,
        setEmployeeData,
        categoryData,
      } = useContext(DataContext);

      console.log(userData)
  return (
    <div>
         <Row>
            <div className="user-part">
              <div className="user-image-div">
                <img src={(userData)? userData.image : avatar} alt="..." />
              </div>
              <h5>{(userData) ? userData?.firstName + ' ' + userData?.lastName : ''}</h5>
              <h6>{(userData) ? userData?.email : ''}</h6>
            </div>
            <div className="left-menu">

              <ul>
                <li className=''><Link to="/dashboard"><span><MdDashboard /></span>     Dashboard</Link> </li>
                <li><Link to="/employee"><span><FaUserFriends /></span> Employee Management</Link></li>
                <li><Link to="/employee"><span><AiTwotoneSetting /></span> System Management</Link></li>
                <li><Link to="/employeeAdmin"><span><RiAdminFill /></span> Admin Management</Link></li>
              </ul>

            </div>
          </Row>
    </div>
  )
}

export default EmployeeSideMenu