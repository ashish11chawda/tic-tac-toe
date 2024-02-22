import React, {useState} from 'react'
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp({setIsAuth, SERVER_URL}) {
    const cookies = new Cookies();
    const [user, setUser] = useState(null);
    const signUp = () => {
        Axios.post(`${SERVER_URL}/signup`, user).then(res => {
            console.log(res.data);
            const {token, userId, firstName, lastName, username, hashedPassword} = res.data;
            cookies.set("token", token);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            cookies.set("username", username);
            cookies.set("userId", userId);
            cookies.set("hashedPassword", hashedPassword);
            setIsAuth(true);
        });
    };
  return (
    <div className='signUp'>
        <label>Sign Up</label>
        <input placeholder='First Name' onChange={(event) => {
            setUser({...user, firstName: event.target.value})
        } }/>
        <input placeholder='Last Name' onChange={(event) => {
            setUser({...user, lastName: event.target.value})
        } }/>
        <input placeholder='username' onChange={(event) => {
            setUser({...user, username: event.target.value})
        } }/>
        <input placeholder='password' onChange={(event) => {
            setUser({...user, password: event.target.value})
        } }/>        
        <button onClick={signUp}>Sign Up</button>
    </div>
  )
}

export default SignUp