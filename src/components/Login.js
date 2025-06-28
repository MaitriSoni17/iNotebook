import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false);
    const passVisibility = () => {
        setShowPassword(prev => !prev);
    }
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Loged in Successfully", "success")
            history("/");
        }
        else {
            props.showAlert("Invalid Details", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="card border-primary mt-3 rounded-5 p-5 pt-3 shadow">
                <div className="card-body">
                    <h1 className="text-center">Login</h1>
                    <div className="mb-3 pt-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <div className="d-flex">
                            <input type="email" value={credentials.email} className="form-control me-5" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                        </div>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3 py-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="d-flex">
                            <input type={showPassword ? "text" : "password"} value={credentials.password} className="form-control" id="password" name="password" onChange={onChange} /><i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} fs-4 mx-3 text-primary`} onClick={passVisibility}></i>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary fs-5 pe-3"><i className="bi bi-box-arrow-in-right me-2"></i>Login</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login