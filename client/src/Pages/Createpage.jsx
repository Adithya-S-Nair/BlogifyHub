import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios'
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import Navbar from '../Components/Navbar';
import Snacksbar from '../Components/Snacksbar';
import 'react-quill/dist/quill.snow.css';

const Createpage = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');

    const handlePublish = (ev) => {
        ev.preventDefault()
        axios.post('/api/blog/new',
            {
                title,
                summary,
                content,
            }).then((response) => {
                if (response.status === 200) {
                    setOpen(true)
                    setTitle('')
                    setSummary('')
                    setContent('')
                }
            })
    }

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
                        <MDBBtn type='submit' className='rounded-pill mx-md-5 d-flex align-items-center gap-md-1 h1'>
                            Publish
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '1.1em', fontWeight: 'bold' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </MDBBtn>
                    </div>
                    <hr className='text-primary mb-5' />
                    <div className="container">
                        <MDBInput
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            label='Title '
                            type='text'
                            size='text'
                            className='mb-3'
                            autoFocus
                            required />
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
                            value={content}
                            onChange={setContent} />
                    </div>
                </div>
            </form>
            <Snacksbar open={open} setOpen={setOpen} />
        </div>
    )
}

export default Createpage