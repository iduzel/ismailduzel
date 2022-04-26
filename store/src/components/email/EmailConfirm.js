import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Email.scss";

const EmailConfirm = () => {

  const navigate = useNavigate()
  const { token } = useParams();
  const [message, setMessage] = useState('')

  //contact the server to send the token

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/users/emailconfirm/${token}`);
        console.log("emailConfirm getData response is: ", response);

        if (response.data.success) {
          setMessage('Your email has been verified! In few seconds you will be redirected to the home page ')
         setTimeout(() => navigate('/'), 5000)
        } else {
          setMessage('Your email could not verified. Please contact the sytem administators')
        }
      } catch (error) {

        console.log(error.message)
      }
    };
    getData();
  }, []);
  return <div className="emailconfirm">
    <h3>Thank you for registering in our app</h3>
    <h5>Please wait a while until we verify your email</h5>
    <h5>{message}</h5>
  </div>;
};

export default EmailConfirm;
