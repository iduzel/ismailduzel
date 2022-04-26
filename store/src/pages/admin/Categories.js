import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AdminNav from "../../components/admin_nav-comp/AdminNav";
import { DataContext } from "../context/Context";
import './Categories.scss'

const Categories = () => {
  const { categoryData, setCategoryData } = useContext(DataContext);

 
  const [category, setCategory] = useState({
    name: "",
  });

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/admin/categories/list');
      console.log('RESPONSE GET DATA : ', response)

      setCategoryData(response.data)
     
    }
    getData()
  }, [category])

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("CATEGORY: ", category);
    if (!category) return console.log("empty category");
    const response = await axios.post("/admin/categories", category);
    console.log("response is: ", response);
    if (response.data.success) {
      setCategoryData(categoryData.concat(category));
    }

    setCategory({ name: "" });
  };

     //handle delete
     const handleDeleteCategory = async (id) => {
      console.log("employeeDATA FROM DeLETE: ", categoryData);
      console.log("id: ", id);
  
      const response = await axios.delete(`/admin/categories/delete/${id}`);
      console.log("delete category Response is: ", response);
  
      if (response.data.success) {
        console.log("delete response is success ");
        setCategoryData(categoryData.filter((item) => item._id !== id));
        
      }
     
      
    };
  return (
    <div className="categories container mt-4 ">
      <AdminNav />     
      <div className="container mt-4">
        <div className="row border pt-2">
          <div className="col-md-4">
            <form onSubmit={(e) => handleSubmit(e)} className="form">
              <div className="form-group">
                <input
                  value={category.name}
                  onChange={(e) =>
                    setCategory({ ...category, name: e.target.value })
                  }
                  className="form-control"
                  name="name"
                  type="text"
                  placeholder="Category Name *"
                  required
                />
                <button className="btn btn-warning mt-3 " type="submit">
                  Add Department
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>DELETE</th>
                </tr>
              </thead>
              <tbody>
               {categoryData?.map((item, index) =>(
                 <tr key={index}>
                   <td>{item._id}</td>
                   <td>{item.name}</td>
                   <td> <button onClick={() => handleDeleteCategory(item._id)} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button></td>
                 </tr>
               ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
