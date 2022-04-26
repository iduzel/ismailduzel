import React, { useContext } from "react";
import './Blog.scss'
import { DataContext } from "../../pages/context/Context";
import  moment  from 'moment'


const BlogSingle = () => {
    const { posts, setPosts, singlePost, setSinglePost } = useContext(DataContext);
    console.log('single post: ', singlePost)
  return (
    <div>
      <section id="blog" className="md-padding">
        <div className="container">
          <div className="row">
            <main id="main" className="col-md-8">
              <div className="blog">
                <div className="blog-img">
                  <img className="img-fluid" src={`uploads/${singlePost[0].image}`} alt="" style={{
                              height: "300px",
                              width: "300px",
                              objectFit: "cover",
                            }} />
                </div>

                <div className="blog-content">
                  <ul className="blog-meta">
                    <li>
                      <i className="fas fa-user"></i>{singlePost[0].owner}
                    </li>
                    <li>
                      <i className="fas fa-clock"></i>{moment(singlePost.date).format('MMM DD YYYY')}
                    </li>
                    <li>
                      <i className="fas fa-comments"></i>57
                    </li>
                  </ul>
                  <h3>TITLE: {singlePost[0].title}</h3>
                  <h5>SUBTITLE: {singlePost[0].subtitle}</h5>
                  <p>
                    CONTENT: {singlePost[0].content}
                  </p>
                </div>

                {/* <!-- blog comments --> */}
                <div className="blog-comments">
                  <h3>(1) Comments</h3>

                  {/* <!-- comment --> */}
                  <div className="media">
                    <div className="media-body">
                      <h4 className="media-heading">
                        Joe Doe<span className="time">2 min ago</span>
                      </h4>
                      <p>
                        Nec feugiat nisl pretium fusce id velit ut tortor
                        pretium. Nisl purus in mollis nunc sed. Nunc non blandit
                        massa enim nec.
                      </p>
                    </div>
                  </div>
                  {/* <!-- /comment --> */}
                </div>
                {/* <!-- /blog comments --> */}

                {/* <!-- reply form --> */}
                <div className="reply-form">
                  <h3>Leave A Comment</h3>
                  <form>
                    <input
                      className="form-control mb-4"
                      type="text"
                      placeholder="Name"
                    />
                    <input
                      className="form-control mb-4"
                      type="email"
                      placeholder="Email"
                    />
                    <textarea
                      className="form-control mb-4"
                      row="5"
                      placeholder="Add Your Commment"
                    ></textarea>

                    <button  type="submit" className="main-btn btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
                {/* <!-- /reply form --> */}
              </div>
            </main>
            {/* <!-- /Main --> */}

            <aside id="aside" className="col-md-4">
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
              {/* <!-- /Search --> */}

              {/* <!-- Category --> */}
              <div className="widget">
                <h3 className="mb-3">Category</h3>
                <div className="widget-category">
                  <a href="#">
                    Web Design<span>(7)</span>
                  </a>
                  <a href="#">
                    Marketing<span>(142)</span>
                  </a>
                  <a href="#">
                    Web Development<span>(74)</span>
                  </a>
                  <a href="#">
                    Branding<span>(60)</span>
                  </a>
                  <a href="#">
                    Photography<span>(5)</span>
                  </a>
                </div>
              </div>
              {/* <!-- /Category --> */}

              {/* <!-- Posts sidebar --> */}
              <div className="widget">
                <h3 className="mb-3">Latest Posts</h3>

                {/* <!-- single post --> */}
                <div className="widget-post">
                  <a href="#">
                    <img className="img-fluid" src="./img/post1.jpg" alt="" /> Lorem
                    Ipsum
                  </a>
                  <ul className="blog-meta">
                    <li>Oct 18, 2017</li>
                  </ul>
                </div>
                {/* <!-- /single post --> */}

                {/* <!-- single post --> */}
                <div className="widget-post">
                  <a href="#">
                    <img className="img-fluid" src="./img/post2.jpg" alt="" /> Lorem
                    Ipsum
                  </a>
                  <ul className="blog-meta">
                    <li>Oct 18, 2017</li>
                  </ul>
                </div>
                {/* <!-- /single post --> */}

                {/* <!-- single post --> */}
                <div className="widget-post">
                  <a href="#">
                    <img className="img-fluid" src="./img/post3.jpg" alt="" /> Lorem
                    Ipsum
                  </a>
                  <ul className="blog-meta">
                    <li>Oct 18, 2017</li>
                  </ul>
                </div>
                {/* <!-- /single post --> */}
              </div>
              {/* <!-- /Posts sidebar --> */}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogSingle;
