import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux'


function AddCategory() {
    const [category, setCategory] = useState("");
    const userRedux = useSelector((state) => state.users.userName);


    async function handleSubmit(ev) {
        ev.preventDefault();
        try {

            const response = await axios.post('https://book-e-sell-node-api.vercel.app/api/category', { name: category });
            if (response.status === 200) {
                console.log('Category Added');
                window.location.replace('/categories');
            } else {
                alert("Error Adding Category");
                console.log('Unexpected status:', response.status);
            }
        } catch (error) {
            alert("Error Adding Category");
            console.log('Error submitting form:', error);
        }
    }

    if (!userRedux || userRedux === null) {
        return <Navigate to={'/login'} />
    }
    return (
        <>
            <div className='flex flex-col h-screen justify-between'>
                <div>
                    <Header />
                    <div className='w-8/12 mx-auto text-center text-4xl mt-6 mb-16'>
                        <span className='text-gray-700 font-semibold'>Add Category
                        </span>
                    </div>
                    <form className='w-8/12 mx-auto  mt-6 mb-16' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="name" >
                                Category Name:
                            </label>
                            <input
                                type='text'
                                name="category"
                                id="category"
                                value={category}
                                onChange={ev => setCategory(ev.target.value)}
                                className=" border w-1/2"
                            />
                        </div>
                        <div className='w-full mt-8 mb-20 flex gap-4' >
                            <button className='bg-green-500  w-32 h-11 rounded-md text-white' type="submit">
                                Save
                            </button>
                            <Link to={'/categories'} className='bg-rose-500 w-32 h-11 rounded-md text-white flex items-center justify-center' type="submit">
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

export default AddCategory