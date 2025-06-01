import React, { useContext, useEffect, useRef, useState } from 'react'

import { RecoveryContext } from '../../pages/PasswordChange/PasswordReset';
import ChangePassword from './ChangePassword';


function VerifyOTP() {
    const { OTP } = useContext(RecoveryContext);

  //  console.log(OTP);

    const [otp, setOTP] = useState(new Array(4).fill(""));
    const [combinedOTP, setCombinedOTP] = useState('');
    const [LoadChangePass, setLoadChangePass] = useState(false);

    const [timeLeft, setTimeLeft] = useState(60);
    const [canClick, setCanClick] = useState(false);

    useEffect(() => {
        if (timeLeft === 0) {
            setCanClick(true);
            return;
        }
        const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timerId);
    }, [timeLeft])


    const inputRef = useRef([]);
    const handleChange = (idx, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[idx] = value.substring(value.length - 1);
        setOTP(newOtp);

        const combinedOTP = newOtp.join("");
        if (combinedOTP.length == 4) {
            setCombinedOTP(combinedOTP);
        }
        if (value && idx < 4 && inputRef.current[idx + 1]) {
            inputRef.current[idx + 1].focus();
        }

    }

    const handleKeyDown = (idx, e) => {
        if (e.key === 'Backspace' && !otp[idx] && idx > 0 && inputRef.current[idx - 1]) {
            inputRef.current[idx - 1].focus();
        }
    }

    const verifyOTP = () => {

        const enteredOTP = otp.join('');
        if (OTP != enteredOTP) {
            return alert("Invalid OTP");
        }
        else setLoadChangePass(true);
    }



    if (LoadChangePass == true) return <ChangePassword />

    return (
        <div className='h-screen  flex flex-col items-center'>

            <div className='p-6 rounded-md  mt-32 bg-blue-100 border border-black'>

                <h4 className='text-center mb-8'>ENTER OTP</h4>
                <div >
                    {
                        otp.map((value, idx) => (
                            <input className='h-10 w-10 text-center border border-black mr-2 rounded-md' type="text" key={idx} value={value}
                                placeholder='*'
                                ref={(input) => (inputRef.current[idx] = input)}
                                onChange={(e) => handleChange(idx, e)}
                                onKeyDown={(e) => handleKeyDown(idx, e)}
                            />
                        ))
                    }
                </div>
                <button onClickCapture={verifyOTP} className='hover:bg-red-600 text-center bg-blue-500 p-1 w-full mt-10 text-white  rounded-lg text-sm'>Submit</button>

                {
                    canClick == false ?
                        <p className='text-center text-sm mt-5 cursor-not-allowed opacity-60 '>
                            <span>Resend OTP in</span> {timeLeft} Sec
                        </p>
                        :
                        <p className='text-center text-sm mt-5 hover:underline cursor-pointer '>
                            Resend OTP
                        </p>
                }

            </div>


        </div>
    )
}

export default VerifyOTP
