import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Blog from './Blog'
import Skeletonloader from './Skeletonloader'
import { AuthContext } from '../Context/authContext'

const Blogs = () => {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [blogData, setBlogData] = useState(null)
    useEffect(() => {
        if (user) {
            axios.get('/api/blog').then((response) => {
                setBlogData(response.data);
                setLoading(false)
            })
        }
    }, [user])

    return (
        <main style={{
            width: '70%'
        }}>
            {loading ? (
                <>
                    <Skeletonloader type='view' />
                    <Skeletonloader type='view' />
                    <Skeletonloader type='view' />
                </>
            )
                :
                blogData.blogs.map((blog) => (
                    <Blog key={blog.id} data={blog} />
                ))
            }
        </main>
    )
}

export default Blogs