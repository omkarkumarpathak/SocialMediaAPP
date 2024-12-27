import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase.js'



function CreatePost() {

    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState(null);
    const [uploadImageMessage, setUploadImageMessage] = useState(null);
    const [uploadImageProgress, setUploadImageProgress] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const navigate = useNavigate();
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    console.log(formData);

    const handleImageUpload = async (e) => {
        e.preventDefault();

        try {
            if (!imageFile) {
                setUploadImageMessage('Upload Image first');
                return;
            }
            const fileName = new Date().getTime() + '-' + imageFile.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadImageProgress(progress.toFixed(0) + '%');
                    console.log(progress.toFixed(0))
                },
                (error) => {
                    setUploadImageMessage('Image Uploading failed');
                    setUploadImageProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUploadImageMessage(null);
                        setUploadImageProgress(null);
                        setFormData({ ...formData, image: downloadURL });
                    })
                }
            )

        } catch (error) {
            setUploadImageMessage('Image Uploading error');
            setUploadImageProgress(null);
            console.log(error);
        }
    }
    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content) {
            return setMessage('Fill all fields');
        }


        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message);
            }
            if (res.ok) {
                setMessage('Successfully created');
                navigate('/');
            }

        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <div className='h-screen bg-red-100 w-full flex justify-center '>
            <div className='p-3  w-[50%]  bg-blue-300 mt-28 flex flex-col items-center'>
                <h1 className='text-3xl font-semibold'>Create Post</h1>
                <form className='w-full h-full p-4 mt-5 flex flex-col'>

                    <div className='w-full flex flex-col mt-3'>
                        <label name='title'>Title of Post</label>
                        <input onChange={onChange} className='flex-1 p-1' type="text" id='title' />
                    </div>

                    <div className='w-full flex flex-col  mt-3'>
                        <label name='content'>Content</label>
                        <textarea onChange={onChange} className='flex-1 p-1' type="text" id='content' />
                    </div>

                    <div className=' mt-3'>
                        
                        <label name='image'>Image</label>
                        <div className='flex w-full '>
                            <input className='mt-2' type="file" accept='image' id='image'
                                onChange={(e) => setImageFile(e.target.files[0])} />
                            <button onClick={handleImageUpload} className='bg-red-400 rounded-lg text-xs '>Upload image</button>
                        </div>

                    </div>

                    { message && ( <span>{message}</span> )  }

                    { uploadImageMessage && ( <span>{uploadImageMessage}</span>)}

                    <button onClick={HandleSubmit} type='submit' className='bg-red-800 text-white p-2 mt-9'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
