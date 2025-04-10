import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

function SideBar() {

    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className='h-screen p-5 w-[30%] bg-teal-100 '>

            <div className='mt-5 flex flex-col items-center gap-y-5'>
                <button onClick={() => navigate('/dashboard?tab=profile')} className='w-full bg-gray-300 p-1 rounded-md' >Profile</button>
                <button onClick={() => navigate('/dashboard?tab=posts')} className='w-full bg-gray-300 p-1 rounded-md'>My Posts</button>
                {currentUser?.admin==true && (<button onClick={() => navigate('/dashboard?tab=admin-dashboard')} className='w-full bg-gray-300 p-1 rounded-md'>Admin Dash</button>)
                }
            </div>
        </div>
    )
}

export default SideBar
