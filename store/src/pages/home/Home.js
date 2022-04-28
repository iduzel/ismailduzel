import axios from "axios";
import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/Context";
import "./Home.scss";

const Home = () => {
  const { posts, setPosts, categoryData, setCategoryData } =
    useContext(DataContext);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/admin/categories/list");
      console.log("RESPONSE GET DATA : ", response);

      setCategoryData(response.data);
    };
    getData();
  }, []);

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
  return (
    <div className="home container">
      <h1>Home Home Sweet Home</h1>
      <h2 className="bg-danger text-dark">Home Home Sweet Home</h2>

      <section className="sections">
        <h2>MongoDB</h2>{" "}
        <div className="videos">
          <iframe
            src="https://www.youtube.com/embed/pWbMrx5rVBE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="videos">
          <iframe
            src="https://www.youtube.com/embed/ofme2o29ngU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </section>
      <section className="sections">
        <h2>REACTJS</h2>{" "}
        <div className="videos">
          <iframe
            src="https://www.youtube.com/embed/w7ejDZ8SWv8"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="videos">
          <iframe
            src="https://www.youtube.com/embed/ofme2o29ngU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Home;
