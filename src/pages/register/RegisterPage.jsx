import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useFormik } from "formik";
import * as Yup from "yup";




function RegisterPage() {

    const initialValues = {
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirm_password: "",
    };
    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: Yup.object({
                fname: Yup.string().min(2).max(25).required("Please enter your First name"),
                lname: Yup.string().min(2).max(25).required("Please enter your  Last name"),
                email: Yup.string().email().required("Please enter your email"),
                password: Yup.string().min(6).required("Please enter your password"),
                confirm_password: Yup.string()
                    .required()
                    .oneOf([Yup.ref("password"), null], "Password must match"),
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
            <div className='w-10/12 mx-auto text-center text-5xl mb-7'>
                <span className='text-gray-700 font-semibold '>Login or Create an Account</span>
            </div>
            
            <form onSubmit={handleSubmit} className='pt-12 w-8/12 mx-auto ' >

            <div className='font-semibold text-2xl pb-5 border-b-4 border-slate-200'>Personal Information</div>
            <div className='font-normal text-slate-500 text-lg py-5'>Please enter the following information to create your account </div>
                {/* first name last name */}
                <div className='flex justify-between gap-5 mt-2'>
                    <div className='flex gap-2 flex-col w-1/2'>
                        <label htmlFor="name" >
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
                        <label htmlFor="name" >
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
                        <label htmlFor="email" >
                            Roles
                        </label>
                        <select name="select" id="select" className="border pl-4 py-2">
                            <option value="seller">seller</option>
                            <option value="buyer">buyer</option>
                        </select>
                    </div>

                </div>

                <div className='font-semibold text-2xl mt-8 pb-5 border-b-4 border-slate-200'>Personal Information</div>

                {/* password */}
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