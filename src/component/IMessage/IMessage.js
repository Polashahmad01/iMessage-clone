import React from 'react';

import './IMessage.css';
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat';

const IMessage = () => {
    return (
        <div className="imessage">
            <Sidebar />
            <Chat />
        </div>
    )
}

export default IMessage
