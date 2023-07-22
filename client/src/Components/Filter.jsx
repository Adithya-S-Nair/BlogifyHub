import React, { useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
} from 'mdb-react-ui-kit';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const Filter = () => {
    const [language, setLanguage] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);

    const handleLanguageChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setLanguage((prevLanguages) => [...prevLanguages, value]);
        } else {
            setLanguage((prevLanguages) =>
                prevLanguages.filter((lang) => lang !== value)
            );
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const applyFilter = () => {
        console.log(language);
        console.log(selectedDate);
    };

    return (
        <MDBCard style={{ height: 'fit-content' }} className='filter-box pe-5'>
            <MDBCardBody>
                <MDBCardTitle className='text-primary'>Filter</MDBCardTitle>
                <MDBCardText className='text-muted pt-2'>Language</MDBCardText>
                <MDBCheckbox name='flexCheck' value='english' id='flexCheckDefault' label='English' onChange={handleLanguageChange} />
                <MDBCheckbox name='flexCheck' value='hindi' id='flexCheckDefault' label='Hindi' onChange={handleLanguageChange} />
                <MDBCheckbox name='flexCheck' value='malayalam' id='flexCheckDefault' label='Malayalam' onChange={handleLanguageChange} />
                <MDBCardText className='text-muted pt-3'>Date</MDBCardText>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={selectedDate} onChange={handleDateChange} />
                </LocalizationProvider>
                <br />
                <MDBBtn className='mt-4' onClick={applyFilter}>Apply</MDBBtn>
            </MDBCardBody>
        </MDBCard>
    )
}