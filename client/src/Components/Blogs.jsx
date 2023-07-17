import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Blog from './Blog'

const Blogs = () => {
    const [blogData, setBlogData] = useState(null)

    useEffect(() => {
        axios.get('/api/blog').then((response) => {
            setBlogData(response.data);
        })
    }, [])
    useEffect(() => {
        console.log(blogData);
    }, [blogData])
    return (
        <main>
            {blogData &&
                blogData.blogs.map((blog) => (
                    <Blog key={blog.id} data={blog} />
                ))
            }
        </main>
    )
}

export default Blogs