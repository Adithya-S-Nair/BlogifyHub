import React from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from 'mdb-react-ui-kit';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

const Blog = ({ key, data }) => {

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '1px solid currentColor',
        content: '""',
      },
    }
  }));

  return (
    <MDBCard
      key={key}
      style={{
        maxWidth: 'fit-content',
        marginBottom: '1em'
      }}>
      <MDBCardBody className='pt-2'>
        <div className="d-flex gap-2 align-items-center">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar
              className='bg-primary'
              sx={{
                width: '2em',
                height: '2em'
              }}>
              <span className='text-capitalize'>{data.author.username[0]}</span>
            </Avatar>
          </StyledBadge>
          <div className="d-flex flex-column">
            <p className='mt-3 mb-0 fw-bold text-capitalize'>{data.author.username}</p>
            <p className='text-black-50'>{data.createdAt}</p>
          </div>
        </div>
        <MDBCardText>
          {data.summary}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  )
}

export default Blog