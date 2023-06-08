import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import {  useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { MenuItem, TextField } from '@mui/material';




function RegisterPage() {

    const [roles, setRoles] = useState([]);
    useEffect(() => {
        axios.get('https://book-e-sell-node-api.vercel.app/api/user/roles').then(response => {
            console.log(response.data.result);
            setRoles(response.data.result);
        })
    }, [])

    const initialValues = {
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirm_password: "",
        myselect: "",
    };
    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: Yup.object({
                fname: Yup.string().min(2).max(25).required("Please enter your First name"),
                lname: Yup.string().min(2).max(25).required("Please enter your  Last name"),
                email: Yup.string().email().required("Please enter your email"),
                password: Yup.string().min(6).required("Please enter your password"),
                myselect: Yup.string().required('Please select an option'),
                confirm_password: Yup.string()
                    .required()
                    .oneOf([Yup.ref("password"), null], "Password must match"),
            }),
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values, action) => {
                values = {
                    "firstName": values.fname,
                    "lastName": values.lname,
                    "email": values.email,
                    "roleId": values.myselect,
                    "password": values.password,
                }
                console.log("values", values);
                try {
                    const response = await axios.post('https://book-e-sell-node-api.vercel.app/api/user', values);
                    if (response.status === 200) {
                        alert("User Created");
                      console.log('User Created');
                      action.resetForm();
                      window.location.replace('/login');
                    } else {
                      alert("Error creating user");
                      console.log('Unexpected status:', response.status);
                    }
          
                  } catch (error) {
                    alert("Error creating user");
                    console.log('Error submitting form:', error);
                  }
                // action.resetForm();
                // window.location.replace('/login');
            },
        });

    console.log(errors);
    return (
        <>
            <Header />
            <div className="p-12 w-full flex justify-center"> Home &nbsp; {">"} &nbsp; <span className='text-red-500'>Create an Account</span></div>
            <div className='w-10/12 mx-auto text-center text-5xl mb-7'>
                <span className='text-gray-700 font-semibold '>Login or Create an Account</span>
            </div>

            <form onSubmit={handleSubmit} className='pt-12 w-8/12 mx-auto ' >

                <div className='font-semibold text-2xl pb-5 border-b-4 border-slate-200'>Personal Information</div>
                <div className='font-normal text-slate-500 text-lg py-5'>Please enter the following information to create your account </div>
                {/* first name last name */}
                <div className='flex justify-between gap-5 mt-2'>
                    <div className='flex gap-2 flex-col w-1/2'>
                        <label htmlFor="fname" >
                            First Name
                        </label>
                        <input
                            type='text'
                            autoComplete="off"
                            name="fname"
                            id="fname"
                            placeholder="First Name"
                            value={values.fname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="border"
                        />

                        {touched.fname && errors.fname ? (
                            <p className='text-lg text-red-500 font-thin'>{errors.fname}</p>
                        ) : <p className='text-lg text-transparent font-thin invisible'>fname must be at least 2 characters</p>}
                    </div>

                    <div className='flex gap-2 flex-col  w-1/2' >
                        <label htmlFor="lname" >
                            Last Name
                        </label>
                        <input
                            type='text'
                            autoComplete="off"
                            name="lname"
                            id="lname"
                            placeholder="Last Name"
                            value={values.lname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className=" border"
                        />
                        {touched.lname && errors.lname ? (
                            <p className='text-lg text-red-500 font-thin'>{errors.lname}</p>
                        ) : <p className='text-lg text-red-500 font-thin invisible'>lname must be at least 2 characters</p>}
                    </div>
                </div>


                {/* email */}
                <div className='flex justify-between  gap-5 mt-2'>
                    <div className='flex gap-2 flex-col w-1/2' >
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
                            className="border"
                        />
                        {errors.email && touched.email ? (
                            <p className='text-lg text-red-500 font-thin ' >{errors.email}</p>
                        ) : <p className='text-lg text-red-500 font-thin invisible' >email must be a valid email</p>}
                    </div>

                    <div className='flex gap-2 flex-col w-1/2'>
                        <label htmlFor="myselect">
                            Select role
                        </label>
                        <div className='w-full'>
                            <TextField
                                select
                                id="myselect"
                                name="myselect"
                                value={values.myselect}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='w-full'
                            >
                                {roles.map(option => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        {errors.myselect && touched.myselect ? (
                            <p className='text-lg text-red-500 font-thin ' >{errors.myselect}</p>
                        ) : <p className='text-lg text-red-500 font-thin invisible' >email must be a valid email</p>}
                    </div>


                </div>

                <div className='font-semibold text-2xl mt-8 pb-5 border-b-4 border-slate-200'>Personal Information</div>
                <div className='flex justify-between gap-5 mt-2'>
                    <div className='flex gap-2 flex-col w-1/2'>
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
                            className="border"
                        />
                        {errors.password && touched.password ? (
                            <p className='text-lg text-red-500 font-thin' >{errors.password}</p>
                        ) : <p className='text-lg text-red-500 font-thin invisible' >password must be at least 6 characters</p>}
                    </div>
                    <div className='flex gap-2 flex-col w-1/2'>
                        <label htmlFor="confirm_password" >
                            Password
                        </label>
                        <input
                            type="password"
                            autoComplete="off"
                            name="confirm_password"
                            id="confirm_password"
                            placeholder="Confirm Password"
                            value={values.confirm_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="border px-3 py-2"
                            height="50px"
                        />
                        {errors.confirm_password && touched.confirm_password ? (
                            <p className='text-lg text-red-500 font-thin' >{errors.confirm_password}</p>
                        ) : <p className='text-lg text-red-500 font-thin invisible'  >password must be at least 6 characters</p>}
                    </div>
                </div>

                <div className='w-full mt-4 mb-20' >
                    <button className='bg-red-600 w-32 h-11 rounded-sm text-white' type="submit">
                        Register
                    </button>
                </div>
            </form>
            <Footer />
        </>
    )
}

export default RegisterPage