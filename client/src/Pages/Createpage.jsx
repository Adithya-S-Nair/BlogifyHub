import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios'
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import Navbar from '../Components/Navbar';
import Snacksbar from '../Components/Snacksbar';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import 'react-quill/dist/quill.snow.css';

const Createpage = () => {
    const fileInputRef = useRef(null);
    const fileViewRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState(null);
    const [summary, setSummary] = useState('');
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
        formData.append('content', content);
        formData.append('cover', cover);
        axios.post('/api/blog/new', formData)
            .then((response) => {
                if (response.status === 200) {
                    setOpen(true)
                    setTitle('')
                    setSummary('')
                    setContent('')
                    setCover(null)
                }
            })
    }

    const categoryList = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },
        {
            label: 'The Lord of the Rings: The Return of the King',
            year: 2003,
        },
        { label: 'The Good, the Bad and the Ugly', year: 1966 },
        { label: 'Fight Club', year: 1999 },
        {
            label: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
        },
        {
            label: 'Star Wars: Episode V - The Empire Strikes Back',
            year: 1980,
        },
        { label: 'Forrest Gump', year: 1994 },
        { label: 'Inception', year: 2010 },
        {
            label: 'The Lord of the Rings: The Two Towers',
            year: 2002,
        },
        { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { label: 'Goodfellas', year: 1990 },
        { label: 'The Matrix', year: 1999 },
        { label: 'Seven Samurai', year: 1954 },
        {
            label: 'Star Wars: Episode IV - A New Hope',
            year: 1977,
        },
        { label: 'City of God', year: 2002 },
        { label: 'Se7en', year: 1995 },
        { label: 'The Silence of the Lambs', year: 1991 },
        { label: "It's a Wonderful Life", year: 1946 },
        { label: 'Life Is Beautiful', year: 1997 },
        { label: 'The Usual Suspects', year: 1995 },
        { label: 'Léon: The Professional', year: 1994 },
        { label: 'Spirited Away', year: 2001 },
        { label: 'Saving Private Ryan', year: 1998 },
        { label: 'Once Upon a Time in the West', year: 1968 },
        { label: 'American History X', year: 1998 },
        { label: 'Interstellar', year: 2014 },
        { label: 'Casablanca', year: 1942 },
        { label: 'City Lights', year: 1931 },
        { label: 'Psycho', year: 1960 },
        { label: 'The Green Mile', year: 1999 },
        { label: 'The Intouchables', year: 2011 },
        { label: 'Modern Times', year: 1936 },
        { label: 'Raiders of the Lost Ark', year: 1981 },
        { label: 'Rear Window', year: 1954 },
        { label: 'The Pianist', year: 2002 },
        { label: 'The Departed', year: 2006 },
        { label: 'Terminator 2: Judgment Day', year: 1991 },
        { label: 'Back to the Future', year: 1985 },
        { label: 'Whiplash', year: 2014 },
        { label: 'Gladiator', year: 2000 },
        { label: 'Memento', year: 2000 },
        { label: 'The Prestige', year: 2006 },
        { label: 'The Lion King', year: 1994 },
        { label: 'Apocalypse Now', year: 1979 },
        { label: 'Alien', year: 1979 },
        { label: 'Sunset Boulevard', year: 1950 },
        {
            label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
            year: 1964,
        },
        { label: 'The Great Dictator', year: 1940 },
        { label: 'Cinema Paradiso', year: 1988 },
        { label: 'The Lives of Others', year: 2006 },
        { label: 'Grave of the Fireflies', year: 1988 },
        { label: 'Paths of Glory', year: 1957 },
        { label: 'Django Unchained', year: 2012 },
        { label: 'The Shining', year: 1980 },
        { label: 'WALL·E', year: 2008 },
        { label: 'American Beauty', year: 1999 },
        { label: 'The Dark Knight Rises', year: 2012 },
        { label: 'Princess Mononoke', year: 1997 },
        { label: 'Aliens', year: 1986 },
        { label: 'Oldboy', year: 2003 },
        { label: 'Once Upon a Time in America', year: 1984 },
        { label: 'Witness for the Prosecution', year: 1957 },
        { label: 'Das Boot', year: 1981 },
        { label: 'Citizen Kane', year: 1941 },
        { label: 'North by Northwest', year: 1959 },
        { label: 'Vertigo', year: 1958 },
        {
            label: 'Star Wars: Episode VI - Return of the Jedi',
            year: 1983,
        },
        { label: 'Reservoir Dogs', year: 1992 },
        { label: 'Braveheart', year: 1995 },
        { label: 'M', year: 1931 },
        { label: 'Requiem for a Dream', year: 2000 },
        { label: 'Amélie', year: 2001 },
        { label: 'A Clockwork Orange', year: 1971 },
        { label: 'Like Stars on Earth', year: 2007 },
        { label: 'Taxi Driver', year: 1976 },
        { label: 'Lawrence of Arabia', year: 1962 },
        { label: 'Double Indemnity', year: 1944 },
        {
            label: 'Eternal Sunshine of the Spotless Mind',
            year: 2004,
        },
        { label: 'Amadeus', year: 1984 },
        { label: 'To Kill a Mockingbird', year: 1962 },
        { label: 'Toy Story 3', year: 2010 },
        { label: 'Logan', year: 2017 },
        { label: 'Full Metal Jacket', year: 1987 },
        { label: 'Dangal', year: 2016 },
        { label: 'The Sting', year: 1973 },
        { label: '2001: A Space Odyssey', year: 1968 },
        { label: "Singin' in the Rain", year: 1952 },
        { label: 'Toy Story', year: 1995 },
        { label: 'Bicycle Thieves', year: 1948 },
        { label: 'The Kid', year: 1921 },
        { label: 'Inglourious Basterds', year: 2009 },
        { label: 'Snatch', year: 2000 },
        { label: '3 Idiots', year: 2009 },
        { label: 'Monty Python and the Holy Grail', year: 1975 },
    ];

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
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    className='mb-3'
                                    options={categoryList}
                                    renderInput={(params) => <TextField {...params} label="Movie" />}
                                />
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