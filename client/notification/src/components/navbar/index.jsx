import Notification from "../../img/notification.svg"
import Message from "../../img/message.svg"
import Settings from "../../img/settings.svg"

import "./navbar.css"
import { useEffect, useState } from "react"
const Navbar = ({ socket }) => {
    const [notification, setNotifications] = useState([]);
    const [open, setOpen] = useState(false)
    useEffect(() => {
        socket?.on("getNotification", (data) => {
            setNotifications(prev => [...prev, data])
        })
    }, [socket])

    const displayNotifications = ({ senderName, type }) => {
        let action;

        switch (type) {
            case 1: action = "liked"; break;
            case 2: action = "comment"; break;
            default: action = "shared";
        }
        return (
            <span className="notification">{`${senderName} ${action} your post`}</span>
        )
    }

    const handleRead = () => {
        setNotifications([]);
        setOpen(false);
    };

    return (
        <div className="navbar">
            <span className="logo">Lama App</span>
            <div className="icons">
                <div className="icon">
                    <img src={Notification} className="iconImg" alt="" onClick={() => setOpen(!open)}></img>
                    <div className="counter">2</div>
                </div>
                <div className="icon">
                    <img src={Message} className="iconImg" alt="" onClick={() => setOpen(!open)}></img>
                    <div className="counter">2</div>
                </div>
                <div className="icon">
                    <img src={Settings} className="iconImg" alt="" onClick={() => setOpen(!open)}></img>
                    <div className="counter">2</div>
                </div>
            </div>
            {
                open ? (notification.length ?
                    (<div className="notifications">
                        {notification.map(n => displayNotifications(n))}
                        <button className="nButton" onClick={handleRead}>
                            Mark as read
                        </button>
                    </div>) : <span>empty message</span>) : <></>
            }
        </div >
    )
}

export default Navbar