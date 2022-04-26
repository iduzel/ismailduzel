import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [flag, setFlag] = useState(false);
  const [userData, setUserData] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState({});
  const [fileUrl, setFileUrl] = useState("");
  const [employeeDetail, setEmployeeDetail] = useState({});

  /*   const updateEmployee = (id, updatedEmployee) => {
    setEmployeeData(
      employeeData?.map((employee) =>
        employee._id === id ? updatedEmployee : employee
      )
    );
  }; */

  return (
    <DataContext.Provider
      value={{
        flag,
        setFlag,
        userData,
        setUserData,
        employeeData,
        setEmployeeData,
        categoryData,
        setCategoryData,
        posts,
        setPosts,
        singlePost,
        setSinglePost,
        fileUrl,
        setFileUrl,
        employeeDetail,
        setEmployeeDetail,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
