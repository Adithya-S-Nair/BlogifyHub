import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';
import Navbar from '../Components/Navbar';
import Blogs from '../Components/Blogs';
import { Filter } from '../Components/Filter';

const Homepage = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get('/api/home', { withCredentials: true })
            .then((response) => {
                console.log(response);
                if (response.status !== 200) {
                    navigate('/auth');
                } else {
                    console.log('success');
                    setUser({ userId: response.data.userId, username: response.data.username });
                }
            })
            .catch((error) => {
                console.log(error);
                navigate('/auth');
            });
    }, []);

    return (
        <main style={{ backgroundColor: 'rgb(250 250 250)' }}>
            <Navbar />
            <div className="mt-5">
                <div className="d-flex justify-content-between gap-5 container pt-3">
                    <Blogs />
                    <Filter />
                </div>
            </div>
        </main>
    );
};

export default Homepage;
