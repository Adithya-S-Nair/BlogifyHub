import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {
    MDBContainer,
    MDBNavbar
} from 'mdb-react-ui-kit';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
import { AuthContext } from '../Context/authContext';
const Navbar = () => {
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        axios.get('/api/logout').then(() => {
            setUser(null)
            navigate('/auth')
        })
    }

    return (
        <MDBNavbar expand='lg' light bgColor='light' className='fixed-top'>
            <MDBContainer fluid className='px-5'>
                <div className="d-flex gap-1 align-items-md-center">
                    <svg className='text-primary h5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.3em' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <Link to='/' className='text-primary h5 pt-1'>BLOGIFY HUB</Link>
                </div>
                {user && <div className="d-flex align-items-center mt-sm-1 gap-1" onClick={handleMenuClick} style={{ cursor: 'pointer' }}>
                    <Avatar
                        className='bg-primary user-select-none'
                        style={{ width: '1.3em', height: '1.3em' }}>
                        <span style={{
                            fontSize: '0.6em'
                        }}
                            className='text-uppercase fw-bold'>
                            {user.username[0]}
                        </span>
                    </Avatar>
                    <span
                        className='user-select-none display-name text-capitalize'>
                        {user.username}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '0.9em' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </div>}
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => navigate('/create')} className='d-flex gap-2 align-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.1em' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/create')} className='d-flex gap-2 align-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.1em' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Create
                    </MenuItem>
                    <MenuItem onClick={handleLogout} className='d-flex gap-2 align-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.1em' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        Logout
                    </MenuItem>
                </Menu>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Navbar