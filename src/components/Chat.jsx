import { useEffect, useState } from "react";
import Cam from "../img/Cam.png";
import Add from "../img/Add.png";
import More from "../img/more.webp";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css";

export const Chat = (props) => {
  const { room } = props;

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div>
    <div className="menu">
      <a target="_blank" href="https://www.instagram.com/sakirburhanlii/?hl=tr">
        <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/instagram_icon-instagram_buttoninstegram-256.png" />
        İnstagram
      </a>
      <a target="_blank" href="https://github.com/sakirburhanlii">
        <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/github-256.png" />
        GitHup
      </a>
      <a target="_blank" href="https://twitter.com/sakirburhanli">
        <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/twitter-256.png" />
        Twitter
      </a>
      <a target="_blank" href="https://www.linkedin.com/in/sakirburhanli/">
        <img src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_14-linkedin-256.png" />
        LinkedIn
      </a>
      <a target="_blank" href="https://www.youtube.com/@sakirburhanlii">
        <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/youtube-256.png" />
        YouTube
      </a>
      </div>
      <div className="chat-app">
        <div className="header">
          <h1>Welcome to : {room.toUpperCase()}</h1>
          <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
        </div>
        <div className="messages">
          {messages.map((message) => (
            <div className="message" key={message.id}>
              <span className="user">{message.user}</span>:_ 
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="new-message-form">
          <input
            className="new-message-input"
            placeholder="Type your message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button type="submit" className="send-button">
            Send
          </button>
          <button className="Chose" type="button"><a className="roes" href="src\App.js">Choose Room</a></button>
        </form>
      </div>
      </div>
  );
};
