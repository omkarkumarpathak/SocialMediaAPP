import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React from 'react'
import {app} from '../../firebase'
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const auth=getAuth(app);

    const handleGoogleClick=async()=>{
    
        const provider=new GoogleAuthProvider ();
        provider.setCustomParameters({prompt:'select_account'})
    
        try {
            const googleResponse=await signInWithPopup(auth,provider);
            const res=await fetch('/api/auth/google',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:googleResponse.user.displayName,
                    email:googleResponse.user.email,
                    googlePhotoUrl:googleResponse.user.photoURL,
                }),
            })

            const data=await res.json()
            if(res.ok){
               dispatch(signInSuccess(data));
               navigate('/');
            }

        } catch (error) {
          console.log(error);
        }
      }
  return (
    <div>
      <button onClick={handleGoogleClick} className='bg-orange-600 w-full text-white p-2 mt-9 hover:bg-orange-700'  type='button' >Sign-In with Google</button>
       
    </div>
  )
}
