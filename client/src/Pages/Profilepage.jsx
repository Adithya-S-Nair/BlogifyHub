import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Skeletonloader from '../Components/Skeletonloader';
import { formatDistance } from 'date-fns'
import { AuthContext } from '../Context/authContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
} from 'mdb-react-ui-kit';


const Profilepage = () => {
    const [value, setValue] = useState('1');
    const navigate = useNavigate()
    const token = Cookies.get('token');
    const { user, setUser } = useContext(AuthContext)
    const [userData, setUserData] = useState(null)
    const [blogData, setBlogData] = useState(null)
    const [likedBlogData, setLikedBlogData] = useState(null)
    useEffect(() => {
        if (token) {
            axios
                .get('/api/home', { withCredentials: true })
                .then((response) => {
                    console.log(response.status);
                    if (response.status === 401 || response.status !== 200) {
                        navigate('/auth');
                    } else {
                        setUser({ userId: response.data.userId, username: response.data.username });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    navigate('/auth');
                });

        } else {
            navigate('/auth')
        }
    }, []);

    useEffect(() => {
        if (user) {
            axios.get('/api/profile/')
                .then((response) => {
                    setUserData(response.data.userData)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [user])

    useEffect(() => {
        if (token) {
            axios.get('/api/blog/myblogs')
                .then((response) => {
                    setBlogData(response.data.blogs)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [])

    const handleVisibility = (blogId) => {
        axios.get(`/api/blog/showhideblog/${blogId}`)
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (token) {
            axios.get('/api/blog/likedblogs')
                .then((response) => {
                    setLikedBlogData(response.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function createData(name, calories, fat, carbs) {
        return { name, calories, fat, carbs };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24),
        createData('Ice cream sandwich', 237, 9.0, 37),
        createData('Eclair', 262, 16.0, 24),
        createData('Cupcake', 305, 3.7, 67)
    ];

    return (
        <>
            <Navbar />
            <div className='container mt-5 pt-5'>
                <TabContext value={value}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="1" label="Profile" />
                        <Tab value="2" label="My Blogs" />
                        <Tab value="3" label="Stared" />
                    </Tabs>
                    <TabPanel value="1">
                        <MDBCard
                            style={{
                                width: 'fit-content'
                            }}>
                            <MDBCardBody>
                                {userData ? <>
                                    <div className="d-flex gap-2 align-items-center">
                                        <Avatar
                                            alt={userData.username[0].toUpperCase()}
                                            src="/static/images/avatar/1.jpg"
                                            sx={{
                                                bgcolor: '#3b71ca'
                                            }} />
                                        <div className="d-flex flex-column gap-0">
                                            <MDBCardTitle className='text-capitalize text-primary mb-0'>{userData.username}</MDBCardTitle>
                                            <small>Created At :{userData.createdAt}</small>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-4">
                                        <div className="d-flex gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" style={{ width: '1em' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                            </svg>
                                            <MDBCardText>{userData.username}</MDBCardText>
                                        </div>
                                        <button className='btn btn-link text-dark rounded-pill'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1em' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>
                                    </div>
                                    <hr className='mt-1 mb-1' />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" style={{ width: '1em' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                            </svg>
                                            <MDBCardText>{userData.email}</MDBCardText>
                                        </div>
                                        <button className='btn btn-link text-dark rounded-pill'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1em' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>
                                    </div>
                                    <hr className='mt-1 mb-1' />
                                </> :
                                    <Skeletonloader type='profile' />
                                }
                                <Button size="small" className='mt-3'>Apply Changes</Button>
                            </MDBCardBody>
                        </MDBCard>
                    </TabPanel>
                    <TabPanel value="2">
                        <MDBCard className='container'>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell align="left">Posted On</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {blogData && blogData.map((blog) => (
                                        <TableRow
                                            key={blog._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {blog.title}
                                            </TableCell>
                                            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>{formatDistance(new Date(blog.createdAt), new Date(), { addSuffix: true })}</TableCell>
                                            <TableCell align="left">
                                                <div className="d-flex gap-4">
                                                    <button className='btn btn-tertiary rounded-pill text-dark' id='view-action' onClick={handleVisibility}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" style={{ width: '1.1em' }}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </button>
                                                    <button className='btn btn-tertiary rounded-pill text-dark' id='delete-action'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" style={{ width: '1.1em' }}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>
                                                    <button className='btn btn-tertiary rounded-pill text-dark' id='edit-action'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" style={{ width: '1.1em' }}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </MDBCard>
                    </TabPanel>
                    <TabPanel value="3">
                        <MDBCard className='container'>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell align="left">Posted On</TableCell>
                                        <TableCell align="left">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {likedBlogData && likedBlogData.map((blog) => (
                                        <TableRow
                                            key={blog._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {blog.title}
                                            </TableCell>
                                            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                                                {formatDistance(new Date(blog.createdAt), new Date(), { addSuffix: true })}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </MDBCard>
                    </TabPanel>
                </TabContext>
            </div >
            <Footer />
        </>
    )
}

export default Profilepage