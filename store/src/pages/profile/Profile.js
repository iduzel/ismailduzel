import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/Context";
import "./Profile.scss";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(DataContext);
  const [data, setData] = useState();
  const [fileUrl, setFileUrl] = useState("");
  const [blobFile, setBlobFile] = useState(null);

  console.log("userDataContext: ", userData);
  const [flag, setFlag] = useState(false);
  // actual date
  const [date, setDate] = useState({
    actualYear: new Date().getFullYear(),
    actualMonth: new Date().getMonth() + 1,
    actualDay: new Date().getDate(),
  });

  // user date
  const [myDate, setMyDate] = useState({
    year: userData?.birthDate
      ? Number(userData.birthDate.substring(0, 4))
      : null,
    month: userData?.birthDate
      ? Number(userData.birthDate.substring(5, 7))
      : null,
    day: userData?.birthDate ? Number(userData.birthDate.substring(8)) : null,
  });

  const [userAge, setUserAge] = useState(
    date.actualMonth >= myDate.month
      ? date.actualYear - myDate.year
      : date.actualYear - myDate.year - 1
  );

  // IMAGE AND AGE
  useEffect(() => {
    setData({ ...data, ...userData, age: userAge });
    setFileUrl(userData.image);
  }, []);

  // DATA

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }; 

  // IMAGE
  const handleImageChange = (e) => {
    console.log("File is", e.currentTarget.files[0]);
    // console.log('File is', e.target.files[0])

    const file = e.currentTarget.files[0];

    setFileUrl(URL.createObjectURL(file)); // create a url from file user chose and update the state

    setBlobFile(e.currentTarget.files[0]);
  };

  // SAVE
  const handleSave = async () => {
    console.log("data is ", data);

    const formdata = new FormData();

    formdata.set("_id", userData._id);

    Object.entries(data).forEach((item) => formdata.set(item[0], item[1]));

    if (blobFile) formdata.set("image", blobFile, "profile_image");

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    console.log("Handlesave: formdata is", formdata.keys());

    const response = await axios.patch("/users/profile", formdata, config);

    console.log("response from profile is", response);

    if (response.data.success) setUserData({ ...response.data.user });

    setFlag(!flag);
    navigate("/");
  };

  return (
    <div className="profileDiv ">
      {/*  SHOW PROFILE */}

      <h1 className="m-5">PROFILE</h1>
      <div
        className={
          !flag
            ? "profile shadow-lg container rounded mt-5 show"
            : "profile shadow-lg container rounded mt-5 hide"
        }
      >
        <div className="wholeProfile p-5">
          <div className="profile-texts">
            <div className="single-info shadow-lg rounded">
              <h6 className="text-danger">Name</h6>
              <h4 className="text-dark">
                {data?.firstName + " " + data?.lastName}
              </h4>
            </div>

            <div className="single-info shadow-lg rounded">
              <h6 className="text-danger">Username</h6>
              <h4 className="text-dark">{data?.username}</h4>
            </div>
            <div className="single-info shadow-lg rounded">
              <h6 className="text-danger">Email</h6>
              <h4 className="text-dark">{data?.email}</h4>
            </div>

            <div className="single-info shadow-lg rounded">
              <h6 className="text-danger">Phone</h6>
              <h4 className="text-dark">{data?.phone}</h4>
            </div>

            <div className="single-info shadow-lg rounded">
              <h6 className="text-danger">Address</h6>
              <h4 className="text-dark">{data?.address}</h4>
            </div>

            <div className="single-info shadow-lg rounded">
              <h6 className="text-danger">Age</h6>
              <h4 className="text-dark">{data?.age}</h4>
            </div>
          </div>
          <div className="profile-image rounded">
            <img className="rounded" src={data?.image} alt="" />
          </div>
        </div>
        <div>
          <button
            onClick={() => setFlag(!flag)}
            className="btn btn-danger w-100 mb-1"
          >
            EDIT YOUR PROFILE
          </button>
          <Link to="/home" className="btn btn-info w-100">
            HOMEPAGE
          </Link>
        </div>
      </div>

      {/*  EDIT PROFILE */}
      <div
        className={
          !flag
            ? "profile container shadow-lg hide"
            : "profile container shadow-lg show"
        }
      >
        <h2>Profile</h2>
        <Row className="">
          <Col className="">
            {" "}
            <div className="main-div">
              <div className="form">
                {/* USERNAME */}
                <input
                  name="username"
                  id="username"
                  className="form__input"
                  readOnly
                  value={data?.username}
                  onChange={(e) => handleDataChange(e)}
                />
                <label htmlFor="username" className="form__label">
                  Username{" "}
                </label>
              </div>

              <div className="form">
                {/* EMAIL */}
                <input
                  name="email"
                  id="email"
                  className="form__input"
                  readOnly
                  value={data?.email}
                  onChange={(e) => handleDataChange(e)}
                />
                <label className="form__label" htmlFor="email">
                  Email{" "}
                </label>
              </div>

              <div className="form">
                {/* FIRSTNAME */}
                <input
                  name="firstName"
                  id="firstname"
                  className="form__input"
                  onChange={(e) => handleDataChange(e)}
                  value={data?.firstName}
                />
                <label className="form__label" htmlFor="firstname">
                  First Name
                </label>
              </div>

              <div className="form">
                {/* LASTNAME */}
                <input
                  name="lastName"
                  id="lastname"
                  className="form__input"
                  onChange={(e) => handleDataChange(e)}
                  value={data?.lastName}
                />
                <label className="form__label" htmlFor="lastname">
                  Last Name
                </label>
              </div>

              <div className="form">
                {/* ADDRESS */}
                <input
                  name="address"
                  id="address"
                  className=" form__input"
                  onChange={(e) => handleDataChange(e)}
                  value={data?.address}
                />
                <label className="form__label" htmlFor="address">
                  Address
                </label>
              </div>

              <div className="form">
                {/* PHONE */}
                <input
                  name="phone"
                  id="phone"
                  className=" form__input"
                  onChange={(e) => handleDataChange(e)}
                  value={data?.phone}
                />
                <label htmlFor="phone" className="form__label">
                  Phone
                </label>
              </div>

              <div className="form">
                {/* BIRTHDATE */}
                <input
                  name="birthDate"
                  type="date"
                  id="birthDate"
                  className=" form__input"
                  onChange={(e) => handleDataChange(e)}
                  value={data?.birthDate}
                />
                <label htmlFor="birthDate" className="form__label">
                  Birthdate
                </label>
              </div>
            </div>
          </Col>
          {
            <Col className="text-center ">
              {" "}
              <div>
                <img
                  className="rounded"
                  src={fileUrl}
                  alt=""
                  style={{
                    height: "400px",
                    width: "300px",
                    objectFit: "cover",
                  }}
                />
                <label
                  className="btn btn-info mt-1 w-50"
                  htmlFor="file"
                  style={{ cursor: "pointer" }}
                >
                  Upload your profile image
                </label>
                <input
                  accept="image/*"
                  onChange={handleImageChange}
                  id="file"
                  type="file"
                  style={{ visibility: "hidden" }}
                />
              </div>
            </Col>
          }
        </Row>

        <div>
          <button className="btn btn-danger w-100" onClick={handleSave}>
            Save profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
