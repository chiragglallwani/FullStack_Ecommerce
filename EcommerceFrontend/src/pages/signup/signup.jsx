import React, { useState, useEffect } from "react";
import "./signup.css";
import authservice from "../../services/authservice";

export const SignUp = () => {
  const [message, setMessage] = useState('');

    const signupClick = (event) => {
      event.preventDefault();

      const firstName = event.target.elements.firstName.value || "";
      const lastName = event.target.elements.lastName.value || "";
      const email = event.target.elements.email.value || "";
      const password = event.target.elements.password.value || "";
      const confirmPassword = event.target.elements.confirmPassword.value || "";
     const statusMessage = document.querySelector("#statusMessage")

      statusMessage.style.color = 'red';

      if (firstName === "") {
        setMessage('Please enter first name');
        return
      } else if (lastName === "") {
        setMessage('Please enter last name');
        return
      } else if (email === "") {
        setMessage('Please enter email');
        return
      } else if (password === "") {
        setMessage('Please enter password');
        return
      } else if (password !== confirmPassword) {
        setMessage('Password and confirm password do not match');
        return
      } else {
        statusMessage.style.color = 'green';
        setMessage('Validation Successful');
      }

      const studentSignupRequest = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      };

      authservice.signup(studentSignupRequest)
      .then(response => {
        let student = response.data
        console.log(student)
        event.target.reset()
        setMessage('User Created Successfully');

      })
      .catch(error => {
        statusMessage.style.color = 'red';
        console.log(error.response.data);
        setMessage(error.response.data);
      })
  }

  return (
    <div className="text-center">
      <div className="inner">
        <form onSubmit={signupClick}>

          <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
          <div className="form-group">

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="first name"
                name="firstName"
              />
              <label htmlFor="floatingInput">First Name</label>
            </div>

            <div className="form-floating">
              <input type="text" className="form-control" id="floatingInput" placeholder="last name" name="lastName"/>
              <label htmlFor="floatingInput">Last Name</label>
            </div>

          </div>
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email"/>
            <label htmlFor="floatingInput">Email</label>

          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="password" name="password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="confirm password" name="confirmPassword" />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>
          <br />
          <div className="mb-2">
            <input type="checkbox" className="box" />
            <label className="checkbox-primary"> I accept the Terms of Use & Privacy Policy </label>
          </div>

          <input value="Submit" className="w-100 btn btn-lg btn-primary bg-dark" type="submit" />
        </form>

        <div id="statusMessage" style={{ color: 'red' }}>{message}</div>

      </div>
    </div>

  );
};