import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { Icon } from '../assets/images'


function IndexPage() {

    const styles = {
        h1:{
            color: "red",
            margin:"0 auto",
            width:"50%",
        }
    }


    return (
        <>
            <Header />
            <h1 style={styles.h1}>IndexPage</h1>
            <h3>This is Index Page</h3>
            <img src={Icon} alt='imagehotel' /> <br />
            <Link className='link' to='/login'>Login Page</Link> <br />
            <Link className='link' to='/register'>Register Page</Link> <br />
            <Footer />
        </>
    )
}

export default IndexPage