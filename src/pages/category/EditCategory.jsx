import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link, useParams } from 'react-router-dom';

function EditCategory() {
    const { id } = useParams();
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        axios.get(`https://book-e-sell-node-api.vercel.app/api/category/byId?id=${id}`).then(response => {
            console.log(response.data.result.name);
            setCategoryName(response.data.result.name);
        });
    }, []);


    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            const response = await axios.put('https://book-e-sell-node-api.vercel.app/api/category', {
                id,
                name:categoryName
            });
            if (response.status === 200) {
                console.log('User Updated');
                window.location.replace('/categories');
            } else {
                alert("Error Updating user");
                console.log('Unexpected status:', response.status);
            }
        } catch (error) {
            alert("Error Updating user");
            console.log('Error submitting form:', error);
        }
    }

    return (
        <>
            <div className='flex flex-col h-screen justify-between'>
                <Header />
                <div className='px-10 mt-10 grow'>
                    <div className='w-10/12 mx-auto text-center text-5xl mb-7'>
                        <span className='text-gray-700 font-semibold '>Edit Category</span>
                    </div>
                    <form className='pt-2 w-8/12 mx-auto mt-20' onSubmit={handleSubmit} >
                        <div className='flex justify-between gap-5 mt-2'>
                            <div className='flex gap-2 flex-col mt-5 w-1/2'>
                                <label htmlFor="name" >
                                    Category Name
                                </label>
                                <input
                                    type='text'
                                    autoComplete="off"
                                    name="categoryName"
                                    id="categoryName"
                                    placeholder="First Name"
                                    value={categoryName}
                                    onChange={e => setCategoryName(e.target.value)}
                                    className="border"
                                />
                            </div>
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

export default EditCategory