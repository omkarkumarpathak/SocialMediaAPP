import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { app } from '../../firebase'
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

export default function OAuth() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);

  const handleGoogleClick = async () => {

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' })

    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: googleResponse.user.displayName,
          email: googleResponse.user.email,
          googlePhotoUrl: googleResponse.user.photoURL,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='w-full'>
      <div className="mt-6 flex items-center justify-center w-full gap-4">
        <hr className="flex-grow border-t border-black" />
        <p className="text-sm font-semibold text-black">OR</p>
        <hr className="flex-grow border-t border-black" />
      </div>
      <img src='' alt="" />
      <button onClick={handleGoogleClick}
        className='bg-orange-600 w-full text-white p-2 mt-5 hover:bg-orange-700'
        type='button' >
         Continue with Google
      </button>

    </div>
  )
}
