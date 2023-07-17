import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../Context/authContext';
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';

function Authpage() {
    const { setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [justifyActive, setJustifyActive] = useState('tab1');
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({ username: "", email: "", password: "", cpassword: "" });

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    const handleLoginInputs = (e) => {
        let { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value })
    }

    const handleRegisterInputs = (e) => {
        let { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value })
    }

    const handleLoginSubmit = (ev) => {
        ev.preventDefault()
        axios.post('/api/login', {
            email: loginData.email,
            password: loginData.password
        }, { withCredentials: true })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    setUser({ userId: response.data.id, username: response.data.username })
                    navigate('/')
                }
            })
            .catch((error) => {
                alert("Invalid Credentials")
                console.log(error);
            });
    }

    const handleRegisterSubmit = (ev) => {
        ev.preventDefault()
        if (registerData.password === registerData.cpassword) {
            axios.post('/api/register', {
                username: registerData.username,
                email: registerData.email,
                password: registerData.password
            }, { withCredentials: true })
                .then((response) => {
                    if (response.status === 201) {
                        setUser({ userId: response.data.id, username: response.data.username })
                        navigate('/')
                    }
                })
                .catch((error) => {
                    alert("Invalid Credentials")
                    console.log(error);
                });
        }
    }

    return (
        <MDBContainer className="p-3 d-flex flex-column w-25">
            <div className='d-flex justify-content-center align-items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '2.3em' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                <h5 className='pt-2'>BLOGIFY HUB</h5>
            </div>
            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between mt-5'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Register
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>

                <MDBTabsPane show={justifyActive === 'tab1'}>
                    <form onSubmit={handleLoginSubmit}>
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Email address'
                            name='email'
                            id='form1'
                            value={loginData.email}
                            onChange={handleLoginInputs}
                            type='email' />
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Password'
                            name='password'
                            id='form2'
                            value={loginData.password}
                            onChange={handleLoginInputs}
                            type='password' />
                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox name='flexCheck' value='' label='Remember me' checked />
                            <Link to="/">Forgot password?</Link>
                        </div>
                        <MDBBtn className="mb-4 w-100" type='submit'>Login</MDBBtn>
                    </form>
                </MDBTabsPane>

                <MDBTabsPane show={justifyActive === 'tab2'}>
                    <form onSubmit={handleRegisterSubmit}>

                        <MDBInput
                            value={registerData.username}
                            onChange={handleRegisterInputs}
                            wrapperClass='mb-4'
                            label='Name'
                            name='username'
                            type='text' />
                        <MDBInput
                            value={registerData.email}
                            onChange={handleRegisterInputs}
                            wrapperClass='mb-4'
                            label='Email'
                            name='email'
                            type='email' />
                        <MDBInput
                            value={registerData.password}
                            onChange={handleRegisterInputs}
                            wrapperClass='mb-4'
                            label='Password'
                            name='password'
                            type='password' />
                        <MDBInput
                            value={registerData.cpassword}
                            onChange={handleRegisterInputs}
                            wrapperClass='mb-4'
                            label='Confirm Password'
                            name='cpassword'
                            type='password' />
                        <div className='d-flex justify-content-center mb-4'>
                            <MDBCheckbox name='flexCheck' label='I have read and agree to the terms' checked />
                        </div>
                        <MDBBtn className="mb-4 w-100" type='submit'>Register</MDBBtn>
                    </form>
                </MDBTabsPane>
            </MDBTabsContent>
        </MDBContainer>
    );
}

export default Authpage;