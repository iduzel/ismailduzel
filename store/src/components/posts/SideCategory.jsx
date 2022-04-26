import React, { useContext } from "react";
import { DataContext } from "../../pages/context/Context";
import moment from "moment";

const SideCategory = () => {
  const { posts, categoryData, setCategoryData } = useContext(DataContext);

  return (
    <div className="sideCategory">
      <div className="widget">
        <div className="widget-search">
          <input
            className="search-input form-control"
            type="text"
            placeholder="Search"
          />
          <button className="search-btn" type="button">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div className="widget">
        <h3 className="mb-3">Categories</h3>

        <div className="widget-category">
          {categoryData?.map((item, index) => {
            return (
              <a key={index} href="/admin">
                {item.name}
                <span>(7)</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* <!-- Posts sidebar --> */}
      <div className="widget">
        <h3 className="mb-3">Latest Posts</h3>

        {posts
          ?.filter((item, index) => index <= 2)
          .map((item, index) => {
            return (
              <div key={index} className="widget-post">
                <div className="widget-post-single border-bottom border-warning shadow">
                  <a href="#">
                    <img src={item.image} alt="" />
                    {item.subtitle}
                  </a>
                  <ul className="blog-meta">
                    <li>{moment(item.date).format("MMM DD YYYY")}</li>
                  </ul>
                </div>
              </div>
            );
          })}
      </div>
      {/* <!-- /Posts sidebar --> */}
    </div>
  );
};

export default SideCategory;
