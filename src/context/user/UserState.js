import React, { useState } from 'react'
import userContext from './userContext'

const UserState = (props) => {
    const userInitial = [];
    let [user, setUser] = useState(userInitial);
    const getUser = async () => {
        // API Call
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
            method: 'POST',
            headers: {
                "auth-token": localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
        user = await response.json()
        // console.log(user);
        setUser(user);
    }
    const editUser = async (id, name, email, password) => {
        const response = await fetch(`http://localhost:5000/api/auth/edituser/${id}`, {
            method: 'PUT',
            headers: {
                "auth-token": localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        user = await response.json()
        return user;
    }
    const changePassword = async (id, password, npassword) => {
        // const { password, npassword } = req.body;

        
        const response = await fetch(`http://localhost:5000/api/auth/editpassuser/${id}`, {
            method: 'PUT',
            headers: {
                "auth-token": localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password, npassword })
        });
        const json = await response.json();
        if (!password || !npassword) {
            return json.status(400).json({ success: false, error: "Old or new password missing" });
        }
        return json;
    };
    return (
        <userContext.Provider value={{ user, getUser, editUser, changePassword }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState