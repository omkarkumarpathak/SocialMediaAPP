import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';


function Header() {

    const path = useLocation().pathname;
    const location=useLocation();
    const navigate=useNavigate();

    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearch]=useState('');

    const HandleSubmitSearch=(e)=>{
        e.preventDefault();
        if(searchTerm.length==0){
            return;
        }
        const urlParams=new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery=urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    console.log(searchTerm);

    return (
        <header className='w-full bg-blue-300 flex justify-center h-16 items-center'>
            <div className='flex items-center justify-between w-[85%] '>
                <Link to='/'>Logo</Link>

                <form onSubmit={HandleSubmitSearch}>
                    <input onChange={(e)=>setSearch(e.target.value)}  type="text"  className='p-1 rounded-lg bg-gray-100'/>
                    <button type='submit' className='ml-2 bg-red-400 text-sm p-1 rounded-lg hover:text-white hover:bg-red-600'>search</button>
                </form>
                
                <div className='flex font-semibold w-[50%] text-sm md:text-md justify-between'>
                    <div className='flex space-x-9'>
                        <Link to='/' className={path == '/' ? 'underline' : ''}><span>Home</span></Link>
                        <Link to='/courses' className={path == '/courses' ? 'underline' : ''}><span>Courses</span></Link>
                    </div>
                    <div >
                        {currentUser ?
                            <div className='flex space-x-4'>
                                <Link to='/dashboard?tab=profile' className={path == '/profile' ? 'underline' : ''}><span>Profile</span></Link>
                                <Link to='/chat/inbox' className={path == '/chat/inbox' ? 'underline' : ''}>Chat</Link>
                            </div>
                            :
                            <div className='flex space-x-6'>
                                <Link to='/sign-in' className={path == '/sign-in' ? 'underline' : ''}><span>Log in</span></Link>
                                <Link to='/sign-up' className={path == '/sign-up' ? 'underline' : ''}><span>Sign-up</span></Link>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header
