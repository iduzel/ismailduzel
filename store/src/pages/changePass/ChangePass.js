import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ForgotPass() {
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  const { token } = useParams();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/users/changepass", { pass, token });

      console.log("reponse is ", response);

      if (response.data.success) {
        setMessage("Password changed successfully");
      } else {
        setMessage("There was a problem changing your password");
      }
    } catch (error) {
      console.log("error is", error.message);
      setMessage("There was a problem changing your password");
    }
  };

  return (
    <div className="container shadow-lg m-5 p-5 w-50">
      <p>Please type your new password</p>
      <input
        className="rounded w-75 text-dark p-2 mb-2"
        placeholder="Type your password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <br></br>
      <button className="btn btn-danger" onClick={handleSubmit}>Submit</button>
      <p>{message}</p>
    </div>
  );
}
