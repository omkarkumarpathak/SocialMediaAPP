import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PostStyle from '../components/PostStyle';


function SearchPage() {

    const [posts, setPosts] = useState();
    const [filter, setFilter] = useState({
        searchTerm: '',
        sortBy: 'desc',
    })

    const location = useLocation();
    const navigate = useNavigate();

    console.log(filter);

    useEffect(() => {

        const urlParam = new URLSearchParams(location.search);
        const searchTerm = urlParam.get('searchTerm');
        const sortBy = urlParam.get('sortBy');

        if (searchTerm || sortBy) {
            setFilter({
                ...filter,
                searchTerm: searchTerm || '',
                sortBy: sortBy || 'desc'
            })
        }

        const fetchPosts = async () => {
            try {

                const searchQuery = urlParam.toString();
                const res = await fetch(`/api/post/getPosts?${searchQuery}`);
                const data = await res.json();
                if (res.ok) {
                    setPosts(data.posts);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts();
    }, [location.search])

    console.log(posts);

    const handleFilterChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setFilter({ ...filter, searchTerm: e.target.value })
        }

        if (e.target.id === 'sortBy') {
            setFilter({ ...filter, sortBy: e.target.value })
        }
    }

    const SearchFilter = () => {
        const urlParam = new URLSearchParams(location.search);
        urlParam.set('searchTerm', filter?.searchTerm);
        urlParam.set('sortBy', filter?.sortBy);
        const searchQuery = urlParam.toString();
        navigate(`/search?${searchQuery}`);

    }

    //  console.log(posts);
    return (
        <div className=' flex w-full'>
            <div className='p-5 flex flex-col space-y-5 w-[30%] bg-gray-300 h-screen'>
                Sidebar
                <input type="text" value={filter.searchTerm} id='searchTerm' onChange={handleFilterChange} />
                <select onChange={handleFilterChange} value={filter.sortBy} name="" id="sortBy">
                    <option value='desc'  >Desc</option>
                    <option id='asce'>Asce</option>
                </select>
                <button onClick={SearchFilter}>Search Filter</button>
            </div>
            <div className='p-8 m-5 w-full'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {
                        posts?.map((post, idx) => {
                            return <PostStyle post={post} />
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default SearchPage
