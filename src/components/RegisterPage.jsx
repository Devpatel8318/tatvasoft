import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'

function RegisterPage() {
    return (
        <>
            <Header />
            <h1>Register Page</h1>
            <h3>This is Register Page</h3>
            <Link className='link' to='/'>Index Page</Link> <br />
            <Link className='link' to='/login'>Login Page</Link>
            <Footer />
        </>
    )
}

export default RegisterPage