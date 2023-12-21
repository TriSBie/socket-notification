import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar';
import Card from './components/card';
import { posts } from "./data"
import { io } from "socket.io-client"

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const URL = "http://localhost:3000";
    const socket = io(URL);
    socket.connect();
    socket.on("message", (arg) => {
      console.log(arg)
    })
    console.log({ socket });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

  }, [])

  return (
    <div className="container">

      {user ? (
        <>
          <Navbar />
          {posts.map((post) => {
            return (
              <Card key={post.id} post={post} socket={null} user={user} />
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
