import React, {useState} from 'react'
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
    const editUser = async (id, name, email, password) =>{
        const response = await fetch(`http://localhost:5000/api/auth/edituser/${id}`, {
            method: 'PUT',
            headers: {
                "auth-token": localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password})
        });
        user = await response.json()
        let newDetails = JSON.parse(JSON.stringify(user))
        for (let index = 0; index < newDetails.length; index++) {
            const element = newDetails[index];
            if (element._id === id) {
                newDetails[index].name = name;
                newDetails[index].email = email;
                newDetails[index].password = password;
                break;
            }
        }
        // console.log(user);
        setUser(user);
    }
  return (
    <userContext.Provider value={{user, getUser, editUser}}>
        {props.children}
    </userContext.Provider>
  )
}

export default UserState