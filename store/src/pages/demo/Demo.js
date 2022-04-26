import React from "react";
import "./Demo.scss";
import "../../index.scss";
import { Container, Row, Col } from "react-bootstrap";
import Login from "../login/Login";
import Register from "../register/Register";

export default function Demo() {
  return (
    <div className="demo">
      <Container>
        <h1>hello from demo</h1>
      </Container>
    </div>
  );
}
