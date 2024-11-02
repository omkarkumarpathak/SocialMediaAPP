import React from 'react'
import { Link } from 'react-router-dom';

function PostStyle({ post }) {

    return (
        <div className='p-2  w-[120px] rounded-lg mt-5 bg-red-200 border border-black'>
            <div className='flex mt-5 flex-col'>
                <img className='object-cover w-full h-full' src={post.image} alt="" />
                <span>{post.title}</span>
                <button className='bg-blue-500 mt-5 rounded-lg text-yellow-50'><Link to={`/post/${post._id}`} >view</Link></button>
            </div>

        </div>
    )
}

export default PostStyle
