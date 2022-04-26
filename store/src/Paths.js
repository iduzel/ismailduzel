import React from "react";
import { Routes, Route } from "react-router-dom";
import Demo from "./pages/demo/Demo";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import EmailConfirm from "./components/email/EmailConfirm";
import ForgotPass from "./pages/forgotPass/ForgotPass";
import ChangePass from "./pages/changePass/ChangePass";
import EmployeeList from "./components/employee/EmployeeList";
import GLogin from "./components/GLogin";
import Admin from "./pages/admin/Admin";
import Categories from './pages/admin/Categories'
import Posts from "./components/posts/Posts";
import BlogSingle from "./components/posts/BlogSingle";
import AddPost from "./components/posts/AddPost";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import EmployeeAdmins from "./components/employee/EmployeeAdmins";
import EmployeeDetails from "./components/employee/EmployeeDetails";


const Paths = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />      
      <Route path="/employee" element={<EmployeeList />} />
      <Route path="/employee/:detail" element={<EmployeeDetails />} />
      <Route path="/employeeAdmin" element={<EmployeeAdmins />} />
      <Route path="/dashboard" element={<EmployeeDashboard />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/:category" element={<Categories />} />     
      <Route path="/blogsingle" element={<BlogSingle />} />
      <Route path="/posts" element={<Posts />} />  
      <Route path="/posts/:addpost" element={<AddPost />} />      
      <Route path="/login" element={<Login />} />
      <Route path='/glogin/:id' exact element={<GLogin />}/>
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/emailconfirm/:token" element={<EmailConfirm />} />
      <Route path="/forgotpassword" element={<ForgotPass />} />
      <Route path="/changepassword/:token" element={<ChangePass />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/*" element={<Unknown />} />
    </Routes>
  );
};

function Unknown() {
  return <div>Error 404 | Page not found!</div>;
}

export default Paths;
