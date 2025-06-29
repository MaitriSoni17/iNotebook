import React from 'react'
import userContext from '../context/user/userContext'
import { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDetails = () => {
  let history = useNavigate();
  const context = useContext(userContext);
  const { user, getUser, editUser } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser()
      // eslint-disable-next-line
    }
    else {
      history("/login")
    }
  },)
  const handleLogout = () => {
    localStorage.removeItem('token');
    history("/login");
  }
  const refChange = useRef(null);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
  const [showPassword, setshowPassword] = useState(false);
  const opassVisibility = () => {
    setshowPassword(prev => !prev);
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleEdit = () => {
    
  }
  return (
    <>
      <button type="button" ref={refChange} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#edituser">
        Launch demo modal
      </button>
      <div className="modal fade" id="edituser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEdit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" value={credentials.name} id="name" name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="d-flex">
                    <input type={showPassword ? "text" : "password"} className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} /><i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} fs-4 mx-3 text-primary`} onClick={opassVisibility}></i>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-5 pt-4">
        <div className="card border-primary position-relative rounded-5 text-center shadow my-5">
          <i className="bi bi-person-circle position-absolute top-0 start-50 translate-middle bg-white text-primary" style={{ fontSize: '150px', cursor: 'auto' }}></i>
          <div className="card-body mt-5 pt-5">
            <h1 className="card-title text-center mt-4">{user.name}</h1>
            <p className="card-text m-5"><b>Email:</b> {user.email} </p>
            <Link onClick={handleLogout} className="btn btn-primary fs-5" to="/" role="button"><i className="bi bi-box-arrow-left me-2"></i>Log Out</Link>
            <button onClick={() => { refChange.current.click() }} className="btn btn-primary ms-3 fs-5"><i className="bi bi-pen me-2"></i>Edit Details</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetails