import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import Paths from "./Paths";
import DataProvider from "./pages/context/Context";
import Navbar from "./components/navbar/Navbar";

ReactDOM.render(
  <DataProvider>
    <BrowserRouter>
    <Navbar />
      <Paths />
    </BrowserRouter>
  </DataProvider>,
  document.getElementById("root")
);
