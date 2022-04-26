import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { DataContext } from "../../pages/context/Context";
import "./Employee.scss";

const AddEmployee = () => {
  const { categoryData, flag, setFlag, employeeData, setEmployeeData } =
    useContext(DataContext);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    address: "",
    phone: null,
    department: "",
    date: null,
    role: ""
  });

  const [imageFile, setImageFile] = useState("");

  const { name, email, address, phone, department, date, role } = newEmployee;

  const onChangeImageFile = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  // HANDLE SUBMIT - ADD EMPLOYEE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newEmployee.name);
    formData.append("email", newEmployee.email);
    formData.append("address", newEmployee.address);
    formData.append("phone", newEmployee.phone);
    formData.append("department", newEmployee.department);
    formData.append("tags", newEmployee.tags);
    formData.append("image", imageFile);
    formData.append("role", newEmployee.role)

    const response = await axios.post("/employees/add", formData);

    if (response.data.success) {
      console.log("add response is success");
      setEmployeeData([...employeeData, newEmployee]);
    }
    setNewEmployee({
      name: "",
      email: "",
      address: "",
      phone: null,
      department: "",
      tags: [],
      date: "",
      role:""
    });

    setFlag(!flag);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name *"
          name="name"
          value={name}
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Role"
          name="role"
          value={role}
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="email"
          placeholder="Email *"
          name="email"
          value={email}
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          as="textarea"
          placeholder="Address *"
          name="address"
          value={address}
          onChange={(e) => onInputChange(e)}
          //rows={3}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Select
          name="department"
          /* value={department} */
          onChange={(e) => onInputChange(e)}
          aria-label="Default select example"
        >
          <option>Select Department</option>

          {categoryData?.map((category, index) => {
            return <option value={category.name}>{category.name}</option>;
          })}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="date"
          placeholder="Date"
          name="date"
          value={date}
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          accept="image/*"
          className="form-control w-100"
          filename="image"
          name="image"
          type="file"
          id="file"
          onChange={onChangeImageFile}
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Add New Employee
      </Button>
    </Form>
  );
};

export default AddEmployee;
