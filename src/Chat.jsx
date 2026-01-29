import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import "./ChatBox.css";
import "./ChatStyle.css";
const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // Retrieve user ID and token from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    if (chat && Array.isArray(chat.members)) {
      const userId = chat?.members?.find((id) => id !== currentUser);

      const getUserData = async () => {
        axios
          .get(`${API}/chat/${userId}`)
          .then((res) => {
            setUserData(res.data);
          })
          .catch((error) => {
            console.error("Error fetching user:", error);
          });
      };

      if (chat !== null) getUserData();
    }
  }, [chat, currentUser]);

  // get sender's info (username + profil pic)

  useEffect(() => {
    if (chat && Array.isArray(chat.members)) {
      const userId = chat?.members?.find((id) => id !== currentUser);

      const [senderId, receiverId] = chat.members;
      const senderID = senderId === currentUser ? receiverId : senderId;
      const getUserInfo = async () => {
        axios
          .get(`${API}/auth/${senderID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setUserInfo(res.data);
          })
          .catch((error) => {
            console.error("Error fetching user' info'", error);
          });
      };

      getUserInfo();
    }
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      const chatId = chat?._id;
      axios
        .get(`${API}/message/${chatId}`)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user' info'", error);
        });
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    const { data } = await axios.post(`${API}/message`, message);
    try {
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.error("Error fetching user's message");
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const scroll = useRef();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSend();
      }
    };

    // Add event listener for keydown
    document.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={userInfo?.image}
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>{userInfo?.username}</span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body">
              {messages.map((message, index) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                    key={index}
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <InputEmoji value={newMessage} onChange={handleChange} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend(e);
                }
              }} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
              <input type="file" name="" id="" style={{ display: "none" }} />
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
