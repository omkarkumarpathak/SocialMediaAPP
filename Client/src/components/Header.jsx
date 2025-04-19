import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";


function Header() {

    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearch] = useState('');
    const [hamburger, setHamburger] = useState(false);

    const HandleSubmitSearch = (e) => {
        e.preventDefault();
        if (searchTerm.length == 0) {
            return;
        }
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    console.log(searchTerm);

    return (
        <header className=' bg-blue-300  '>
            <div className='w-full p-2 relative  space-x-6 flex justify-start md:justify-evenly items-center '>
                <Link to='/'>Logo</Link>

                <form className='flex  ' onSubmit={HandleSubmitSearch}>
                    <input onChange={(e) => setSearch(e.target.value)} type="text" className=' rounded-lg bg-gray-100' />
                    <button type='submit' className='ml-2 bg-red-400 text-sm p-1 rounded-lg text-md sm:text-sm hover:text-white hover:bg-red-600'>search</button>
                </form>


                <div className=' p-1 font-semibold hidden sm:flex space-x-4 justify-between'>
                    <div className='flex space-x-9'>
                        <Link to='/' className={path == '/' ? 'underline' : ''}><span>Home</span></Link>
                        <Link to='/courses' className={path == '/courses' ? 'underline' : ''}><span>Courses</span></Link>
                    </div>
                    <div>
                        {currentUser ?
                            <div className='flex space-x-4'>
                                <Link to='/dashboard?tab=profile' className={path == '/profile' ? 'underline' : ''}><span>Profile</span></Link>
                                <Link to='/chat/inbox' className={path == '/chat/inbox' ? 'underline' : ''}>Chat</Link>
                            </div>
                            :
                            <div className='flex space-x-7'>
                                <Link to='/sign-in' className={path == '/sign-in' ? 'underline' : ''}><span>Log in</span></Link>
                                <Link to='/sign-up' className={path == '/sign-up' ? 'underline' : ''}><span>Sign-up</span></Link>
                            </div>
                        }
                    </div>
                </div>

                <div className='sm:hidden absolute right-12'>
                    <GiHamburgerMenu className='cursor-pointer' onClick={() => setHamburger(!hamburger)} />

                </div>

                {
                    hamburger == true ?
                        <div className='flex flex-col sm:hidden space-y-2 absolute bg-red-400 top-0 right-0 h-64 w-40 p-5'>
                            <span className='cursor-pointer' onClick={()=>setHamburger(false)}>X</span>
                            <Link  onClick={()=>setHamburger(false)} to='/' className={path == '/' ? 'underline' : ''}><span>Home</span></Link>
                            <Link  onClick={()=>setHamburger(false)} to='/courses' className={path == '/courses' ? 'underline' : ''}><span>Courses</span></Link>

                            <div>
                                {currentUser ?
                                    <div className='flex flex-col space-y-2'>
                                        <Link  onClick={()=>setHamburger(false)} to='/dashboard?tab=profile' className={path == '/profile' ? 'underline' : ''}><span>Profile</span></Link>
                                        <Link  onClick={()=>setHamburger(false)} to='/chat/inbox' className={path == '/chat/inbox' ? 'underline' : ''}>Chat</Link>
                                    </div>
                                    :
                                    <div className='flex flex-col space-y-2'>
                                        <Link  onClick={()=>setHamburger(false)} to='/sign-in' className={path == '/sign-in' ? 'underline' : ''}><span>Log in</span></Link>
                                        <Link  onClick={()=>setHamburger(false)} to='/sign-up' className={path == '/sign-up' ? 'underline' : ''}><span>Sign-up</span></Link>
                                    </div>
                                }
                            </div>
                        </div>

                        :
                        ""
                }

            </div>

        </header>
    )
}

export default Header
