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

      <div className="p-12 w-full flex justify-center"> Home &nbsp; {">"} &nbsp; <span className='text-red-500'>Create an Account</span></div>
      <div className='w-8/12 mx-auto text-center text-5xl mb-7'>
          <span className='text-gray-700 font-semibold '>Login or Create an Account</span>
      </div>


      <div className='w-8/12 mx-auto flex '>
        {/* left side new customer  */}
        <div className='flex-1 pr-5'>
          <div className='font-semibold text-2xl pb-5 pt-12 border-b-4 border-slate-200'>New Customer</div>
          <div className='font-normal text-slate-500 text-lg py-5'>registration is free and easy </div>
          <div className='mb-40'>
              <div className='pb-3'>{"\u25CF "}Faster checkout</div>
              <div className='pb-3'>{"\u25CF "}Save multiple shipping addresses</div>
              <div className='pb-3'>{"\u25CF "}View and track orders and more</div>
          </div>
          <div className='w-full mt-5 mb-20' >
              <button className='bg-red-600 w-32 h-11 rounded-sm text-white' type="submit">
                Register
              </button>
            </div>
        </div>
        
        
        {/* right side exsisting customer */}
        <div className='flex-1'> 
          <form onSubmit={handleSubmit} className='' >
            <div className='font-semibold text-2xl pb-5 pt-12 border-b-4 border-slate-200'>Registered Customers</div>
            <div className='font-normal text-slate-500 text-lg py-5'>if you have an account with us, please log in. </div>

            <div className='flex justify-around gap-5 mb-4'>
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
            <div className='flex justify-around gap-5 mb-4'>

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

            <div className='w-full mt-8 mb-20' >
              <button className='bg-red-600 w-32 h-11 rounded-sm text-white' type="submit">
                Register
              </button>
            </div>
          </form>
        </div>

     
      </div>


      <Footer />
    </>
  )
}

export default LoginPage