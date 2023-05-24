import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useFormik } from "formik";
import * as Yup from "yup";



function LoginPage() {


  const initialValues = {
    email: "",
    password: "",
   
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        email: Yup.string().email().required("Please enter your email"),
        password: Yup.string().min(6).required("Please enter your password"),
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log("values", values);
        action.resetForm();
        window.location.replace('/'); 
      },
    });

  console.log(errors);
  return (
    <>
      <Header />
      <div className='w-10/12 mx-auto text-center text-5xl mb-7'>
        <span className='text-gray-700'>Login</span>
      </div>
      <form onSubmit={handleSubmit} className='p-2 w-5/12 mx-auto' >
        <div className='flex justify-around px-5 gap-5 mb-4'>
          <div className='flex gap-2 grow flex-col' >
            <label htmlFor="email" >
              Email
            </label>
            <input
              type="email"
              autoComplete="off"
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="px-2 py-1 w-full -mr-28 border"
            />
            {errors.email && touched.email ? (
              <p className='text-lg text-red-500 font-thin' >{errors.email}</p>
            ) :  <p className='text-lg text-red-500 font-thin invisible' >"email must be a valid email"</p>}
          </div>
        </div>
        <div className='flex justify-around px-5 gap-5 mb-4'>

          <div className='flex gap-2 grow flex-col' >
            <label htmlFor="password">
              Password
            </label>
            <input
              type="password"
              autoComplete="off"
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="px-2 py-1 w-full border"
            />
            {errors.password && touched.password ? (
              <p className='text-lg text-red-500 font-thin' >{errors.password}</p>
            ) : <p className='text-lg text-red-500 font-thin invisible' >"password must be at least 6 characters"</p>}
          </div>
        </div>



        <div className='w-full text-center mt-20' >
          <button className='bg-red-400 px-5 py-4 rounded-md text-white' type="submit">
            Login
          </button>
        </div>
      </form>
      <Footer />
    </>
  )
}

export default LoginPage