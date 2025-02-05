import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signInFailure,signInSuccess,signInStart } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
function LogIn() {

  const [formData,setFormData]=useState({});
  const {error} =useSelector((state)=>state.user);
 

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const onChange=(e)=>{
    setFormData({...formData, [e.target.id]:e.target.value});
  }

  const HandleSubmit=async(e)=>{
    e.preventDefault();

    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Fill all fields'));
    }

    try {
      
      dispatch(signInStart());
      const res=await fetch('/api/auth/signIn',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      })

      const data=await res.json();

      if(data.success==false){
        return dispatch(signInFailure(data.message)); //data will fill payload in reducer
      }

      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      return dispatch(signInFailure("UnAuthorized"));
    }

  }
  return (
    <div className='h-screen bg-red-100 w-full flex justify-center '>
      <div className='p-3  w-[50%] h-[65%] bg-blue-300 mt-28 flex flex-col items-center'>
        <h1 className='text-3xl font-semibold'>Sing In</h1>
        <form className='w-full p-4 mt-5 flex flex-col'>
          
          <div className='w-full flex flex-col mt-3'>
            <label name='email'>Email</label>
            <input onChange={onChange} className='flex-1 p-1' type="text" id='email' />
          </div>

          <div className='w-full flex flex-col  mt-3'>
            <label name='password'>Password</label>
            <input onChange={onChange} className='flex-1 p-1'type="text" id='password'/>
          </div>

          <button onClick={HandleSubmit}  type='submit' className='bg-red-700 text-white p-2 mt-9 hover:bg-red-800'>LogIn</button>
          <OAuth/>

          <p className='mt-4'><span  className=' text-blue-900'>Don't have account?</span> <Link className='hover:underline' to='/sign-up'>Sign Up</Link></p>
          {error? <span className='text-red-600 text-center mt-4 font-semibold'>
            *{error}*</span>:null
           }
        </form>
        
      </div>
    </div>
  )
}

export default LogIn
