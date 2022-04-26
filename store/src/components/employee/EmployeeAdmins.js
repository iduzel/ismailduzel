import React, { useContext, useState } from "react";
import "./Employee.scss";
import { Col, Form, Row } from "react-bootstrap";
import { DataContext } from "../../pages/context/Context";
import Employee from "./Employee";
import EmployeeSideMenu from "./EmployeeSideMenu";

const EmployeeAdmins = () => {
  const { categoryData, employeeData } = useContext(DataContext);
  const [dep, setDep] = useState("");
  //handle SELECT
  const handleSelect = (e) => {
    setDep(e.target.value);
  };
  return (
    <div className="employeeAdmins">
      <Row className="first-row">
        <Col className="left-part col-2">
          <EmployeeSideMenu />
        </Col>
        <Col className="col-10 main-part">
          {" "}
          <h1 className="d-flex justify-content-center mt-5">
            Admin Management
          </h1>
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
              {employeeData
                ?.filter((employee) => employee.role === "admin")
                .map((employee) => (
                  <tr key={employee._id}>
                    <Employee employee={employee} />
                  </tr>
                ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeAdmins;
