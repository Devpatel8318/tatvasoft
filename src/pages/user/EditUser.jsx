import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { MenuItem, TextField } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'


function EditUser() {
    const userRedux = useSelector((state) => state.users.userName);

    const { id } = useParams();
    const [roles, setRoles] = useState([]);
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(0);

    useEffect(() => {
        axios.get('https://book-e-sell-node-api.vercel.app/api/user/roles').then(response => {
            setRoles(response.data.result);
        });
        axios.get(`https://book-e-sell-node-api.vercel.app/api/user/byId?id=${id}`)
            .then(response => {
                setFName(response.data.result.firstName);
                setLName(response.data.result.lastName);
                setEmail(response.data.result.email);
                setRole(response.data.result.roleId);
                setPassword(response.data.result.password);
            })
            .catch(error => {
                alert("Error:", error.response.data.key);
            })
    }, []);

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            let roleName;
            if (role == 2) {
                roleName = "seller"
            } else {
                roleName = "buyer"
            }
            const data = {
                "id": parseInt(id),
                "email": email,
                "firstName": fName,
                "lastName": lName,
                "roleId": role,
                "role": roleName,
                "password": password
            }
            const response = await axios.put('https://book-e-sell-node-api.vercel.app/api/user', data);
            if (response.status === 200) {
                console.log('User Updated');
                window.location.replace('/users/' + id);
            } else {
                alert("Error Updating user");
                console.log('Unexpected status:', response.status);
            }
        } catch (error) {
            alert("Error Updating user");
            console.log('Error submitting form:', error);
        }
    }
    if (!userRedux || userRedux === null) {return <Navigate to={'/login'} />}

    return (
        <>
            <div className='flex flex-col h-screen justify-between'>
                <Header />
                <div className='px-10 mt-10 grow'>
                    <div className='w-10/12 mx-auto text-center text-5xl mb-7'>
                        <span className='text-gray-700 font-semibold '>Edit User</span>
                    </div>
                    <form className='pt-2 w-8/12 mx-auto mt-20' onSubmit={handleSubmit} >
                        <div className='flex justify-between gap-5 mt-2'>
                            <div className='flex gap-2 flex-col mt-5 w-1/2'>
                                <label htmlFor="name" >
                                    First Name
                                </label>
                                <input
                                    type='text'
                                    autoComplete="off"
                                    name="fname"
                                    id="fname"
                                    placeholder="First Name"
                                    value={fName}
                                    onChange={e => setFName(e.target.value)}
                                    className="border"
                                />
                            </div>
                            <div className='flex gap-2 flex-col mt-5  w-1/2' >
                                <label htmlFor="name" >
                                    Last Name
                                </label>
                                <input
                                    type='text'
                                    autoComplete="off"
                                    name="lname"
                                    id="lname"
                                    placeholder="Last Name"
                                    value={lName}
                                    onChange={e => setLName(e.target.value)}
                                    className=" border"
                                />
                            </div>
                        </div>
                        <div className='flex justify-between  gap-5 mt-2'>
                            <div className='flex gap-2 flex-col mt-5 w-1/2' >
                                <label htmlFor="email" >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="border"
                                />
                            </div>
                            <div className='flex gap-2 flex-col mt-5 w-1/2'>
                                <label htmlFor="myselect">
                                    Select role
                                </label>
                                <div className='w-full'>
                                    <TextField
                                        select
                                        id="myselect"
                                        name="myselect"
                                        value={role}
                                        onChange={e => setRole(e.target.value)}
                                        className='w-full'
                                    >
                                        {roles.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                        </div>
                        <div className='w-full mt-8 mb-20 flex gap-4' >
                            <button className='bg-green-500  w-32 h-11 rounded-md text-white' type="submit">
                                Save
                            </button>
                            <Link to={'/users'} className='bg-rose-500 w-32 h-11 rounded-md text-white flex items-center justify-center' type="submit">
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

export default EditUser