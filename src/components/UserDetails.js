import React from 'react'
import userContext from '../context/user/userContext'
import { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDetails = (props) => {
  let history = useNavigate();
  const context = useContext(userContext);
  const { user, getUser, editUser, changePassword, deleteUser } = context;
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
  const refChangePass = useRef(null);
  const refDeleteUser = useRef(null);
  const [showMsg, setShowMsg] = useState(false);
  const [credentials, setCredentials] = useState({ id: "", ename: "", eemail: "", epassword: "" });
  const [pass, setPass] = useState({ id: "", name: "", email: "", opassword: "", npassword: "" });
  const [cpass, setcPass] = useState({id: "", password: ""});
  const [showPassword, setshowPassword] = useState(false);
  const [showoPassword, setshowoPassword] = useState(false);
  const [shownPassword, setshownPassword] = useState(false);
  const opassVisibility = () => {
    setshowPassword(prev => !prev);
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    setPass({ ...pass, [e.target.name]: e.target.value })
    setcPass({...cpass, [e.target.name]: e.target.value})
  }
  const updateDetails = (currentUser) => {
    setCredentials({ id: currentUser._id, ename: currentUser.name, eemail: currentUser.email, epassword: "" })
    refChange.current.click();
  }
  const handleDetailSubmit = async (e) => {
    e.preventDefault();
    const res = await editUser(credentials.id, credentials.ename, credentials.eemail, credentials.epassword);
    if (!res.success) {
      setShowMsg(true);
    }
    else {
      setShowMsg(false);
      refClose.current.click();
      props.showAlert("Updated Successfully", "success")
    }
  }
  const changePass = (currentUser) => {
    setPass({ id: currentUser._id, name: currentUser.name, email: currentUser.email, opassword: "", npassword: "" })
    refChangePass.current.click();
  }

  const handlePassChange = async (e) => {
    e.preventDefault();
    const res = await changePassword(pass.id, pass.name, pass.email, pass.opassword, pass.npassword);
    if (!res.success) {
      setShowMsg(true);
    }
    else {
      setShowMsg(false);
      refClose.current.click();
      props.showAlert("Updated Successfully", "success")
    }
  }

  const deleteU = (currentUser) => {
    setcPass({id: currentUser._id, password: ""})
    refDeleteUser.current.click();
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await deleteUser(cpass.id, cpass.password);
    if (!res.success) {
      setShowMsg(true);
    }
    else {
      setShowMsg(false);
      refClose.current.click();
      handleLogout();
      props.showAlert("Deleted Successfully", "success")
    }
  }

  return (
    <>

      {/* Update User Details */}
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
              <form onSubmit={handleDetailSubmit}>
                <div className="mb-3">
                  <label htmlFor="ename" className="form-label">Name</label>
                  <input type="text" className="form-control" value={credentials.ename} id="ename" name="ename" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="eemail" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="eemail" value={credentials.eemail} name="eemail" aria-describedby="emailHelp" onChange={onChange} />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="epassword" className="form-label">Password</label>
                  <div className="d-flex">
                    <input type={showPassword ? "text" : "password"} value={credentials.epassword} className="form-control" id="epassword" name="epassword" onChange={onChange} /><i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} fs-4 mx-3 text-primary`} onClick={opassVisibility}></i>
                  </div>
                  <div id="showmsg" className={`form-text text-danger ${showMsg ? "" : "d-none"}`}>Invalid Password</div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}

      <button type="button" ref={refChangePass} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#changePass">
        Launch demo modal
      </button>

      <div className="modal fade" id="changePass" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handlePassChange}>
                <div className="mb-3">
                  <label htmlFor="opassword" className="form-label">Password</label>
                  <div className="d-flex">
                    <input type={showoPassword ? "text" : "password"} value={pass.opassword} className="form-control" id="opassword" name="opassword" onChange={onChange} /><i className={`bi ${showoPassword ? "bi-eye-slash" : "bi-eye"} fs-4 mx-3 text-primary`} onClick={() => { setshowoPassword(prev => !prev) }}></i>
                  </div>
                  <div id="showmsg" className={`form-text text-danger ${showMsg ? "" : "d-none"}`}>Invalid Password</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="npassword" className="form-label">New Password</label>
                  <div className="d-flex">
                    <input type={shownPassword ? "text" : "password"} value={pass.npassword} className="form-control" id="npassword" name="npassword" onChange={onChange} /><i className={`bi ${shownPassword ? "bi-eye-slash" : "bi-eye"} fs-4 mx-3 text-primary`} onClick={() => { setshownPassword(prev => !prev) }}></i>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Delete User */}
      <button type="button" ref={refDeleteUser} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#deleteUser">
        Launch demo modal
      </button>

      <div className="modal fade" id="deleteUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-danger-subtle border border-danger shadow">
            <div className="modal-header border-bottom border-danger">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete your Account?</h1>
              <button type="button" className="btn-close focus-ring focus-ring-danger" data-bs-dismiss="modal" ref={refClose} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleDelete}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-secondary-emphasis mb-3">Please Enter Your Password</label>
                  <div className="d-flex">
                    <input type={showPassword ? "text" : "password"} value={cpass.password} className="form-control focus-ring focus-ring-danger border border-danger" id="password" name="password" onChange={onChange} /><i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} fs-4 mx-3 text-danger`} onClick={() => { setshowPassword(prev => !prev) }}></i>
                  </div>
                  <div id="showmsg" className={`mt-3 form-text text-danger ${showMsg ? "" : "d-none"}`}>Invalid Password</div>
                </div>
                <button type="submit" className="mt-2 btn btn-outline-danger shadow">Confirm</button>
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
            <button onClick={() => changePass(user)} className="btn btn-primary ms-3 fs-5"><i className="bi bi-shield-lock-fill me-2"></i>Change Password</button>
            <button className="btn btn-danger ms-3 fs-5" onClick={()=>{deleteU(user)}}><i className="bi bi-trash me-2"></i>Delete</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetails