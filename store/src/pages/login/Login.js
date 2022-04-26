import React, { useContext, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router";
import axios from "axios";
import { DataContext } from "../context/Context";
import { Link } from "react-router-dom";
import google_logo from "../../pictures/btn_google_signin_dark_focus_web.png";
export default function Login() {
  const navigate = useNavigate();

  // PLACEHOLDERS
  const [userPH, setUserPH] = useState(`  Username`);
  const [emailPH, setEmailPH] = useState(`  Email`);
  const [passwordPH, setPaswrdPH] = useState("  Password");

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { employeeData, setEmployeeData, userData, setUserData } =
    useContext(DataContext);

  const handleNaviSignUp = () => {
    navigate("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handlelogin");

    if (!data.password) return;
    const response = await axios.post("/users/login", data);

    console.log("response is: ", response);

    if (response.data.success) {
      console.log("login client side data SUCCESS");
      console.log("response.data.user: ", response.data.user);
      setUserData({ ...response.data.user });
      navigate("/");
    }
  };

  return (
    <div className="login">
      {/* <div className="bg-img"></div> */}

      <div className="login-main ">
        <form onSubmit={(e) => handleLogin(e)} className="form">
          <div className="logo">
            <img
              className="logo-image"
              src="https://media.istockphoto.com/photos/leaf-symbol-green-black-picture-id693694672?b=1&k=20&m=693694672&s=170667a&w=0&h=_B5pyXi5TjexGcH6FbN2IiJy2Qa6fKqs-2KG0gb5Zy8="
              alt="logo"
            />
          </div>
          <h3 className="title">SIGN IN</h3>

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
            className="input input-user"
            type="email"
            placeholder={emailPH}
            onFocus={() => setEmailPH("")}
            onBlur={() => setEmailPH("  Email")}
          />
          <input
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="input input-email"
            type="password"
            placeholder={passwordPH}
            onFocus={() => setPaswrdPH("")}
            onBlur={() => setPaswrdPH("  Password")}
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
          

          <button className="login-button" type="submit">
            Sign In
          </button>
          <Link className="forgot" to="/forgotpassword">
            {" "}
            <div>
              <small>Forgot Password</small>
            </div>
          </Link>
          <a className="google-login-link" href="/users/google">
            <img src={google_logo} alt="" />
          </a>

          <div className="no-account">
            <small>
              Don't have an account ?{" "}
              <span onClick={handleNaviSignUp}>Sign Up</span>
            </small>
          </div>
        </form>

        {/* <div className="side"></div> */}
      </div>
    </div>
  );
}
