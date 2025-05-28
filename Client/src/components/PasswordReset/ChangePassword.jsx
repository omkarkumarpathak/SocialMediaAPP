import React, { useContext, useState } from 'react'
import { RecoveryContext } from '../../pages/PasswordChange/PasswordReset'
import {useNavigate} from 'react-router-dom';

function ChangePassword() {
    const { email } = useContext(RecoveryContext);

    const [pass, setPass] = useState('');

    const navigate=useNavigate();
    const handlePassword = async (e) => {

        e.preventDefault();

        if (!pass || pass.length < 4) {
            return alert("Password should be >5 chars");
        }

        try {

            const res = await fetch(`/api/user/updatePassword/${email}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({password:pass}),
            });

            const data = await res.json();

            if(res.ok){
                alert("Password Changed Successfully");
                setTimeout(2000, navigate('/sign-in'));
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='h-screen w-full flex justify-center  '>
            <div className='p-8  w-[40%] h-[60%] border
                     border-gray-600 rounded-2xl mt-28
                             flex flex-col justify-center items-center'>

                <span>BaseNect</span>
                <h5 className='mt-8 font-semibold'>Change Your Password</h5>
                <form onSubmit={handlePassword} className='w-full p-3.5 flex flex-col'>

                    <p className='mt-3 text-sm text-center mb-3'>
                        New Password enter:</p>

                    <div className='w-full flex flex-col mt-3'>
                        <input className='border border-gray-400 
                                 flex-1 p-2 rounded-lg 
                                 placeholder:text-sm text-sm  placeholder:p-3'
                            type="text" id='email' placeholder='Enter your Password'
                            onChange={(e) => setPass(e.target.value)}

                        />
                    </div>

                    <button type='submit'
                        className='bg-blue-700 text-sm text-white p-2 mt-9 hover:bg-red-800'
                    >Change</button>
                </form>

            </div>
        </div>
    )
}

export default ChangePassword
