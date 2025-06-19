import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

function SideBar() {

    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab");

    return (
        <div className=' p-5 w-[30%]  '>

            <div className='mt-5 flex flex-col items-center gap-y-5'>
                <button onClick={() => navigate('/dashboard?tab=profile')}
                    className={`w-full bg-blue-500 text-white 
                            font-semibold  p-1 rounded-md ${tab == 'profile' ? 'bg-blue-700 border border-black' : ''} `}
                >Profile</button>

                <button onClick={() => navigate('/dashboard?tab=posts')}
                    className={`w-full bg-blue-500 text-white 
                            font-semibold  p-1 rounded-md ${tab == 'posts' ? 'bg-blue-700 border border-black' : ''} `}
                >My Posts</button>

                {currentUser?.admin == true && (<button onClick={() => navigate('/dashboard?tab=admin-dashboard')}
                    className={`w-full bg-blue-500 text-white 
                            font-semibold  p-1 rounded-md ${tab == 'admin-dashboard' ? 'bg-blue-700 border border-black' : ''} `}
                >Admin Dash</button>)
                }

            </div>
        </div>
    )
}

export default SideBar
