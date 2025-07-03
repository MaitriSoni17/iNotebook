import React from 'react'
import userContext from '../context/user/userContext'
import { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDetails = (props) => {
  let history = useNavigate();
  const context = useContext(userContext);
  const { user, getUser, editUser, changePassword } = context;
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
  const refPass = useRef(null);
  const [showMsg, setShowMsg] = useState(false);
  const [credentials, setCredentials] = useState({ id: "", ename: "", eemail: "", epassword: "" });
  const [nPassword, setnPassword] = useState({ id: "", password: "", npassword: "", ncpassword: "" });
  const [showPassword, setshowPassword] = useState(false);
  const [shownPassword, setShownPassword] = useState(false);
  const [showncPassword, setShowncPassword] = useState(false);
  const opassVisibility = () => {
    setshowPassword(prev => !prev);
  }
  const npassVisibility = () => {
    setShownPassword(prev => !prev);
  }

  const ncpassVisibility = () => {
    setShowncPassword(prev => !prev);
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
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

  const changePass = () => {
    setnPassword(prev => ({ ...prev, id: user._id }));
    refPass.current.click();
  };

  const onChangePass = (e) => {
    setnPassword({ ...nPassword, [e.target.name]: e.target.value })
  }
  
  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    if (nPassword.npassword !== nPassword.ncpassword) {
      alert("New and confirm passwords do not match");
      return;
    }

    const res = await changePassword(nPassword.id, nPassword.password, nPassword.npassword);
    if (!res.success) {
      alert("Invalid Password");
    } else {
      refClose.current.click();
      props.showAlert("Changed Successfully", "success");
    }
  };
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
      <button type="button" ref={refPass} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitPassword}>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <div className="d-flex">
                    <input type={showPassword ? "text" : "password"} className="form-control" id="opassword" name="opassword" onChange={onChangePass} /><i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} fs-4 mx-3 text-primary`} onClick={opassVisibility}></i>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                  <div className="d-flex">
                    <input type={shownPassword ? "text" : "password"} className="form-control" id="npassword" name="npassword" onChange={onChangePass} /><i className={`bi ${shownPassword ? "bi-eye-slash" : "bi-eye"} fs-4 mx-3 text-primary`} onClick={npassVisibility}></i>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                  <div className="d-flex">
                    <input type={showncPassword ? "text" : "password"} className="form-control" id="ncpassword" name="ncpassword" onChange={onChangePass} /><i className={`bi ${showncPassword ? "bi-eye-slash" : "bi-eye"} fs-4 mx-3 text-primary`} onClick={ncpassVisibility}></i>
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
            <button onClick={() => updateDetails(user)} className="btn btn-primary ms-3 fs-5"><i className="bi bi-pen me-2"></i>Edit Details</button>
            <button onClick={changePass} className="btn btn-primary ms-3 fs-5"><i className="bi bi-shield-lock-fill me-2"></i>Change Password</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetails