import React from 'react'
import userContext from '../context/user/userContext'
import { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDetails = (props) => {
  let history = useNavigate();
  const context = useContext(userContext);
  const { user, getUser, editUser } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser();
      // eslint-disable-next-line
    }
    else {
      history("/login");
    }
  })
  const handleLogout = () => {
    localStorage.removeItem('token');
    history("/login");
  }
  const refChange = useRef(null);
  const refClose = useRef(null);
  const [showMsg, setShowMsg] = useState(false);
  const [credentials, setCredentials] = useState({ id:"", ename: "", eemail: "", epassword: "" })
  const [showPassword, setshowPassword] = useState(false);
  const opassVisibility = () => {
    setshowPassword(prev => !prev);
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const updateDetails = (currentUser) =>{
    setCredentials({id:currentUser._id, ename: currentUser.name, eemail: currentUser.email, epassword: ""})
    refChange.current.click();
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const res = await editUser(credentials.id, credentials.ename, credentials.eemail, credentials.epassword);
    if(!res.success){
      // props.showAlert("Invalid Password", "danger")
      setShowMsg(true);
    }
    else{
      setShowMsg(false);
      refClose.current.click();
      props.showAlert("Updated Successfully", "success")
    }
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
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Details</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="ename" className="form-label">Name</label>
                  <input type="text" className="form-control" value={credentials.ename} id="ename" name="ename" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="eemail" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="eemail" value={credentials.eemail} name="eemail" aria-describedby="emailHelp" onChange={onChange}/>
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="epassword" className="form-label">Password</label>
                  <div className="d-flex">
                    <input type={showPassword ? "text" : "password"} value={credentials.epassword} className="form-control" id="epassword" name="epassword" onChange={onChange} /><i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} fs-4 mx-3 text-primary`} onClick={opassVisibility}></i>
                  </div>
                    <div id="showmsg" className={ `form-text text-danger ${showMsg ? "" : "d-none"}` }>Invalid Password</div>
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
            <button onClick={() => updateDetails(user)} className="btn btn-primary ms-3 fs-5"><i className="bi bi-pen me-2"></i>Edit Details</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetails