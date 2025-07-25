import React from 'react'
import PostStyle from './PostStyle';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function MyPosts() {

    const [Posts, setPosts] = useState([]);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {

        const fetchPosts = async () => {
            const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}`);
            const data = await res.json();
            if (data.posts) {
                setPosts(data.posts);
            }
        }
        fetchPosts();

    }, [])
    return (
        <div className='w-full h-screen p-8 '>
            <h1 className=' text-xl font-semibold text-center'>My Posts</h1>
            <div className='bg-red-50 mt-10 rounded-lg flex flex-col space-x-4 justify-center '>

                <div className='p-10 flex space-x-8 ' >
                    {
                        Posts && Posts.length>0 ?
                        (
                            Posts.map((post, idx) => (
                                <PostStyle key={idx} post={post} />
                            ))
                        )
                        :
                        (
                            <span className='w-full text-center'>No Posts</span>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default MyPosts
