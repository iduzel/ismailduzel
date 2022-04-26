import "./Employee.scss";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "../../pages/context/Context";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditEmployee from "./EditEmployee";
import moment from "moment";
import { useNavigate } from "react-router-dom";


const Employee = ({ employee }) => {
  const {employeeDetail, setEmployeeDetail, userData, flag, setFlag, employeeData, setEmployeeData } =
    useContext(DataContext);
    const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    handleClose();
  }, [employee]);

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
  };

  const handleEmployeeDetail = (id) => {
    console.log('id: ', id)
    setEmployeeDetail(employeeData?.filter((item) => item._id === id));
    console.log('emp detail is: ', employeeDetail)
    navigate("/employee/detail");
  };

  return (
    <>
      <td onClick={() => handleEmployeeDetail(employee._id)}>
      <img
          src={employee.image}
          alt=""
          className="img-fluid rounded-circle"
          style={{
            height: "30px",
            maxHeight: "30px",
            width: "30px",
            objectFit: "cover",
          }}
        />{" "}
        {employee.name}
        
      </td>
      <td>{employee.role}</td>
      <td>{employee.email}</td>
      <td>{employee.address}</td>
      <td>{employee.phone}</td>
      <td>{employee.department}</td>
      <td>{moment(employee.date).format("MMM DD YYYY")}</td>
      {/* <td>{employee._id}</td> */}
      <td className={(!userData) ? 'hide' : 'show'}>
        
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}>
          <button
            onClick={handleShow}
            className="btn text-warning btn-act"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE254;</i>
          </button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}>
          <button
            onClick={() => handleDeleteEmployee(employee._id)}
            className="btn text-danger btn-act"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE872;</i>
          </button>
        </OverlayTrigger>
      </td>

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
    </>
  );
};

export default Employee;
