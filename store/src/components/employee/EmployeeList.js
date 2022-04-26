import React, { useContext, useEffect, useState } from "react";
import "./Employee.scss";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { DataContext } from "../../pages/context/Context";
import axios from "axios";
import { useNavigate } from "react-router";
import Employee from "./Employee";
import AddEmployee from "./AddEmployee";
import img1  from '../../img/2.jpg'
import EmployeeSideMenu from "./EmployeeSideMenu";


const EmployeeList = () => {
  const navigate = useNavigate();
  const [dep, setDep] = useState("");

  const {
    flag,
    setFlag,
    userData,
    setUserData,
    employeeData,
    setEmployeeData,
    categoryData,
  } = useContext(DataContext);

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

  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    handleClose();

    return () => {
      handleShowAlert();
    };
  }, []);

  const getSearch = (e) => {
    const searchElement = e.target.value;
    console.log("getSearch: ", searchElement);
  };

  //handle SELECT
  const handleSelect = (e) => {
    setDep(e.target.value);
    setFlag(!flag);
  };

  return (
    <div className="employeeList ">
         <Alert show={showAlert} variant="success">
        Employee List successfully updated!.
      </Alert>
      <Row className="first-row">
        <Col className="left-part col-2">
         <EmployeeSideMenu />
        </Col>
        <Col className="col-10 main-part">
          {" "}
          <div className="table-title mt-5">
            <div className="row">
              <div className="col-sm-4">
                <h2>
                  Manage <b>Employees</b>
                </h2>
              </div>
              <div className="col-sm-4 ">
                <input
                  style={{ height: "40px" }}
                  className="ps-1 rounded "
                  placeholder="Search"
                  onChange={(e) => getSearch(e)}
                />
              </div>
              <div className={userData ? "col-sm-4 show" : "hide"}>
                <Button
                  onClick={handleShow}
                  className="btn btn-success text-white"
                  data-toggle="modal"
                >
                  <i className="material-icons">&#xE147;</i>{" "}
                  <span>Add New Employee</span>
                </Button>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>
                  <Form.Group>
                    <Form.Select
                      onChange={handleSelect}
                      name="department"
                      aria-label="Default select example"
                    >
                      <option value="">Department</option>

                      {categoryData?.map((category, index) => {
                        return (
                          <option value={category.name}>{category.name}</option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </th>
                <th>Date</th>
                {/*  <th>ID</th> */}
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {employeeData?.map((employee) => (
                <tr key={employee._id}>
                  <Employee employee={employee} />
                </tr>
              ))}
            </tbody>
          </table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="modal-header" closeButton>
              <Modal.Title>Add Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddEmployee />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close Modal
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeList;
