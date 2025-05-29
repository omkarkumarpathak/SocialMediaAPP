import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { BsChatSquareDots } from "react-icons/bs";


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
        <header className=' bg-blue-200 flex items-center'>
            <div className='w-full p-2 h-16 relative space-x-6 flex justify-start md:justify-evenly items-center '>
                <Link to='/'><span className='text-md font-semibold'>BaseNect</span></Link>

                <form onSubmit={HandleSubmitSearch}>
                    <div className='p-1 m-1 flex w-full rounded-full bg-white'>
                        <input placeholder='Search' className='rounded-xl outline-none w-full p-1 placeholder:text-sm ml-4' onChange={(e) => setSearch(e.target.value)} type="text" />
                        <button type='submit' className=' w-[20%] rounded-full text-md sm:text-sm text-white bg-blue-500'>Q</button>
                    </div>
                </form>


                <div className=' p-1 font-semibold hidden sm:flex space-x-4 justify-between'>
                    <div className='flex space-x-9'>
                        <Link to='/' className={path == '/' ? 'underline' : ''}><span>Home</span></Link>
                        <Link to='/courses' className={path == '/courses' ? 'underline' : ''}><span>Courses</span></Link>
                    </div>
                    <div>
                        {currentUser ?
                            <div className='flex space-x-8 items-center '>
                                <Link to='/dashboard?tab=profile' className={path == '/profile' ? 'underline' : ''}>
                                    <img className='h-7 w-6 rounded-full' src={currentUser?.image} alt="" /></Link>
                                <Link to='/chat/inbox' className=' text-xl' >
                                    <BsChatSquareDots className='bg-white' />
                                </Link>
                            </div>
                            :
                            <div className='flex items-center space-x-7'>
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
                        <div className='z-10 flex flex-col sm:hidden space-y-2 absolute bg-red-400 top-0 right-0 h-64 w-40 p-5'>
                            <span className='cursor-pointer' onClick={() => setHamburger(false)}>X</span>
                            <Link onClick={() => setHamburger(false)} to='/' className={path == '/' ? 'underline' : ''}><span>Home</span></Link>
                            <Link onClick={() => setHamburger(false)} to='/courses' className={path == '/courses' ? 'underline' : ''}><span>Courses</span></Link>

                            <div>
                                {currentUser ?
                                    <div className='flex flex-col space-y-2'>
                                        <Link onClick={() => setHamburger(false)} to='/dashboard?tab=profile' className={path == '/profile' ? 'underline' : ''}> Profile</Link>
                                        <Link onClick={() => setHamburger(false)} to='/chat/inbox' className={path == '/chat/inbox' ? 'underline' : ''}>Chat</Link>
                                    </div>
                                    :
                                    <div className='flex flex-col space-y-2'>
                                        <Link onClick={() => setHamburger(false)} to='/sign-in' className={path == '/sign-in' ? 'underline' : ''}><span>Log in</span></Link>
                                        <Link onClick={() => setHamburger(false)} to='/sign-up' className={path == '/sign-up' ? 'underline' : ''}><span>Sign-up</span></Link>
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
