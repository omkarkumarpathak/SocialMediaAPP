import React, { useContext, useState } from 'react'
import VerifyOTP from './verifyOTP';
import { RecoveryContext } from '../../pages/PasswordChange/PasswordReset';


function LoginEmail() {

    const { email, setEmail, OTP, setOTP } = useContext(RecoveryContext);

    const [Error, setError] = useState();
    const [OtpSending, setOtpSending] = useState(false);

    const createAndSetOTP = () => {
        const RandomOTP = Math.floor(Math.random() * 9000 + 1000);
        return RandomOTP;
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!email) {
            return alert("Enter your email first");
        }

        const randomOTP = createAndSetOTP();

        try {

            setOtpSending(true);
            const res = await fetch('/api/user/sendMail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    otp: randomOTP
                })
            })

            const data = await res.json();

            if (res.ok) {
                setOTP(randomOTP);
                console.log("sent otp to mail successfully");
            }
            if (!res.ok) {
                setError(data.error);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setOtpSending(false);
        }
    }

    if (email && OTP) {
        return <VerifyOTP />
    }

    return (
        <div className='h-screen w-full flex justify-center  '>
            <div className='p-8  w-[40%] h-[60%] border
                     border-gray-600 rounded-2xl mt-28
                             flex flex-col justify-center items-center'>

                <span>BaseNect</span>
                <h5 className='mt-8 font-semibold'>Trouble logging in?</h5>
                <form onSubmit={handleSubmit} className='w-full p-3.5 flex flex-col'>

                    <p className='mt-3 text-sm text-center mb-3'>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>

                    <div className='w-full flex flex-col mt-3'>
                        <input className='border border-gray-400 
                                 flex-1 p-2 rounded-lg 
                                 placeholder:text-sm text-sm  placeholder:p-3'
                            type="text" id='email' placeholder='Enter your Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {
                        OtpSending == false ?
                            <button type='submit'
                                className='bg-blue-700 text-sm text-white p-2 mt-9 hover:bg-red-800'
                            >Send OTP</button>
                            :
                            <button type='submit' disabled={OtpSending}
                                className='bg-blue-700 cursor-not-allowed text-sm opacity-60 font-bold text-white p-2 mt-9 '
                            >Sending...</button>
                    }

                </form>
                {
                    Error && (
                        <p className='text-red-600 text-sm'>*{Error}</p>
                    )
                }
            </div>
        </div>
    )
}

export default LoginEmail
