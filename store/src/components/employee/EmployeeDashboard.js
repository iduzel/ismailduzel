import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import EmployeeSideMenu from "./EmployeeSideMenu";
import "./Employee.scss";
import { BsFillPersonFill, BsPerson } from "react-icons/bs";
import { FcDepartment } from "react-icons/fc";
import { FaCity } from "react-icons/fa";
import { DataContext } from "../../pages/context/Context";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeDashboard = () => {
  const {flag, setFlag, categoryData, employeeData, setEmployeeData } = useContext(DataContext);
  const [ address, setAddress] = useState()
  const [admins, setAdmins] = useState()
  const [dep, setDep] = useState("");

  useEffect(() => {

    //employeeData?.map((employee) => setAddress(address.push(employee.address)) ) 
    const l =  employeeData?.filter(((employee) => employee.role === 'admin')).length
    const a =  employeeData?.filter(((employee) => employee.address )).length
    setAdmins(l)
    setAddress(a)

  }, [flag])

  useEffect(() => {
    console.log("FLAG CHANGED");
    const getData = async () => {
      const response = await axios.get("/employees/list");
      console.log("DATA EMP RESPONSE: ", response);

      if (dep === "") {
        console.log("empty dep");
        setEmployeeData([
          ...response.data.sort((a, b) =>
            a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1
          ),
        ]);
      } else {
        console.log("full dep");
        setEmployeeData([
          ...response.data
            .filter((item) => item?.department === dep)
            .sort((a, b) =>
              a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1
            ),
        ]);
      }
    };

    getData();
  }, [flag]);


      
   console.log('addresses', address)
   console.log('admins', admins)
   console.log('catlength', categoryData.length)
 

  return (
    <div className="dashboard">
      <Row>
        <Col className="left-part col-2">
          <EmployeeSideMenu />
        </Col>
        <Col className="main-part  ">
          <Row className="main-part-first-row">
            <Col className="mpfr-first-col">
              <Link to="/employeeAdmin">
                {" "}
                <div className="dash-single">
                  <div className="icon">
                    <BsFillPersonFill />{" "}
                  </div>
                  <div className="info">
                    <p>Admins</p>
                    <p>Total({admins})</p>
                  </div>
                </div>
              </Link>

              <Link to="/employee">
                <div className="dash-single">
                  <div className="icon">
                    <BsPerson />{" "}
                  </div>
                  <div className="info">
                    <p>Employees</p>
                    <p>Total({employeeData?.length})</p>
                  </div>
                </div>
              </Link>

              <Link to="/">
                {" "}
                <div className="dash-single">
                  <div className="icon">
                    <FcDepartment />{" "}
                  </div>
                  <div className="info">
                    <p>Departments</p>
                    <p>Total({categoryData?.length})</p>
                  </div>
                </div>
              </Link>

              <Link to="/">
                {" "}
                <div className="dash-single">
                  <div className="icon">
                    <FaCity />{" "}
                  </div>
                  <div className="info">
                    <p>Cities</p>
                  
                    <p>Total({address})</p>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
          <Row></Row>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeDashboard;
