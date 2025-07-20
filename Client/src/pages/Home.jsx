import { useEffect, useState } from 'react'
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
  const [allLoaded, setAllLoaded] = useState(false);
  const [skip, setSkip] = useState(0);

  const limit = 4;

  console.log(allLoaded);

  const getPosts = async (skipCount) => {
    try {
      const res = await fetch(`/api/post/getPosts?skip=${skipCount}&limit=${limit}`);
      const data = await res.json();

      //console.log();

      if (data.posts.length < limit) {
        setAllLoaded(true);
      }

      if (res.ok) {
        setPosts(prevPosts => [...prevPosts, ...data.posts]);
        setSkip(prev => prev + data.posts.length);
      }
    } catch (error) {
      console.log(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts(0);
  }, [])

  const handleLoadMore = () => {
    if (!allLoaded) {
      getPosts(skip);
    }
  };

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
      {
        !allLoaded && (
          <button disabled={allLoaded} onClick={handleLoadMore} className='m-5 bg-blue-600 text-white rounded-lg p-2 font-semibold'>Load More...</button>
        )
      }
    </section>
  )
}

export default Home
