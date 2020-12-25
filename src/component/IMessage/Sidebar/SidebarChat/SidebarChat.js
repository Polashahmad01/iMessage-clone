import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import './SidebarChat.css';
import { setChat } from '../../../features/chatSlice';
import db from '../../../firebase/firebase';
import * as timeago from 'timeago.js';

const SidebarChat = ({ id, chatName}) => {
    const dispatch = useDispatch();
    const [ chatInfo, setChatInfo ] = useState([]);

    useEffect(() => {
        db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
            setChatInfo(snapshot.docs.map(doc => doc.data()))
        ))
    }, [id]);

    const roomHanlder = () => {
        dispatch(
            setChat({
                chatId: id,
                chatName: chatName,
            })
        )
    } 

    return (
        <div onClick={roomHanlder} className="sidebarChat">
            <Avatar src={chatInfo[0]?.photo} className="sidebarChat__avatar" />
            <div className="sidebarChat__info">
                <h3>{chatName}</h3>
                <p>{chatInfo[0]?.message}</p>
                <small>{timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}</small>
            </div>
        </div>
    )
}

export default SidebarChat
