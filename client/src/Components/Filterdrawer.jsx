import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import {
    MDBCardTitle,
    MDBCardText,
    MDBBtn
} from 'mdb-react-ui-kit';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function TemporaryDrawer({ open, anchor, setDrawer }) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [language, setLanguage] = React.useState([])
    const [selectedDate, setSelectedDate] = React.useState(null);

    React.useEffect(() => {
        setState((prevState) => ({ ...prevState, [anchor]: open }));
    }, [open, anchor]);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
        if (!open) {
            setTimeout(() => {
                setDrawer(false);
            }, 150);
        }
    };

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
        setTimeout(() => {
            setDrawer(false);
        }, 500);
    };

    return (
        <div>
            <React.Fragment>
                <div className="container">
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        style={{
                            borderRadius: '50px'
                        }}
                    >
                        <div className='pt-5 pe-5 ps-4'>
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
                        </div>
                    </Drawer>
                </div>
            </React.Fragment>
        </div>
    );
}
