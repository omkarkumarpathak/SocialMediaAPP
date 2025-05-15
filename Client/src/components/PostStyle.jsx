import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";

function PostStyle({ post }) {

    return (
        <div className='p-2 w-[120px] md:w-36 md:h-64 rounded-lg mb-11 mt-5 bg-red-200 border border-black'>
            <div className='flex mt-5 flex-col '>
                <img className='object-cover h-24 w-full ' src={post.image} alt="" />
                <span>{post.title}</span>

                <div className='mt-2 flex items-center gap-x-2 text-sm'>
                    <span className='flex items-center gap-x-1'><AiOutlineLike /> {post.noOfLikes}</span>
                    <span className='flex items-center gap-x-1'> <FaRegCommentDots /> 0</span>
                </div>
                <button className='bg-blue-500 mt-5 rounded-lg text-yellow-50'><Link to={`/post/${post._id}`} >view</Link></button>
            </div>

        </div>
    )
}

export default PostStyle
