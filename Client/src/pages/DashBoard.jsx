import { useEffect, useState } from 'react';
import MyPosts from '../components/MyPosts.jsx';
import { useLocation } from 'react-router-dom';
import Profile from '../components/Profile.jsx';
import SideBar from '../components/SideBar.jsx';
import AdminDash from '../components/AdminDash.jsx';

function DashBoard() {

  const location = useLocation();
  const [tab, setTab] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])

  return (
    <>
      <div className='flex w-full '>
        <SideBar/>
        {tab && tab == 'profile' && <Profile />}
        {tab && tab == 'posts' && <MyPosts />}
        {tab && tab == 'admin-dashboard' && <AdminDash />}
      </div>

    </>

  )
}

export default DashBoard;
