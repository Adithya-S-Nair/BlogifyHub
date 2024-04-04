import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';
import Navbar from '../Components/Navbar';
import Cookies from 'js-cookie';
import Blogs from '../Components/Blogs';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Filter } from '../Components/Filter';
import Footer from '../Components/Footer';
import TemporaryDrawer from '../Components/Filterdrawer';
import Pagination from '../Components/Pagination';

const Homepage = () => {
    const navigate = useNavigate();
    const [drawer, setDrawer] = useState(false);
    const { setUser } = useContext(AuthContext);
    const token = Cookies.get('token');
    const isSmallScreen = useMediaQuery('(max-width: 784px)');
    const isVerySmallScreen = useMediaQuery('(max-width: 600px)');

    const openDrawer = () => {
        setDrawer(true);
    };

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

    return (
        <main style={{ backgroundColor: 'rgb(250 250 250)' }}>
            <Navbar />
            <div className="mt-5">
                <div className="blogsContainer container pt-3">
                    <Blogs style={{ flexGrow: 1 }} />
                    {isSmallScreen ?
                        <button
                            onClick={openDrawer}
                            className='btn btn-white rounded-pill d-flex gap-2 align-items-center mt-3'
                            style={{
                                height: 'fit-content',
                                position: 'fixed',
                                right: '1em'
                            }}>
                            {isVerySmallScreen ?
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '2.0em' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                    </svg>
                                </>
                                :
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" style={{ width: '1.1em' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                    </svg>
                                    <h6 className='mt-2'>Filter</h6>
                                </>}
                        </button>
                        : <Filter style={{ flexGrow: 0, flexShrink: 0, width: '200px' }} />}
                </div>
                {drawer && <TemporaryDrawer open={drawer} anchor='right' setDrawer={setDrawer} />}
            </div>
            <Pagination/>
            <Footer />
        </main>
    );
};

export default Homepage;
