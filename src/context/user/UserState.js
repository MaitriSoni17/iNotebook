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
  return (
    <userContext.Provider value={{user, getUser}}>
        {props.children}
    </userContext.Provider>
  )
}

export default UserState