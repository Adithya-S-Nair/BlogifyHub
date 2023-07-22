import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBIcon, MDBCol } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Get connected with us on social networks:</span>
                </div>

                <div>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="facebook-f" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="twitter" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="google" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="instagram" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="linkedin" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="github" />
                    </a>
                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4 text-primary'>
                                <svg className='text-primary h5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.3em' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                BLOGIFY HUB
                            </h6>
                            <p>
                                Empowering voices, inspiring minds. Post and read blogs on our platform. Join the blogging community now!
                            </p>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Technologies Used</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    React Js
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Node Js
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Express
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Mongo DB
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                            <p className='useful-links'>
                                <Link to='/' className='text-reset'>
                                    Profile
                                </Link>
                            </p>
                            <p className='useful-links'>
                                <Link to='/' className='text-reset'>
                                    My Blogs
                                </Link>
                            </p>
                            <p className='useful-links'>
                                <Link to='/' className='text-reset'>
                                    Create Blog
                                </Link>
                            </p>
                            <p className='useful-links'>
                                <Link to='/' className='text-reset'>
                                    Logout
                                </Link>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>Adithya S Nair</p>
                            <p>Full Stack  Developer</p>
                            <p>+91 7356 6589 47</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Copyright:
                <span className='text-reset fw-bold text-capitalize' href='https://mdbootstrap.com/'>
                    Developed By <a href='#' className='text-decoration-underline text-muted'>Adithya S Nair</a>
                </span>
            </div>
        </MDBFooter>
    )
}

export default Footer