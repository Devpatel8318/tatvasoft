import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Link } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
function LoginPage() {
  return (
    <>
      <Header />
      <h1>Login Page</h1>
      <h3>This is Login Page Page</h3>
      <br />
      <br /> <br />
      <TextField id="outlined-basic" label="User Name" variant="outlined" /> 
      <TextField id="filled-basic" label="Password" variant="filled" /> <br /><br />

      <Button variant="contained">Login</Button> <br /> <br />


      <Link className='link' to='/'>Index Page</Link> <br />
      <Link className='link' to='/register'> Register Page </Link>
      <Footer />
    </>
  )
}

export default LoginPage