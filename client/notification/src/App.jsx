import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar';
import Card from './components/card';
import { posts } from "./data"
import { io } from "socket.io-client"

const URL = "http://localhost:3000";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  console.log({ socket });
  useEffect(() => {
    setSocket(io(URL));
  }, [])

  useEffect(() => {
    socket?.emit("newUser", user)
  }, [socket, user])

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => {
            return (
              <Card key={post.id} post={post} socket={socket} user={user} />
            )
          })}
          <span className='username'>{username}</span>
        </>) : (
        <div className="login">
          <h2>Lama App</h2>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>)}
    </div >
  );
}

export default App
