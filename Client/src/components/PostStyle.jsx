import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


function PostStyle({ post }) {

    return (
        <div className='m-3 overflow-hidden rounded-lg mb-11 mt-5 bg-red-200 border border-black'>
            <div className='flex flex-col justify-between items-center'>
                <img className='h-60 text-center object-cover' src={post.image} alt="" />

                <div className='px-5 py-2 w-full bg-white flex flex-col '>
                    <span>{post.title}</span>

                    <div className=' mt-6 w-[90%] flex items-center justify-between text-sm'>
                        <span className='flex items-center gap-x-1'><AiOutlineLike /> {post.noOfLikes}</span>
                        <span className='flex items-center gap-x-1'> <FaRegCommentDots /> 0</span>
                        <span className='flex items-center gap-x-1'> <FaEye />{post.views} </span>

                    </div>
                    <button className='bg-blue-500 mb-5 w-full hover:bg-blue-800 transition duration-200 mt-5 rounded-lg text-yellow-50'><Link to={`/post/${post._id}`} >view</Link></button>

                </div>
            </div>

        </div>
    )
}

export default PostStyle
