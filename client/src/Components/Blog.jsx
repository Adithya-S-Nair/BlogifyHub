import React from 'react'
import { Link } from 'react-router-dom'
import {
  MDBCard,
  MDBCardBody,
  MDBBadge,
  MDBCardText
} from 'mdb-react-ui-kit';
import Avatar from '@mui/material/Avatar';
import { formatDistance } from 'date-fns'
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';

const Blog = ({ key, data }) => {
  const isSmallScreen = useMediaQuery('(max-width: 990px)');
  const handleLike = (blogId) => {
    axios.patch(`/api/blog/like/${blogId}`)
  }

  const handleEdit = () => {
    console.log('Edit Clicked');
  }

  return (
    <div className='cardContainer'>
      <MDBCard key={key}>
        <MDBCardBody className='pt-2'>
          <div className="d-flex justify-content-center align-items-center">
            <div className="cardContent">
              <Avatar
                className='bg-primary'
                sx={{
                  width: '2em',
                  height: '2em'
                }}>
                <span className='text-capitalize'>{data.author.username[0]}</span>
              </Avatar>
              <div className="d-flex flex-column">
                <p className='mt-3 mb-0 fw-bold text-capitalize'>{data.author.username}</p>
                <p className='text-black-50 text-capitalize'>{formatDistance(new Date(data.createdAt), new Date(), { addSuffix: true })}</p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <MDBBadge color='danger' dark className='m-2 lh-sm'>
                {data.category}
              </MDBBadge>
              <MDBBadge color='warning' dark className='m-2 lh-sm'>
                {data.location}
              </MDBBadge>
            </div>
          </div>
          <MDBCardText className='fw-bold'>
            {data.title}
          </MDBCardText>
          <MDBCardText>
            {isSmallScreen ? data.summary.substring(0, 100) : data.summary.substring(0, 350)}....
          </MDBCardText>
          <div className="d-flex justify-content-between">
            <Link
              className='btn btn-tertiary text-button'
              to={'/read/' + data._id}>
              Read More
            </Link>
            <div className="actions">
              <button className='btn btn-tertiary text-dark' onClick={() => { handleLike(data._id) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" style={{ width: '1.3em' }} className='pointer'>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
              <button className='btn btn-tertiary text-dark' onClick={handleEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" style={{ width: '1.3em' }} className='pointer'>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
              </button>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
}

export default Blog