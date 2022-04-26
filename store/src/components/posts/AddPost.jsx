import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../pages/context/Context";

const AddPost = () => {
  const {flag, setFlag, categoryData, posts, setPosts, userData } =
    useContext(DataContext);
  const navigate = useNavigate();
  const [singlePost, setSinglepost] = useState();
  const [imageFile, setImageFile] = useState("");
 


  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/posts/list");
      console.log("getList posts is : ", response);

      if (response.data.success) {
        setPosts([...response.data.posts]);
      }
    };
    getData();
  }, []);

  const onChangeImageFile = (e) => {
    setImageFile(e.target.files[0]);
  };

 

  console.log("imageFile: ", imageFile);
  

  const onInputChange = (e) => {
    setSinglepost({ ...singlePost, [e.target.name]: e.target.value });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("HELLO");

    const formData = new FormData();
    formData.append("owner", userData._id);
    formData.append("title", singlePost.title);
    formData.append("subtitle", singlePost.subtitle);
    formData.append("content", singlePost.content);
    formData.append("category", singlePost.category);
    formData.append("image", imageFile);
    formData.append("likes", singlePost.likes);

    const response = await axios.post("/posts/addpost", formData);
    console.log("response add post is : ", response);

    if (response.data.success) {
      setPosts([...posts, response.data.post]);

      setSinglepost({});
      

      console.log("line 49");
      navigate(-1);
    }
  };

 
  return (
    <div className="addpost container mt-5">
      <form
        onSubmit={(e) => handleSubmit(e)}
        encType="multipart/form-data"
        className="form"
      >
        <div className="form-group mb-2">
          <input
            className="form-control w-100"
            placeholder="Title"
            name="title"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group mb-2">
          <input
            className="form-control w-100"
            placeholder="Subtitle"
            name="subtitle"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group mb-2">
          <textarea
            rows="5"
            className="form-control w-100"
            placeholder="Content"
            name="content"
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group mb-2 w-100">
          <select
            defaultValue="abc"
            onChange={(e) => onInputChange(e)}
            className="form-select"
            name="category"
          >
            {categoryData?.map((item, index) => {
              return (
                <option defaultValue="abc" key={index} name="category">
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* IMAGE */}
        <div className="form-group mb-2">
          <input
            accept="image/*"
            className="form-control w-100"
            filename="image"
            name="image"
            type="file"
            id="file"
            onChange={onChangeImageFile}
          />
        </div>

        <button
          /* onClick={(e) => handleSubmit(e)} */ className="btn btn-primary mb-5 mt-2 w-100"
          type="submit"
        >
          ADD POST
        </button>
      </form>
    </div>
  );
};

export default AddPost;
