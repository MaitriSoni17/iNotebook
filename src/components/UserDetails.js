import React from 'react'
import userContext from '../context/user/userContext'
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const context = useContext(userContext);
  const { user, getUser } = context;
  let history = useNavigate();
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
  return (
    <>
      <div className="container my-5 pt-4">
        <div className="card border-primary position-relative rounded-5 text-center shadow my-5">
          <i className="bi bi-person-circle position-absolute top-0 start-50 translate-middle bg-white text-primary" style={{ fontSize: '150px', cursor: 'auto' }}></i>
          <div className="card-body mt-5 pt-5">
            <h1 className="card-title text-center mt-4">{user.name}</h1>
            <p className="card-text m-5"><b>Email:</b> {user.email} </p>
            <Link onClick={handleLogout} className="btn btn-primary fs-5" to="/" role="button"><i class="bi bi-box-arrow-left me-2"></i>Log Out</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetails