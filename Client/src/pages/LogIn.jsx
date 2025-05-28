import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInSuccess, signInStart } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
function LogIn() {

  const [formData, setFormData] = useState({});
  const { error } = useSelector((state) => state.user);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Fill all fields'));
    }

    try {

      dispatch(signInStart());
      const res = await fetch('/api/auth/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json();

      if (data.success == false) {
        return dispatch(signInFailure(data.message)); //data will fill payload in reducer
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      return dispatch(signInFailure("UnAuthorized"));
    }

  }
  return (
    <div className='h-screen bg-red-100 w-full flex justify-center '>
      <div className='p-3 rounded-lg border border-black w-[50%] h-[80%] bg-blue-300 mt-20 flex flex-col items-center'>

        <span className='text-xl mt-6 font-semibold'>Log in to BaseNect</span>

        <form className='w-full p-4 flex flex-col items-center justify-center'>

          <div className='w-full flex flex-col mt-3'>
            <label name='email'>Email</label>
            <input onChange={onChange}
              className='flex-1 p-1 mt-1 rounded-md placeholder:p-2 placeholder:text-sm placeholder:text-gray-400'
              placeholder='Enter Your Email' type="text" id='email' />
          </div>

          <div className='w-full flex flex-col  mt-3'>
            <label name='password'>Password</label>
            <input onChange={onChange}
              className='flex-1 p-1 placeholder:p-2 placeholder:text-sm mt-1 rounded-md'
              placeholder='Enter password' type="text" id='password' />
          </div>

          <button onClick={HandleSubmit} type='submit'
            className='bg-blue-700 w-full text-white p-2 mt-9 hover:bg-red-800'
          >LogIn</button>
          <OAuth />

          <div className='mt-7 w-[80%] flex justify-center items-center flex-col lg:flex-row lg:justify-between space-y-2'>

            <span>
              Don't have account? <Link className='text-blue-950 underline ml-2' to='/sign-up'>Sign Up</Link>
            </span>

            <span className='text-blue-900 hover:text-black underline'>
              <Link to='/reset/password'>Forget Password?</Link>
            </span>
          </div>

        </form>
        {error ? <span className='text-red-600 text-center mt-4 font-semibold'>
          *{error}*</span> : null
        }

      </div>
    </div>
  )
}

export default LogIn
