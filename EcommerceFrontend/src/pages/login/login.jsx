import "./login.css";
import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import authservice from "../../services/authservice";
import { Link } from "react-router-dom";




export const Login = () => {
  
  const [message, setMessage] = useState('');
  const { user,setUser } = useContext(ShopContext);
  

  useEffect(() => {
    if (user != null) {
      setMessage(`${user.firstName} ${user.lastName} is already loggedIn`);
    }
  }, []);


  const loginClick = () => {

    const email = document.querySelector("#floatingInput").value 
    const password = document.querySelector("#floatingPassword").value 
    const statusMessage = document.querySelector("#statusMessage")

    const studentLoginRequest = {
      email,
      password
    };

    authservice.login(studentLoginRequest)
      .then(response => {
        let student = response.data
        console.log(student)
        setUser(student.user)
        statusMessage.style.color = 'green';
        setMessage('User LoggedIn Sucessfully');
      })
      .catch(error => {
        statusMessage.style.color = 'red';
        console.log(error.response.data);
        setMessage(error.response.data);
      })
  }


  return (
    <div className="text-center">
      <div className="login-form-container w-100 m-auto">
        <form>
          <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>
          <br />
          <br />
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="mb-2">
          <input type="checkbox" className="box" />
          <label className="checkbox-primary"> Remember Me </label>
          </div>

          <input
            className="w-100 btn btn-lg btn-primary bg-dark"
            type="button"
            value="Sign in"
            onClick={loginClick}
          />
            
          <div id="statusMessage" style={{ color: 'green' }}>{message}</div>
          <label htmlFor="createAccount" className="signup-link">

            <Link to="/signup">
              Don't have an account? Sign up
            </Link>
          </label>
        </form>
      </div>
    </div>
  );
};