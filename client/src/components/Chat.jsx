import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('connect', () => {
            console.log('Connected!');
        });

        socket.on('event_to_all_other_clients', (data) => {
            setMessages((messages) => [...messages, data]);
        });

        return () => {
            socket.off('connect');
            socket.off('event_from_client');
        };
    }, [socket]);

    const handleSubmit = (event) => {
        event.preventDefault();
        socket.emit('event_from_client', message);
        setMessage('');
    };

    return (
        <div className="flex-column h-screen bg-gray-900 border">
            <h1 className='my-10'>Chat App</h1>
            <div className="w-100 mx-10 my-auto p-4 border rounded-lg">
                <div className="bg-gray-800 rounded-lg px-10 py-4 mb-6">
                    <h1 className="text-lg font-bold text-gray-100 mb-2 bg-slate-600 rounded px-40 w-full">Chat</h1>
                    <ul className="overflow-auto max-h-80 w-full">
                        {messages.map((message, index) => (
                            <li key={index} className="mb-4">
                                <div className="flex items-start">
                                    <div className=' bg-slate-700 p-5 rounded-3xl'>
                                            <span className="text-gray-100 font-bold">{message.sender.slice(-4)}</span>
                                            <span className="text-gray-400 text-xs ml-2 align-self-end">
                                                {new Date(message.timestamp).toLocaleString()}
                                            </span>
                                            <hr/>
                                        <div className="text-gray-300 mt-2 text-blue-300">{message.content}</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex bg-gray-800 rounded-lg p-2 mb-6">
                        <input
                            type="text"
                            placeholder="Enter message"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            className="bg-gray-700 text-gray-100 rounded-full py-2 px-4 w-full focus:outline-none"
                        />
                        <button type="submit" className="bg-blue-500 text-white rounded-full py-2 px-4 ml-2">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chat;
