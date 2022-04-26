import axios from "axios";
import { useState } from "react";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/users/forgotpass", { email });

      console.log("reponse is ", response);

      if (response.data.success) {
        setMessage(
          "We just sent you an email to help recover your password. Please check your emailbox"
        );
      } else {
        setMessage("There was a problem recovering your password");
        
      }
    } catch (error) {
      console.log("error is", error.message);
      setMessage("ERROR: There was a problem recovering your password");
     
    }
  };
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
      <p>Please type your email to help recover your password</p>
      <input
      className="w-50 rounded mb-2 p-2"
        placeholder="Type your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary w-50 " onClick={handleSubmit}>Submit</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPass;
