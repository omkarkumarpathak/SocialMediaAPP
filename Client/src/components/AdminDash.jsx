import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner';


function AdminDash() {

    const [AllPosts, setPosts] = useState({});
    const {currentUser}=useSelector((state)=>(state.user));
    const [loading,setLoading]=useState(true);


    useEffect(() => {

        const fetchPosts = async () => {
            try {

                const res = await fetch('/api/post/getPosts');
                const data = await res.json();
                if (res.ok) {
                    setLoading(false);
                    setPosts(data.posts);
                }

            } catch (error) {
                console.log(error);
            }

        }
        fetchPosts();

    }, [])

   // console.log(AllPosts);

    const postDelete=async(post)=>{
        try {
            const res = await fetch(`/api/post/deletePost/${post._id}/${post.userId}/${currentUser._id}`, {
                method: 'DELETE'
            });

            const data= await res.json();
            
            if(res.ok){ 
                setPosts( (prevPosts)=>prevPosts.filter(Post=>Post._id!=post._id));
            }

            if(!res.ok){
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) return <Spinner />

    return (
        <div className="h-screen overflow-x-auto p-4">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        {
                            ["title", "image", "updatedAt", "userId"].map((key) => (
                                <th key={key} className="px-10 py-3 border-r text-left">{key}</th>
                             ))
                        }
                        <th className="px-10 py-3 border-r text-left">Control</th>
                    </tr>

                </thead>
                <tbody >
                    {AllPosts.length > 0 && AllPosts.map((row, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            {
                                ["title", "image", "updatedAt", "userId"].map((key, idx) => (
                                    key === "image" ? (
                                        <td key={idx} className="px-4 py-2 border-r">
                                            <img src={row[key]} alt="img" className="h-12 w-12 object-cover" />
                                        </td>
                                    ) : (
                                        <td key={idx} className="px-4 py-2 border-r">{row[key]}</td>
                                    )
                                    ))
                            }
                            <td className='flex space-x-2 mt-6 ml-3'>
                                <button onClick={()=>postDelete(row)} className='bg-red-500 text-white p-1 rounded-md'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminDash
