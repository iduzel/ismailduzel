import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Register() {
  // These 4 states are only placeholder PLACEHOLDER state
  const [userPH, setUserPH] = useState(`  Username`);
  const [emailPH, setEmailPH] = useState(`  Email`);
  const [passwordPH, setPaswordPH] = useState("  Password");
  const [confirmPH, setConfirmPH] = useState("  Confirm Password");

  // These confirm and data are states to get data from user
  const [confirm, setConfirm] = useState("");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleNaviSignIn = () => {
    navigate("/login");
  };

  // SUBMIT REGISTER FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handleSubmit");

    if (!data.username || !data.email || !data.password)
      return console.log("EMPTY REGISTER");

    const response = await axios.post("/users/register", data);
    console.log("response REGISTER is ", response);

    setData({ username: "", email: "", password: "" });
    setConfirm("");
    navigate('/login')
  };

  return (
    <div className="register">
      {/* <div className="bg-img"></div> */}

      <div className="register-main">
       {/*  <div className="side"></div> */}
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <div className="logo">
            <img
              className="logo-image"
              src="https://media.istockphoto.com/photos/leaf-symbol-green-black-picture-id693694672?b=1&k=20&m=693694672&s=170667a&w=0&h=_B5pyXi5TjexGcH6FbN2IiJy2Qa6fKqs-2KG0gb5Zy8="
              alt="logo"
            />
          </div>
          <h3 className="title">SIGN UP</h3>
          <input
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className="input input-user"
            type="text"
            placeholder={userPH}
            onFocus={() => setUserPH("")}
            onBlur={() => setUserPH("  Username")}
          />
          <input
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="input input-email"
            type="email"
            placeholder={emailPH}
            onFocus={() => setEmailPH("")}
            onBlur={() => setEmailPH("  Email")}
          />
          <input
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="input input-pass"
            type="password"
            placeholder={passwordPH}
            onFocus={() => setPaswordPH("")}
            onBlur={() => setPaswordPH("  Password")}
          />
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="input input-pass"
            type="password"
            placeholder={confirmPH}
            onFocus={() => setConfirmPH("")}
            onBlur={() => setConfirmPH("  Confirm Password")}
          />
          <div className="checkbox-div">
            <input
              className=" input-checkbox"
              htmlFor="check-remember"
              type="checkbox"
            />
            <label className="checkbox-label" id="check-remember">
              Remember me
            </label>
          </div>

          <button className="signup-button" type="submit">
            Sign Up
          </button>
          
          <div className="have-account">
            <small>
              Already have an account !{" "}
              <span onClick={handleNaviSignIn}>Sign In</span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
