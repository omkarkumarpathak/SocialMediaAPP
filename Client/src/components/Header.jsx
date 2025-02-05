import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';


function Header() {

    const path = useLocation().pathname;
    const { currentUser } = useSelector((state) => state.user);

    return (
        <header className='w-full bg-blue-300 flex justify-center h-14 items-center'>
            <div className='flex justify-between w-[85%] '>
                <Link to='/'>Logo</Link>
                <div className='flex font-semibold w-[50%] text-sm md:text-md justify-between'>
                    <div className='flex space-x-9'>
                        <Link to='/' className={path == '/' ? 'underline' : ''}><span>Home</span></Link>
                        <Link to='/blog' className={path == '/blog' ? 'underline' : ''}><span>Blog</span></Link>
                        <Link to='/courses' className={path == '/courses' ? 'underline' : ''}><span>Courses</span></Link>
                    </div>
                    <div >
                        {currentUser ?
                            <div className='flex space-x-4'>
                                <Link to='/profile' className={path == '/profile' ? 'underline' : ''}><span>Profile</span></Link>
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
