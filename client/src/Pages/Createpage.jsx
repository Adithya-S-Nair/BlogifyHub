import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios'
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import Navbar from '../Components/Navbar';
import Snacksbar from '../Components/Snacksbar';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useMediaQuery from '@mui/material/useMediaQuery';
import 'react-quill/dist/quill.snow.css';

const Createpage = () => {
    const fileInputRef = useRef(null);
    const fileViewRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState(null);
    const [summary, setSummary] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [content, setContent] = useState('');
    const isSmallScreen = useMediaQuery('(max-width: 768px)');

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setCover(selectedFile)
    }

    useEffect(() => {
        if (cover) {
            console.log(cover);
            fileViewRef.current.src = URL.createObjectURL(cover);
        }
    }, [cover]);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['clean']
        ]
    }

    const formats = [
        'bold', 'italic', 'underline', 'align',
        'list', 'bullet', 'image'
    ];

    const handlePublish = (ev) => {
        ev.preventDefault()
        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('category', category);
        formData.append('location', location);
        formData.append('content', content);
        formData.append('cover', cover);
        axios.post('/api/blog/new', formData)
            .then((response) => {
                if (response.status === 200) {
                    setOpen(true)
                    setTitle('')
                    setSummary('')
                    setCategory('')
                    setLocation('')
                    setContent('')
                    setCover(null)
                }
            })
    }

    const message = (
        <div className='d-flex gap-1 align-items-center text-success'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" style={{ width: '1.5em' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            <span>Blog published successfully</span>
        </div>
    )

    return (
        <div id='create-page'>
            <Navbar />
            <form onSubmit={handlePublish}>
                <div className="mt-5 pt-5">
                    <div className="px-md-5 d-flex justify-content-between">
                        <p className='text-primary h2 mx-md-5'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '0.9em' }} className='me-md-2'>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                            Create new blog
                        </p>
                        <MDBBtn type='submit' className='rounded-pill mx-md-5 d-flex align-items-center gap-2 h1'>
                            Publish
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '1.1em', fontWeight: 'bold' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </MDBBtn>
                    </div>
                    <hr className='text-primary mb-3' />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1 mx-auto justify-content-center d-flex mb-3">
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    hidden />
                                {isSmallScreen ?
                                    (<Avatar
                                        onClick={handleImageClick}
                                        className='cover pointer'
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            position: 'relative',
                                            display: 'inline-block',
                                            background: '#29a5d7'
                                        }}>
                                        {cover ?
                                            <img className='cover-img img-fluid' src='' alt="Blog Cover" ref={fileViewRef} /> :
                                            <img className='cover-img img-fluid' src="https://colorlib.com/wp/wp-content/uploads/sites/2/image-compression-plugins.jpg" alt="Blog Cover" />
                                        }
                                        <div class="overlay">
                                            <span class="upload-text">Upload</span>
                                        </div>
                                    </Avatar>)
                                    :
                                    (<Avatar
                                        onClick={handleImageClick}
                                        className='cover pointer'
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            position: 'relative',
                                            display: 'inline-block',
                                            background: '#29a5d7'
                                        }}>
                                        {cover ?
                                            <img className='cover-img img-fluid' src='' alt="Blog Cover" ref={fileViewRef} /> :
                                            <img className='cover-img img-fluid' src="https://colorlib.com/wp/wp-content/uploads/sites/2/image-compression-plugins.jpg" alt="Blog Cover" />
                                        }
                                        <div class="overlay">
                                            <span class="upload-text">Upload</span>
                                        </div>
                                    </Avatar>)
                                }
                            </div>
                            <div className='col-md-11'>
                                <MDBInput
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    label='Title '
                                    type='text'
                                    size='text'
                                    className='mb-3'
                                    autoFocus
                                    required />
                                <div className="d-flex gap-3 mb-3">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={category}
                                            label="category"
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <MenuItem value={"Consert"}>Consert</MenuItem>
                                            <MenuItem value={"Open Events"}>Open Events</MenuItem>
                                            <MenuItem value={"College Fest"}>College fest</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <MDBInput
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                        label='Location'
                                        type='text'
                                        size='text'
                                        required />
                                </div>
                            </div>
                        </div>
                        <MDBInput
                            value={summary}
                            onChange={e => setSummary(e.target.value)}
                            label='Summary'
                            type='text'
                            size='text'
                            className='mb-3'
                            required />
                        <ReactQuill
                            required
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            value={content}
                            onChange={setContent} />
                    </div>
                </div>
            </form>
            <Snacksbar open={open} setOpen={setOpen} message={message} />
        </div>
    )
}

export default Createpage