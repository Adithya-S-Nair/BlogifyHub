import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';

const Homepage = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        console.log(user);
        const hasToken = document.cookie.includes('token');
        if (!hasToken) {
            navigate('/auth');
        } else {
            axios
                .get('/home', { withCredentials: true })
                .then((response) => {
                    console.log(response);
                    if (response.status !== 201) {
                        navigate('/auth');
                        console.log('navigating');
                    } else {
                        setUser({ userId: response.data.userId, username: response.data.username });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    navigate('/auth');
                });
        }
    }, []);

    return <div>Homepage</div>;
};

export default Homepage;
