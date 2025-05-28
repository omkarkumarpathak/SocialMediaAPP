import React, { useEffect, useState } from 'react'
import PostStyle from '../components/PostStyle';
import Spinner from '../components/Spinner';

function Home() {

  const [posts, setPosts]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{

    const getPosts=async(req,res)=>{
      try {
         const res=await fetch('/api/post/getPosts');
         const data= await res.json();
         if(res.ok){
          setPosts(data.posts);
          setLoading(false);
         }
      } catch (error) {
        console.log(error.message);
      }
    }

    getPosts();

  },[])

  if(loading) return <Spinner/>

  return (
    <div className='w-full flex justify-center' >
      <div className='p-5 w-[85%]'>
        {posts && (
          
          <div className='rounded-md p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-100'>
            {posts.map((post,idx)=>(
              <PostStyle key={idx} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
