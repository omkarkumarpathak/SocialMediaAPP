import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice.js';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase.js'

function Profile() {

  const [edit, setEdit] = useState(true);

  const [ProfileData, setProfileData] = useState({});
  const [updateMessage, setUpdateMessage] = useState(null);

  const [profileImage, setProfileImage] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState(null);
  const [ProfileImageMessage, setProfileImageMessage] = useState(null);
  const [ProfileImageError, setProfileImageError] = useState(null);

  const { currentUser, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imagePicker = useRef();

  const signOut = async () => {
    try {
      const res = await fetch('/api/user/signOut', {
        method: 'POST'
      })

      const data = await res.json();

      if (res.ok) {
        dispatch(signOutSuccess());
        navigate('/')
      }
      else {
        console.log(data.message)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateUserStart();
      if (Object.keys(ProfileData).length == 0) {
        return dispatch(updateUserFailure('No changes observed'));
      }

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ProfileData)
      })

      const data = await res.json();

      if (data.success == false) {
        return dispatch(updateUserFailure(data.message)); //data will fill payload in reducer
      }

      if (res.ok) {
        dispatch(updateUserSuccess(data));
        setUpdateMessage("Successfully Changed")
        setProfileImage(null);
      }
    } catch (error) {
      return dispatch(signInFailure("UnAuthorized"));
    }
  }
  const onChange = (e) => {
    setProfileData({ ...ProfileData, [e.target.id]: e.target.value.trim() });
  }

  const DeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })

      const data = await res.json();

      if (res.ok) {
        dispatch(deleteUserSuccess(data));
        navigate('/');
      }
      else {
        dispatch(deleteUserFailure(data.message));
        setUpdateMessage(data.message)
      }

    } catch (error) {
      setUpdateMessage(error.message)
    }
  }

  useEffect(() => {

    const uploadProfileImage = async () => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + profileImage.name;
      const storageRef = ref(storage, fileName);

      const UploadTask = uploadBytesResumable(storageRef, profileImage);

      UploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //toFixed means no decimal
          setProfileImageMessage(progress.toFixed(0));

        },
        (error) => {
          setProfileImageError(error);
        },
        () => {
          getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {

            setProfileImageURL(downloadURL);
            setProfileData({ ...ProfileData, image: downloadURL });
            setProfileImageMessage(false);

          });
        }
      )

    }
    if (profileImage) uploadProfileImage();

  }, [profileImage])


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImageURL(URL.createObjectURL(file));
    }
  }

  return (
    <div className='h-screen w-full mb-14 bg-teal-50 flex flex-col  items-center'>
      <div className=' mt-24 p-10 border border-black rounded-lg bg-blue-50 w-[90%] md:w-[50%]  flex flex-col space-y-4 items-center'>

        <input type="file" accept='image/*' ref={imagePicker} onChange={handleImageChange} hidden />
        {
          ProfileImageError && (
            <span className='mt-2 text-red-600 font-semibold text-sm'>{ProfileImageError}</span>
          )
        }
        {
          ProfileImageMessage && (
            <span className='mt-2 text-red-600 font-semibold text-sm'>Uploading: {ProfileImageMessage} %</span>
          )
        }
        <div className='w-20'>
          <img className='h-18 w-18 rounded-full cursor-pointer'
            src={profileImageURL || currentUser.image}
            alt="hi" onClick={() => { imagePicker.current.click(); setEdit(!edit) }}
          />
        </div>
        <form action="" className='w-full space-y-2' >
          <div className='flex flex-col'>
            <label className='text-sm font-semibold' name='username'>Username</label>
            <input className=' mt-2 p-2 rounded-md border border-teal-400 *:' id='username' onChange={onChange} type="text" placeholder={currentUser.username} disabled={edit} />
          </div>

          <div className='flex flex-col'>
            <label className='text-sm font-semibold' name='password'>Password</label>
            <input className='mt-2 p-2 rounded-md border border-teal-400 *:' id='password' onChange={onChange} type="text" placeholder="password" disabled={edit} />
          </div>


          <div className='mt-3 flex flex-col'>

            <label className='text-sm font-semibold' name='email'>Email</label>
            <input className='mt-2 p-2 rounded-md border border-teal-400 *:' id='email' onChange={onChange} type="text" placeholder={currentUser.email} disabled={edit} />

            <span className='mt-5 flex justify-between'>Want to edit?
              {edit && (<button type='button' onClick={() => setEdit(!edit)} className='text-blue-600 font-semibold underline'>
                "Edit"
              </button>)
              }
              {!edit && (<button type='submit' onClick={handleSubmit}
                disabled={ProfileImageMessage} className={` font-semibold underline ${ProfileImageMessage ? 'text-blue-200' : 'text-blue-600'}`}>
                Submit
              </button>
              )

              }

            </span>
            {error && (
              <span className='mt-2 text-red-600 font-semibold text-sm'>{error}</span>
            )}
            {updateMessage && (
              <span className='mt-2 text-red-600 font-semibold text-sm'>{updateMessage}</span>
            )}

          </div>
          <div className=' flex justify-between'>
            <button onClick={signOut}><span className='bg-gray-500 w-full p-1 rounded-md text-white text-xs font-semibold'> Log-Out</span></button>
            <button type='button' onClick={DeleteUser}><span className='bg-gray-500 w-full p-1 rounded-md text-white text-xs font-semibold'> Delete Account</span></button>
          </div>

        </form>

        <div className='w-full mb-20 p-1 bg-blue-500 hover:bg-blue-700 cursor-pointer rounded-lg'>
          <Link to='/create-post'>
            <div className='rounded-md text-center text-white text-sm font-semibold'>Create Post</div>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Profile;
