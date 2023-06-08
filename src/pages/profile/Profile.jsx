import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
// import { MenuItem, TextField } from '@mui/material';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

function Profile() {

    const { user } = useContext(UserContext);
    const [ready, setReady] = useState(false);

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [roleId, setRoleId] = useState();
    const [role, setRole] = useState("");
    useEffect(() => {
        if (user) {
            try {
                axios.get(`https://book-e-sell-node-api.vercel.app/api/user/byId?id=${user}`)
                    .then(response => {
                        setState((prev) => ({
                            ...prev,
                            firstName: response.data.result.firstName,
                            lastName: response.data.result.lastName,
                            email: response.data.result.email,
                        }));
                        setRole(response.data.result.role);
                        setRoleId(response.data.result.roleId);
                        setReady(true);
                    })
                    .catch(error => {
                        console.log(error.response.data.error)
                    })
            } catch (error) {

            }
        }
    }, [user])



    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setValues } =
        useFormik({
            initialValues: state,
            validationSchema: Yup.object({
                firstName: Yup.string().min(2).max(25).required("Please enter your First name"),
                lastName: Yup.string().min(2).max(25).required("Please enter your  Last name"),
                email: Yup.string().email().required("Please enter your email"),
                password: Yup.string().min(6).required("Please enter your password"),
                confirm_password: Yup.string()
                    .required()
                    .oneOf([Yup.ref("password"), null], "Password must match"),
            }),
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values, action) => {
                values = {
                    "firstName": values.firstName,
                    "lastName": values.lastName,
                    "email": values.email,
                    "password": values.password,
                }
                const data = {
                    ...values,
                    role,
                    roleId,
                    id: user
                }
                
                console.log("values", values);
                try {
                    const response = await axios.put('https://book-e-sell-node-api.vercel.app/api/user', data);
                    if (response.status === 200) {
                        alert("Profile updated");
                        action.resetForm();
                        window.location.replace('/login');
                    } else {
                        alert("Error updating profile");
                        console.log('Unexpected status:', response.status);
                    }

                } catch (error) {
                    alert("Error updating profile");
                    console.log('Error updating profile:', error);
                }
            },
        });
    useEffect(() => {
        if (ready) {
            setValues({ ...state });

        }
    }, [ready]);
    return (
        <>
            <div className='flex flex-col h-screen justify-between'>
                <div>
                    <Header />
                    <div className='w-8/12 mx-auto text-center text-4xl mt-10 mb-7'>
                        <span className='text-gray-700 font-semibold'>Update Profile
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className='pt-12 w-8/12 mx-auto ' >

                        <div className='flex justify-between gap-5 '>
                            <div className='flex gap-2 flex-col w-1/2'>
                                <label htmlFor="firstName" >
                                    First Name
                                </label>
                                <input
                                    type='text'
                                    autoComplete="off"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="First Name"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border"
                                />

                                {touched.firstName && errors.firstName ? (
                                    <p className='text-lg text-red-500 font-thin'>{errors.firstName}</p>
                                ) : <p className='text-lg text-transparent font-thin invisible'>fname must be at least 2 characters</p>}
                            </div>

                            <div className='flex gap-2 flex-col  w-1/2' >
                                <label htmlFor="lname" >
                                    Last Name
                                </label>
                                <input
                                    type='text'
                                    autoComplete="off"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Last Name"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className=" border"
                                />
                                {touched.lastName && errors.lastName ? (
                                    <p className='text-lg text-red-500 font-thin'>{errors.lastName}</p>
                                ) : <p className='text-lg text-red-500 font-thin invisible'>lname must be at least 2 characters</p>}
                            </div>
                        </div>


                        {/* email */}
                        <div className='flex justify-between  gap-5'>
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
                                <label htmlFor="password">
                                    New Password
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
                        </div>
                        <div className='flex justify-between  gap-5'>
                            <div className='flex gap-2 flex-col w-1/2'>
                                <label htmlFor="confirm_password" >
                                    Confirm Password
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
                                    className="border"
                                // height="50px"
                                />
                                {errors.confirm_password && touched.confirm_password ? (
                                    <p className='text-lg text-red-500 font-thin' >{errors.confirm_password}</p>
                                ) : <p className='text-lg text-red-500 font-thin invisible'  >password must be at least 6 characters</p>}
                            </div>
                            <div className='flex gap-2 flex-col w-1/2'>
                            </div>
                        </div>



                        <div className='w-full mt-8 mb-20 flex gap-4' >
                            <button className='bg-green-500  w-32 h-11 rounded-md text-white' type="submit">
                                Save
                            </button>
                            <Link to={'/products'} className='bg-rose-500 w-32 h-11 rounded-md text-white flex items-center justify-center' type="submit">
                                Cancel
                            </Link>
                        </div>
                    </form>


                </div>
                <Footer />
            </div>

        </>
    )
}

export default Profile