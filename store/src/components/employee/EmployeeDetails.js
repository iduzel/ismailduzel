import React, { useContext, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { DataContext } from "../../pages/context/Context";
import moment from "moment";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import EditEmployee from "./EditEmployee";

const EmployeeDetails = ({employee}) => {
  const {
    setEmployeeDetail,
    flag,
    setFlag,
    setEmployeeData,
    employeeData,
    employeeDetail,
  } = useContext(DataContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(employeeDetail);

  //handle delete
  const handleDeleteEmployee = async (id) => {
    console.log("employeeDATA FROM DeLETE: ", employeeData);
    console.log("id: ", id);

    const response = await axios.delete(`/employees/delete/${id}`);
    console.log("delete employee Response is: ", response);

    if (response.data.success) {
      console.log("delete response is success ");
      setEmployeeData(employeeData.filter((item) => item._id !== id));
    }
    setFlag(!flag);
    navigate(-1);
  };

  const EditEmployeeDetail = (id) => {
    navigate("/employee/detail");
  };

  return (
    <div className="employeeDetails container">
      <h1>Employee Details</h1>
      <div>
        <Row className="rows first-row">
          <Col className="cols">
            <h3>{employeeDetail[0]?.name}</h3>
            <h4>{employeeDetail[0]?.address}</h4>
            <h4>Male</h4>
          </Col>
          <Col className="first-row-first-col">
            <img src={employeeDetail[0]?.image} alt="..." />
          </Col>
        </Row>

        <Row className="rows second-row">
          <Col className="cols">
            <div>
              <h4>Age:</h4> <h5>23</h5>
            </div>
            <div>
              <h4>Phone:</h4> <h5>{employeeDetail[0]?.phone}</h5>
            </div>
            <div>
              <h4>Zipcode:</h4> <h5>12345</h5>
            </div>
            <div>
              <h4>Department:</h4> <h5>{employeeDetail[0]?.department}</h5>
            </div>
            <div>
              <h4>Division:</h4> <h5>Division 2</h5>
            </div>
            <div>
              <h4>Email:</h4> <h5>{employeeDetail[0]?.email}</h5>
            </div>
            <div>
              <h4>Salary:</h4> <h5>$5000</h5>
            </div>
            <div>
              <h4>Joined Date:</h4>{" "}
              <h5>{moment(employeeDetail[0]?.date).format("MMM DD YYYY")}</h5>
            </div>
            <div>
              <h4>Birth Date:</h4> <h5></h5>
            </div>
          </Col>
        </Row> <div className="d-flex">
        <button
          onClick={() => handleDeleteEmployee(employeeDetail[0]?._id)}
          className="btn text-danger btn-act me-5 "
          data-toggle="modal"
        >
          <i className="material-icons me-2">&#xE872;</i>
          <span>DELETE</span>
        </button>

        <button
          onClick={() => EditEmployeeDetail(employeeDetail[0]?._id)}
          className="btn text-warning btn-act"
          data-toggle="modal"
        >
          <i className="material-icons me-2">&#xE8B8;</i> EDIT
        </button>
      </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditEmployee theEmployee={employee} flag={flag} setFlag={setFlag} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>
     
    </div>
  );
};

export default EmployeeDetails;
