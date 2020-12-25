import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { MicNone } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

import './Chat.css';
import Message from './Message/Message';
import { selectChatName } from '../../features/chatSlice';
import { selectChatId } from '../../features/chatSlice';
import db from '../../firebase/firebase';
import { selectUser } from '../../features/userSlice';

const Chat = () => {
    const [ input, setInput ] = useState('');
    const [ messages, setMessages ] = useState([]);
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const user = useSelector(selectUser);

    const sendMessage = (event) => {
        event.preventDefault();

        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName,
        })

        setInput("");
    }

    useEffect(() => {
        if(chatId) {
            db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'asc').onSnapshot( snapshot => (
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                })))
            ))
        }
    }, [chatId])

    return (
        <div className="chat">
            <div className="chat__header">
                <h4>To: 
                    <span className="chat__headerChannelName">
                        {chatName}
                    </span>
                </h4>
                <strong>Details</strong>
            </div>
            <div className="chat__messages">
                <FlipMove>
                    {messages.map(({id, data}) => (
                        <Message 
                            key={id}
                            contents={data}
                        />
                    ))}
                </FlipMove>
            </div>
            <div className="chat__input">
                <form>
                    <input 
                        placeholder="Type a message"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button type="submit" onClick={sendMessage}>Send message</button>
                </form>
                <IconButton>
                    <MicNone className="chat__mic" />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
