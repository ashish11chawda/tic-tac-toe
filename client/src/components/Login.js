import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Login({setIsAuth, SERVER_URL}) {
    const [username, setUsername] =  useState("");
    const [password, setPassword] =  useState("");


    const login = () => {
        const cookies = new Cookies();
        axios.post(`${SERVER_URL}/login`, {
            username, 
            password
        }).then(res => {
            console.log(res.data);
            const {firstName, lastName, username, token, userId} = res.data;
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("username", username);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            setIsAuth(true);
        }).catch((error) => {
            console.error(error);
            alert("Server is unreachable");
        });
    };
    return (
    <div className='login'>
        <label>Login</label>
        <input placeholder='username' onChange={(event) => {
           setUsername(event.target.value)
        } }/>
        <input placeholder='password' onChange={(event) => {
            setPassword(event.target.value)
        } }/>        
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login