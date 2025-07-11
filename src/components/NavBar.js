import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
    let history = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        history("/login");
    }
    let location = useLocation();
    useEffect(() => {
        // console.log(location.pathname);
    }, [location]);
    const showUser = ()=>{
        history("/userdetails");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/"? "active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about"? "active":""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className={`btn btn-primary mx-1 fs-6 ${location.pathname === "/login"? "active":""}`} to = "/login" role="button" aria-disabled="true"><i className="bi bi-box-arrow-in-right me-2"></i>Login</Link>
                            <Link className={`btn btn-primary mx-1 fs-6 ${location.pathname === "/signup"? "active":""}`} to="/signup" role="button" aria-disabled="true"><i className="bi bi-person me-2"></i>Sign Up</Link>
                        </form>: <form className="d-flex"><Link onClick={handleLogout} className="btn btn-primary mx-1 fs-6" to="/" role="button"><i className="bi bi-box-arrow-left me-2"></i>Log Out</Link><i className="bi bi-person-circle fs-3 mx-3 text-primary" onClick={showUser}></i></form>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar