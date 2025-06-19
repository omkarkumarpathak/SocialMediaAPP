import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { io } from 'socket.io-client';

function ChatSection() {
    const [conversationUser, setConversationUser] = useState([]);
    const [messages, setMessages] = useState([]);
    const [inputData, setInputData] = useState('');
    const [ErrorMessage, setErrorMessage] = useState(null);
    const [currentConversationId, setCurrentConversation] = useState(null);

    const [socket, setSocket] = useState(null);

    const [currentReceiver, setCurrentReceiver] = useState({});

    const [AllUsers, setAllUsers] = useState([]);

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        setSocket(io('http://localhost:5173'));
    }, [])


    useEffect(() => {

        socket?.on('connect', () => {
            console.log('Connected to server');
        });

        if (currentUser) {
            socket?.emit('addUser', currentUser?._id);
            socket?.on('getUsers', users => {
                console.log('active users:', users);
            })
        }

        socket?.on('getMessage', (data) => {

            setMessages(prev => {
                return [...prev, { user: { id: data.senderId, username: null }, message: data.message }]
            });
        });

        return () => {
            socket?.disconnect();
        };
    }, [socket]);

    useEffect(() => {

        const fetchConversationUser = async () => {
            try {
                const res = await fetch(`/api/chat/conversations/${currentUser._id}`);
                const data = await res.json();
                const userData = data.users.filter(user => user !== null);

                if (!res.ok) console.log(data.message);
                if (res.ok) {
                    setConversationUser(userData);
                }
            } catch (error) {

            }
        }
        fetchConversationUser();

    }, [])


    useEffect(() => {
        const fetchAllUsers = async () => {

            try {
                const res = await fetch('/api/user/allUsers');

                const data = await res.json();
                if (res.ok) {
                    setAllUsers(data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchAllUsers();

    }, [conversationUser])

    const fetchMessages = async (conversationId) => {
        try {
            const res = await fetch(`/api/chat/messages/${conversationId}`);
            const data = await res.json();
            if (res.ok) {
                setMessages(data)
            }
            if (!res.ok) {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const sendMessage = async () => {

        if (!inputData || inputData == '') {
            return setErrorMessage('Please type something');
        }

        socket?.emit('sendMessage', {
            senderId: currentUser._id,
            conversationId: currentConversationId,
            message: inputData,
            receiverId: currentReceiver.id,
        });

        try {
            const res = await fetch('/api/chat/createMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversationId: currentConversationId,
                    senderId: currentUser._id,
                    message: inputData,
                    receiverId: currentReceiver.id,
                })
            })

            const data = await res.json();

            if (res.ok) {

                setCurrentConversation(data.conversationId);
                setInputData('');
            }

        } catch (error) {
            console.log(error);
        }



    }

    //to auto scroll the div
    const chatRef = useRef(null);
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages])



    return (
        <div className='flex justify-center'>
            <div className='flex w-full '>
                <div className='bg-gray-300 w-[30%] '>
                    <h3 className='mt-3 ml-5 text-xs font-bold p-2 '>Conversation</h3>

                    {
                        conversationUser && (
                            <div className='flex flex-col space-y-4 py-3 px-1.5'>
                                {
                                    conversationUser.map((curr_conversation, idx) => (
                                        <div className='flex space-x-4 bg-gray-100 cursor-pointer rounded-lg p-1 hover:bg-white'
                                            key={idx}
                                            onClick={() => {
                                                fetchMessages(curr_conversation.conversationId);
                                                setCurrentConversation(curr_conversation.conversationId);
                                                setCurrentReceiver(curr_conversation.user);
                                            }
                                            }>

                                            <img src={curr_conversation.user.image} className='h-8 rounded-full' alt="" />
                                            <span className='text-xs flex items-center'>{curr_conversation.user.username}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        )

                    }
                </div>

                <div className=' w-full p-3'>
                    <div className='bg-gray-400 rounded-md p-1 w-full flex flex-col justify-center'>
                        <div ref={chatRef} className=' bg-white h-[30rem] rounded-md p-3 pb-10 overflow-auto
                                                      '>

                            {
                                messages && messages.length != 0 ? (

                                    <div>
                                        <p className='bg-gray-50 p-2 rounded-lg hover:bg-white cursor-pointer'>Name: @{currentReceiver.username}</p>

                                        <div className='flex flex-col space-y-4 py-3 px-1.5'>
                                            {
                                                messages.map(({ message, user: { id } = {} }, idx) => {

                                                    if (id == currentUser._id) {
                                                        return (
                                                            <div className='bg-gray-50 w-[30%] h-[30%]  m-10 p-1 flex justify-between flex-nowrap text-md
                                                    rounded-bl-2xl rounded-tl-xl rounded-tr-xl ml-[7 0%] text-sm md:text-xs'
                                                                key={idx}  >
                                                                <span className='p-2'>{message}</span>
                                                                <button className='mr-4'>::</button>
                                                            </div>
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <div key={idx}
                                                                className='bg-blue-200 w-[30%] h-[30%]  m-10 p-3 flex justify-between flex-nowrap text-md
                                                    rounded-bl-2xl rounded-tl-xl rounded-tr-xl ml-[2%] text-sm md:text-xs'>
                                                                <span> {message}</span>

                                                                <button className='mr-4'>::</button>

                                                            </div>

                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>

                                ) :
                                    <div>
                                        <div className='w-full flex justify-center my-10'>
                                            <span className=''>No messages</span>
                                        </div>
                                    </div>

                            }

                        </div>
                        <div className='w-full flex mt-3'>
                            <input type="text" id='currentMessage' onChange={(e) => setInputData(e.target.value)}
                                value={inputData} className='w-full bg-yellow-100 p-3 outline-none rounded-lg border border-gray-500 mr-2' />
                            <button onClick={sendMessage} className='w-[30%] bg-red-700 text-white rounded-lg'>Send</button>

                        </div>
                        {
                            ErrorMessage && (
                                <div className='mt-3 flex justify-center'>
                                    <span className='text-red-500 font-semibold'>* {ErrorMessage}</span>
                                </div>
                            )
                        }
                    </div>
                </div>


                <div className='bg-gray-300 hidden sm:flex w-[30%] h-screen'>
                    {
                        AllUsers && AllUsers.length != 0 && (
                            <div className='flex flex-col space-y-4 py-3 px-1.5'>
                                <h3 className='text-xs font-bold p-2'>New Conversation</h3>
                                {
                                    AllUsers.map((user, idx) => (
                                        <div className='flex space-x-4 bg-gray-100 cursor-pointer rounded-lg p-1 hover:bg-white'
                                            key={idx}
                                            onClick={() => {
                                                setCurrentConversation('new');
                                                fetchMessages();
                                                const { password, _id, ...rest } = user;
                                                setCurrentReceiver({ id: _id, ...rest });
                                            }}
                                        >

                                            <img src={user.image} className='h-8 rounded-full' alt="#" />
                                            <span>{user.username}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        )

                    }
                </div>


            </div>
        </div>
    )

}

export default ChatSection
