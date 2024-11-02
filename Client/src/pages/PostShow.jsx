import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentSection from '../components/CommentSection';

function PostShow() {

  const [Post, setPost] = useState({});
  const [message, setMessage] = useState(null);
 
  const { PostId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {

        const res = await fetch(`/api/post/getPosts?PostId=${PostId}`);
        const data = await res.json();
        if (res.ok) {
          setPost(data.posts[0]);
        }

      }
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, [PostId])


  const deletePost = async () => {

    try {
      const res = await fetch(`/api/post/deletePost/${Post._id}/${Post.userId}/${currentUser._id}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (res.ok) {
        setPost((prev) =>
          prev.filter((post) => post._id !== PostId)
        )
        navigate('/');
      }
      if (!res.ok) {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
 
  

  return (
    <div>
      <div className='p-10 w-full bg-blue-100 flex flex-col  '>
        <div className='mt-5 mb-5 w-[70%] bg-white flex justify-center'>
          {Post && (
            <div className='mt-10 p-3 w-[90%] flex flex-col items-center'>
              <div><span className='text-2xl font-semibold'>Title: {Post.title}</span></div>
              <div className='mt-5 p-5 w-[200px] h-[200px]'>
                <img src={Post.image} alt="Not-found" />
              </div>
              <div className='mt-2 p-5'>
                <p>{Post.content}</p>
              </div>
              <div>
                <p className='mt-6'>Created By: {Post.userId}</p>
              </div>

              <div className=' mt-7 mb-5 w-[80%] flex justify-between'>
                <button onClick={deletePost} className='rounded bg-red-700 text-white text-xs font-semibold px-2 py-1'>Delete</button>
                <button className='rounded bg-red-700 text-white text-xs font-semibold px-2 py-1'>
                  <Link to={`/post/update/${PostId}`}>Update Post</Link>
                </button>

              </div>
              {
                message && (
                  <span className='mt-7 text-red-600 font-semibold text-sm'>*{message}*</span>
                )
              }
            </div>

          )}
        </div>
        <CommentSection PostId={PostId}/>
      </div>
      
    </div>
  )
}

export default PostShow
