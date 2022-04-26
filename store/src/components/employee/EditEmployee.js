import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { DataContext } from "../../pages/context/Context";
import "./Employee.scss";
import { useNavigate } from "react-router";
import axios from "axios";

const EditEmployee = ({theEmployee }) => {
  const navigate = useNavigate();
  const employee = theEmployee;

  const { flag, setFlag,categoryData, updateEmployee, employeeData, setEmployeeData, userData } =
    useContext(DataContext);
   const [imageFile, setImageFile] = useState(employee.image); 


  //handle edit
  const [editData, setEditData] = useState({
    name: employee.name,
    email: employee.email,
    address: employee.address,
    phone: employee.phone,
    department: employee.department,
    date: employee.date,
    image: employee.image,
    role: employee.role
  });
  console.log("editData is: ", editData);

  

  const onChangeImageFile = (e) => {
    setImageFile(e.target.files[0]);
  };


  const onInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //MODAL
  const handleSubmitModal = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("email", editData.email);
    formData.append("address", editData.address);
    formData.append("phone", editData.phone);
    formData.append("department", editData.department);   
    formData.append("tags", editData.tags);
    formData.append("image", imageFile);
    formData.append("role", editData.role)

    const response = await axios.put(
      `/employees/edit/${employee._id}`,
      formData
    );

    if (response.data.success) {
      console.log("edit resp is : success");
      const temp = [...employeeData];
      temp.filter((item) => item._id !== employee._id);
      setEmployeeData([...temp, editData]);
    }

    setFlag(!flag);

    handleClose();
  };

  return (
    <Form onSubmit={handleSubmitModal}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name *"
          name="name"
          value={editData.name}
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Role"
          name="role"
          value={ editData.role }
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="email"
          placeholder="Email *"
          name="email"
          value={editData.email}
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          as="textarea"
          placeholder="Address *"
          name="address"
          rows={3}
          value={editData.address}
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Phone"
          name="phone"
          value={editData.phone}
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
          value={editData.date}
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

      <Button variant="success" type="submit" block="true">
        Update Employee
      </Button>
    </Form>
  );
};

export default EditEmployee;
