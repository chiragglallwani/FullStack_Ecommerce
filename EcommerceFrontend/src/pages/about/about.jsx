import React from "react";
import "./about.css"

function About() {
  return (
        <div className="row">
          <div className="col-lg-6">
            <h1 className="display-6">About us</h1>
            <p className="lead text-muted mb-0">Book Depot is a one-stop solution for book readers worldwide, offering both e-books and handbooks to cater to every reader's preference. With various book categories to choose from, readers can order books and rate them after reading. Book Depot also plans to create a community of book readers through a chat room in the second version, with the aim of providing subscription packages on a yearly or monthly basis. Using Node Js and React, Book Depot strives to make books available quickly and easily.</p>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <img src={process.env.PUBLIC_URL + '/assets/about.png'} alt="About Us" className="about img-fluid"/>
          </div>
        </div>
  );
}

export default About;
