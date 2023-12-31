import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../Components/Navbar';
import { formatDistance } from 'date-fns'
import { MDBBadge } from 'mdb-react-ui-kit';
import Footer from '../Components/Footer';
import Skeletonloader from '../Components/Skeletonloader';

const ReadBlogPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [blogData, setBlogData] = useState(null);

    useEffect(() => {
        axios.get(`/api/blog/fetchsingle/${id}`).then((response) => {
            console.log(response.data);
            setBlogData(response.data);
            setLoading(false)
        })
    }, [])

    return (
        <>
            <Navbar />
            {loading ? <Skeletonloader type='read' /> :
                <div className="container mt-5 pt-5">
                    <h1>{blogData.blogs.title}</h1>
                    <div className="d-flex gap-3">
                        <p className='text-capitalize'>{blogData.blogs.author.username}</p>
                        <p className='text-black-50 text-capitalize'>
                            {formatDistance(new Date(blogData.blogs.createdAt), new Date(), { addSuffix: true })}
                        </p>
                    </div>
                    <MDBBadge color='secondary' dark className='p-2 lh-sm text-capitalize'>technology</MDBBadge>
                    <br />
                    <img
                        style={{
                            width: '100%',
                            height: '400px',
                            objectFit: 'cover'
                        }}
                        src={"http://localhost:5000/" + blogData.blogs.cover}
                        alt="blog cover"
                        className='mt-5' />
                    <p className='mt-5' dangerouslySetInnerHTML={{ __html: blogData.blogs.content }} />
                </div>}
            <Footer />
        </>

    )
}

export default ReadBlogPage