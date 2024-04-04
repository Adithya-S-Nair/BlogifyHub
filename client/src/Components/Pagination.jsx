import React from 'react'
import MuiPagination from '@mui/material/Pagination'

const Pagination = () => {
    return (
        <div className='d-flex justify-content-center pt-5 pb-3'>
            <MuiPagination count={10} color="primary" />
        </div>
    )
}

export default Pagination