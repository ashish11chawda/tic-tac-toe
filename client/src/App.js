import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import {StreamChat} from "stream-chat";
import Cookies from "universal-cookie";
import { useState } from 'react';
import {Chat} from 'stream-chat-react';
import JoinGame from './components/JoinGame';
// import 'dotenv/config';


function App() {
  const api_key = process.env.REACT_APP_API_KEY;
  const client = StreamChat.getInstance(api_key);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [isAuth, setIsAuth] = useState(false);
  
  const logout = () => {
    cookies.remove("token");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("username");
    cookies.remove("userId");
    cookies.remove("hashedPassword");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      firstName: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword"),
    }, token)
    .then((user) => {
      setIsAuth(true);
    });
  }
  
  return (
    <div className="App">
    {isAuth ? (
      <Chat client={client}>
        <JoinGame/>
        <button onClick={logout}>Log Out</button>
      </Chat>
      ) : (
      <>
        <SignUp setIsAuth={setIsAuth}/>
        <Login setIsAuth={setIsAuth}/>
      </>)}
    </div>
  );
}

export default App;
