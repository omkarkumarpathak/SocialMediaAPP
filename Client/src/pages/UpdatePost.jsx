import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

function UpdatePost() {

    const [formData,setFormData]=useState({});
    const [message, setMessage]=useState(null);

    const navigate=useNavigate();
    const {PostId}=useParams();

    const {currentUser}=useSelector((state)=>state.user);
    
    useEffect(()=>{
        try {
            const fetchPost=async()=>{
                const res=await fetch(`/api/post/getPosts?PostId=${PostId}`);
                const data=await res.json();
                if(res.ok){
                    setFormData(data.posts[0]);
                }
            }
            fetchPost();
        } catch (error) {
            console.log(error.message);
        }
    },[])

      
    const onChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value});
    }
    console.log(formData);

    const HandleSubmit =async (e) => {
        e.preventDefault();
        
        if(!formData.title || !formData.content){
            return setMessage('Fill all fields');
        }

          
        try {
            const res=await fetch(`/api/post/updatePost/${PostId}/${formData.userId}/${currentUser._id}`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(formData)
            })
    
            const data=await res.json();
            
            if(!res.ok){
                setMessage(data.message);
            }
            if(res.ok){
                setMessage('Successfully created');
                navigate('/');
            }

        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <div className=' bg-red-100 w-full flex justify-center '>
            <div className='p-3  w-[50%] bg-blue-300 mt-12 flex flex-col items-center'>
                <h1 className='text-3xl font-semibold'>Update Post</h1>
                <form className='w-full p-4 mt-5 flex flex-col'>

                    <div className='w-full flex flex-col mt-3'>
                        <label name='title' >Title of Post</label>
                        <input onChange={onChange} value={formData.title} className='mt-3 flex-1 px-4 py-2' type="text" id='title' />
                        
                    </div>

                    <div className='w-full flex flex-col  mt-3'>
                        <label name='content'>Content</label>
                        <textarea rows={10} onChange={onChange} value={formData.content} className='mt-3 flex-1 py-4 px-5' type="text" id='content' />
                    </div>
                    {
                        message && (
                            <span>{message}</span>
                        )
                    }

                    <button onClick={HandleSubmit} type='submit' className='bg-red-800 text-white p-2 mt-9'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePost;
