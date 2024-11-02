import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

function SignUp() {

  const [form,setFormData]=useState({});
  const [Errormessage, setErrorMessage]=useState(null);

  const navigate=useNavigate();

  const onChange=(e)=>{
    setFormData({...form,[e.target.id]:e.target.value.trim()});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    if(!form.username || !form.password || !form.email){
      return setErrorMessage('Enter All fields');
    }

    try {
      const res=await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(form),
      })
  
      const data=await res.json();
      if(data.success==false){
        return setErrorMessage(data.message);
      }
      if(res.ok){
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  console.log(form);

  return (
    <div className='h-screen bg-red-100 w-full flex justify-center '>
      <div className='p-3  w-[50%] h-[60%] bg-blue-300 mt-28 flex flex-col items-center'>
        <h1 className='text-3xl font-semibold'>Sign Up</h1>
        <form className='w-full h-full p-4 mt-5 flex flex-col'>

          <div className='w-full flex flex-col mt-3'>
            <label name='username'>Username</label>
            <input onChange={onChange}  className='flex-1 p-1' type="text"  id='username'/>
          </div>

          <div className='w-full flex flex-col mt-3'>
            <label name='email'>Email</label>
            <input onChange={onChange} className='flex-1 p-1' type="text" id='email' />
          </div>

          <div className='w-full flex flex-col  mt-3'>
            <label name='password'>Password</label>
            <input onChange={onChange} className='flex-1 p-1' type="text" id='password' />
          </div>

          <button type='submit' onClick={handleSubmit} className='bg-red-800 text-white p-2 mt-9'>SignUp</button>
          {
            Errormessage? <span>{Errormessage}</span>: null
          }

        </form>
      </div>
    </div>
  )
}

export default SignUp

