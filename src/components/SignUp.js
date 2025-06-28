import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const SignUp = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const passVisibility = () => {
    setShowPassword(prev => !prev);
  }
  const cpassVisibility = () => {
    setShowCPassword(prev => !prev);
  }
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Password and Confirm Password Both are must be same!!", "danger")
    }
    else {
      const { name, email, password } = credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        history("/");
        props.showAlert("Account Created Successfully", "success")
      }
      else {
        props.showAlert("Invalid Credentials", "danger")
      }
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="container card rounded-5 shadow border-primary mt-5">
        <div className="card-body">
          <h1 className="mt-3 text-center">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlhtmlFor="name" className="form-label">Name</label>
              <div className="d-flex">
                <input type="text" className="form-control me-5" onChange={onChange} id="name" name="name" />
              </div>
            </div>
            <div className="mb-4">
              <label htmlhtmlFor="email" className="form-label">Email address</label>
              <div className="d-flex">
                <input type="email" className="form-control me-5" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />
              </div>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-4">
              <label htmlhtmlFor="password" className="form-label">Password</label>
              <div className="d-flex">
                <input type={showPassword ? "text" : "password"} className="form-control" onChange={onChange} id="password" name="password" minLength={5} required /><i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} fs-4 mx-3 text-primary`} onClick={passVisibility}></i>
              </div>
            </div>
            <div className="mb-4">
              <label htmlhtmlFor="cpassword" className="form-label">Confirm Password</label>
              <div className="d-flex">
                <input type={showCPassword ? "text" : "password"} className="form-control" onChange={onChange} id="cpassword" name="cpassword" minLength={5} required /><i className={`bi ${showCPassword ? "bi-eye-slash" : "bi-eye"} fs-4 mx-3 text-primary`} onClick={cpassVisibility}></i>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mb-4 fs-6"><i className="bi bi-person me-2"></i>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp