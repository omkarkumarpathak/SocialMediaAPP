import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CommentShow from './CommentShow';

function CommentSection({ PostId }) {

    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    const [AllComments, setAllComments] = useState([]);

    const { currentUser } = useSelector((state) => state.user)

    console.log(AllComments);
    console.log(PostId);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!comment || comment.length == 0) {
            setCommentError('Please write something');
            return;
        }
        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: comment,
                    PostId: PostId,
                    userId: currentUser._id,
                })
            })

            const data = await res.json();
            if (!res.ok) {
                setCommentError(data.message);
            }
            if (res.ok) {
                setCommentError('SuccessFully Commented');
                //for immediate show of comment after submit
                setAllComments([data, ...AllComments])
                setComment('');
            }

        } catch (error) {
            setCommentError(error);
        }

    }

    console.log(AllComments);

    useEffect(() => {

        const fetchComments = async () => {
            const res = await fetch(`/api/comment/getComments/${PostId}`);
            const data = await res.json();
            if (res.ok) {
                setAllComments(data.comments);
            }
        }

        fetchComments();

    }, []);

    return (
        <div className='p-10  bg-blue-100'>

            {currentUser ?
                (
                    <form onSubmit={handleCommentSubmit} className='p-3 mb-5 border border-black rounded-lg w-[70%] bg-white '>
                        <textarea className='p-3 border border-black w-full rounded-md'

                            name="comment" placeholder='Comment...' id="comment" rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            maxLength={100}
                        ></textarea>
                        <div className='flex justify-between p-1'>
                            <span className='text-sm'>{100 - comment.length} chars remaining</span>
                            <button type='submit' className=' bg-green-300 hover:bg-green-400 p-1 rounded-md'>Submit</button>
                        </div>
                        {
                            commentError && (<spa className='text-sm ml-3 text-red-500 font-semibold'>**{commentError}</spa>)
                        }
                        <p className=' p-3  rounded-lg w-[70%] bg-white'>
                            <span className='cursor-pointer text-sm border border-black p-1 rounded-md'>You're signed In as: <Link className='hover:underline' to='/profile'>@{currentUser.username}</Link> </span>
                        </p>

                    </form>
                ) :
                (
                    <p className='mt-5 mb-5 p-3 border border-black rounded-lg w-[70%] bg-white flex justify-center'>
                        <Link className='hover:underline' to='/sign-in'>SigIn to Comment</Link>
                    </p>

                )
            }



            {AllComments && AllComments.length!=0? 
                (
                    <div className='p-3 border border-black rounded-lg w-[70%] bg-white '>
                       
                       { AllComments.map((CurrComment,id)=>(
                            <CommentShow key={id} CurrComment={CurrComment}/>
                       ))}
                    </div>
                ) :
                ( 
                    <p className='mt-5 mb-5 p-3 border border-black rounded-lg w-[70%] bg-white flex justify-center'>
                        No Comments
                    </p>

                )
            }


        </div>
    )
}

export default CommentSection
