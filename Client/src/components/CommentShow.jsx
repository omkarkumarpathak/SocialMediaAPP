import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from 'react-redux';

function CommentShow({ CurrComment }) {

    const [user, setUser] = useState({});
    const [LikeClicked, setLikeClicked] = useState(false);
    const [comment, setComment]=useState(CurrComment);

    const {currentUser}=useSelector((state)=>state.user);
    
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

    const handleCommentLikes=async()=>{
        try {
            const res=await fetch(`/api/comment/likedComment/${CurrComment._id}`,{
                method:'PUT'
            });
            const data=await res.json();
            if(res.ok){
                setComment([data,...comment]);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='mb-5 border border-black p-2 rounded-md flex flex-col space-y-3' >
            <div className='flex space-x-2 justify-start'>
                <img className='h-6 w-6 rounded-xl' src={user.image} alt="" />
                <span className='text-xs text-gray-500'>By: @{user.username} </span>

            </div>
            <p className='text-gray-800'>{CurrComment.content}</p>
            <div className='flex items-center space-x-2'>
                {LikeClicked ? <AiFillLike className='cursor-pointer' onClick={() => handleCommentLikes() }/> :
                    <AiOutlineLike className='cursor-pointer' onClick={() =>handleCommentLikes()} />
                }
                <span className='text-sm text-gray-500'>{comment.noOfLikes} Likes</span>
                
            </div>
        </div>


    )
}

export default CommentShow
