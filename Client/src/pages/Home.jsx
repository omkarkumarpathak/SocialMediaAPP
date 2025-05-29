import React, { useEffect, useState } from 'react'
import PostStyle from '../components/PostStyle';
import Spinner from '../components/Spinner';

// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

function Home() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getPosts = async (req, res) => {
      try {
        const res = await fetch('/api/post/getPosts');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          
        }
      } catch (error) {
        console.log(error.message);
      }
      finally{
        setLoading(false);
      }
    }

    getPosts();

  }, [])

  if (loading) return <Spinner />

  return (
    <section className='w-full flex flex-col items-center justify-center' >

      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        style={{ height: '50vh' }} // or any height you want
      >
        {posts && posts.map((post, idx) => (
          <SwiperSlide key={idx} className="w-full h-full">
            <img
              src={post.image}
              alt={`Post ${idx}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='p-5  mt-20 w-[85%]'>
        {posts && (

          <div className='rounded-md p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-100'>
            {posts.map((post, idx) => (
              <PostStyle key={idx} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Home
