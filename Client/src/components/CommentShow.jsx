import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { IoMdOpen } from "react-icons/io";


function CommentShow({ CurrComment, onDelete, onEdit, handleCommentLikes }) {

    const [user, setUser] = useState({});

    const [CommentError, setCommentError] = useState('');
    const [isEdit, setEdit] = useState(false);

    const [CommentToUpdate, setCommentToUpdate] = useState('');

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchCommentUser = async () => {
            try {
                const res = await fetch(`/api/user/${CurrComment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchCommentUser();

    }, [CurrComment])



    return (
        <div className='mb-5 border border-black p-2 rounded-md flex flex-col space-y-3' >
            <div className='flex space-x-2 justify-start'>
                <img className='h-6 w-6 rounded-xl' src={user.image} alt="" />
                <span className='text-xs text-gray-500'>By: @{user.username} </span>

            </div>


            <div className='flex justify-between'>
                {isEdit ?
                    <textarea className='mb-4 p-3 bg-gray-300 w-full rounded-md overflow-auto'
                        onChange={(e) => setCommentToUpdate(e.target.value)}  >{CommentToUpdate}</textarea>

                    : <p className='text-gray-800'>{CurrComment.content}</p>
                }

                {CurrComment.userId == currentUser._id
                    && <div className='flex items-center space-x-2'>
                        {!isEdit ?
                            <>
                                <button onClick={() => { setEdit(true); setCommentToUpdate(CurrComment.content); }} className='cursor-pointer'><IoMdOpen /></button>
                                <button onClick={() => onDelete(CurrComment._id)} className='cursor-pointer'> <MdDelete /> </button>
                            </>
                            : <button onClick={() => { setEdit(false); onEdit(CurrComment._id, CommentToUpdate) }}
                                className='p-1 text-xs bg-green-500 text-white rounded-lg font-semibold'>Submit</button>

                        }

                    </div>}

            </div>

            <div className='flex items-center space-x-2'>
                {CurrComment.likes.includes(currentUser._id) ?
                  
                  <AiFillLike className='cursor-pointer' onClick={() =>handleCommentLikes(CurrComment._id)} /> :
                    <AiOutlineLike className='cursor-pointer' onClick={() =>handleCommentLikes(CurrComment._id)} />
                }
                <span className='text-sm text-gray-500'>{CurrComment.noOfLikes} Likes</span>
                {CommentError && <p>{CommentError}</p>}
            </div>
        </div>


    )
}

export default CommentShow
