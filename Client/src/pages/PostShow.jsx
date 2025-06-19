import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentSection from '../components/CommentSection';
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import Spinner from '../components/Spinner';

function PostShow() {

  const [Post, setPost] = useState({});
  const [User, setUser] = useState();
  const [message, setMessage] = useState(null);

  const { PostId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);


  console.log(User);
  console.log(Post);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getPosts?PostId=${PostId}`);
        const data = await res.json();
        if (res.ok && data.posts[0]) {
          setPost(data.posts[0]);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    if (PostId) fetchPost();
  }, [PostId]);

  //Second useEffect: Fetch user when post is ready
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (Post?.userId) {
          const res = await fetch(`/api/user/${Post.userId}`);
          const data = await res.json();
          if (res.ok) {
            setUser(data);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [Post]);


  const deletePost = async () => {

    try {
      const res = await fetch(`/api/post/deletePost/${Post._id}/${Post.userId}/${currentUser._id}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/');
      }
      if (!res.ok) {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLike = async () => {

    if (!currentUser) {
      return setMessage("Please Sign in first to Like");
    }

    try {
      const res = await fetch(`/api/post/likedPost/${Post._id}`, {
        method: 'PUT'
      })

      const data = await res.json();

      if (res.ok) {
        setPost({ ...Post, likes: data.likes, noOfLikes: data.noOfLikes });

      }

    } catch (error) {
      console.log(error);
    }

  }

  if (loading) return <Spinner />

  return (
    <div>

      <div className='p-10 w-full flex flex-col justify-center items-center '>
        <div className='mt-5 mb-5 w-[70%] bg-gray-100 flex justify-center'>
          {Post && (
            <div className='mt-10 p-3 w-[90%] flex flex-col items-center'>
              <div className='flex flex-col justify-center items-center'>
                <span className='text-2xl font-semibold'>Title: {Post.title}</span>
                <span>Views:{Post.views}</span>
              </div>
              <div className='mt-5 p-5 '>
                <img className='h-90 w-90' src={Post.image} alt="Not-found" />
              </div>
              <div className='mt-2 p-5'>
                <p>{Post.content}</p>
              </div>
              <div>
                <p className='mt-6 underline'>Created By: {User?.username}</p>
              </div>

              <div className=' mt-7 mb-5 w-[80%] flex justify-between'>

                {
                  (Post.userId == currentUser?._id || currentUser?.admin == true) && <button onClick={deletePost}
                    className='rounded bg-red-700 text-white text-xs font-semibold px-2 py-1'>
                    Delete</button>
                }


                {
                  (Post.userId == currentUser?._id || currentUser?.admin == true) && (<button className='rounded bg-red-700 text-white text-xs font-semibold px-2 py-1'>
                    <Link to={`/post/update/${PostId}`}>Update Post</Link>
                  </button>)
                }

              </div>
              {
                message && (
                  <span className='mt-7 text-red-600 font-semibold text-sm'>*{message}*</span>
                )
              }
            </div>

          )}
        </div>
        <div onClick={handleLike} className='w-[50%]  rounded-2xl p-3 bg-red-50 flex items-center gap-1 text-xl' >
          <span>Likes</span>
          <div className='cursor-pointer'>{Post?.likes?.includes(currentUser?._id) ? <AiFillLike /> : <AiOutlineLike />}</div>
          {Post.noOfLikes}
        </div>

      </div>
      <CommentSection PostId={PostId} />
    </div>
  )
}

export default PostShow
