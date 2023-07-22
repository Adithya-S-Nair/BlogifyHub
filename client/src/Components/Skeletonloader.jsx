import React from 'react'
import { Skeleton } from '@mui/material';
import {
    MDBCard,
    MDBCardBody,
    MDBCardText
} from 'mdb-react-ui-kit';

const Skeletonloader = ({ type }) => {
    return (
        <>
            {(type === 'read') ?
                <>
                    <div className='container mt-5 pt-5 mb-5'>
                        <Skeleton variant="text" animation="wave" height={40} style={{ width: '100%' }} />
                        <div className="d-flex gap-3 pt-2">
                            <Skeleton variant="text" animation="wave" width={100} />
                            <Skeleton variant="text" animation="wave" width={100} />
                        </div>
                        <Skeleton className='mt-2' variant="text" animation="wave" width={100} />
                        <Skeleton className='mt-2' variant="image" animation="wave" height={40} style={{ width: '100%', height: '400px' }} />
                    </div>
                </> :
                <div className='cardContainer'>
                    <MDBCard>
                        <MDBCardBody className='pt-2'>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="cardContent">
                                    <Skeleton variant="circular" width={40} height={40} animation="wave" />
                                    <div className="d-flex flex-column">
                                        <Skeleton variant="text" width={100} animation="wave" />
                                        <Skeleton variant="text" width={100} animation="wave" />
                                    </div>
                                </div>
                                <Skeleton variant="text" width={100} animation="wave" />
                            </div>
                            <Skeleton variant="text" className='mt-3' animation="wave" style={{ width: '75%' }} />
                            <MDBCardText className='mt-3'>
                                <Skeleton variant="text" animation="wave" style={{ width: '100%' }} />
                                <Skeleton variant="text" animation="wave" style={{ width: '100%' }} />
                                <Skeleton variant="text" animation="wave" style={{ width: '100%' }} />
                            </MDBCardText>
                            <div className="d-flex justify-content-between">
                                <Skeleton className='mt-3' variant="text" width={100} animation="wave" />
                                <div className="d-flex gap-2">
                                    <Skeleton className='mt-3' variant="text" width={25} animation="wave" />
                                    <Skeleton className='mt-3' variant="text" width={25} animation="wave" />
                                    <Skeleton className='mt-3' variant="text" width={25} animation="wave" />
                                </div>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </div >}
        </>
    )
}

export default Skeletonloader