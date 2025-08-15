import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {createSocketConnection} from "../utils/socket.js";
import {useSelector} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

function Chat() {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((state) => state?.user);
    const loggedInUserId = user?._id;

  console.log("Messages:", messages);

    // Create a socket connection and join the chat room
    // Establish socket connection and join chat room on mount
    useEffect(() => {
      if(!loggedInUserId) {
        return;
      }
        const socket = createSocketConnection();
        // Emit event to join chat with user IDs
        socket.emit("joinChat", {
          firstName: user.firstName,
          loggedInUserId,
          targetUserId
        });

        socket.on("messageReceived", ({firstName, text, loggedInUserId, targetUserId}) => {
          console.log(`${firstName} sent a message: ${text}`);
          setMessages((previousMessages) => [...previousMessages, {firstName, text, loggedInUserId, targetUserId}]);
        })

        return () => {
            // Clean up the socket connection when the component unmounts
            socket.disconnect();
        }
    }, [loggedInUserId]);

    const sendMessage = () => {
      const socket = createSocketConnection();
      // Emit the message to the server
      socket.emit("sendMessage", {firstName: user.firstName, loggedInUserId, targetUserId, text: newMessage});
      setNewMessage("");
    }

    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-scroll p-5">
                {messages.map((msg, index) => {
                    return (
                        <div
                            key={index}
                            className={`chat  ${msg.loggedInUserId === loggedInUserId ? 'chat-end' : 'chat-start'}`}
                        >
                            {/*The condition checks if the message's loggedInUserId matches the current user's loggedInUserId.
                                * If they match, the message is from the logged-in user and the chat bubble is aligned to the right (chat-end).
                                * If they don't match, the message is from another user and the chat bubble is aligned to the left (chat-start).
                             */}
                            <div className="chat-header">
                              {msg.firstName}
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                        </div>
                    );
                })}
            </div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input
                    value={newMessage}
                    onChange={(e) => {setNewMessage(e.target.value)}}
                    className="flex-1 border border-gray-500 text-white rounded p-2"
                ></input>
                <div onClick={sendMessage} className="btn btn-accent rounded-full p-2">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </div>
            </div>
        </div>
    );
}

export default Chat;