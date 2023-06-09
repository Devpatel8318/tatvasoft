import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../../state/slice/userSlice'



function LoginPage() {

  const userRedux = useSelector((state) => state.users.userName);
  const dispatch = useDispatch();


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
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post('https://book-e-sell-node-api.vercel.app/api/user/login', values);
          if (response.status === 200) {
            console.log('Form submitted successfully!');
            dispatch(updateUser(response.data.result.id));
            action.resetForm();
            window.location.replace('/');
          } else {

            alert("Wrong credentials");
            console.log('Unexpected status:', response.status);
          }

        } catch (error) {

          alert("Wrong credentials");
          console.log('Error submitting form:', error);
        }
      },
    });




  if (userRedux && userRedux !== null) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <Header />

      <div className="p-12 w-full flex justify-center "> Home &nbsp; {">"} &nbsp; <span className='text-red-500'>Login</span></div>
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
            <button className='bg-red-500 px-3 py-4 text-lg rounded-sm text-white' type="submit">
              Create an Account
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
                ) : <p className='text-lg text-red-500 font-thin invisible' >"email must be a valid email"</p>}
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
              <button className='bg-red-500 w-32 h-11 rounded-sm text-white' type="submit">
                Login
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