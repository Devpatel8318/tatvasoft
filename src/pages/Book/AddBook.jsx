import React, { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios"
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'

const AddBook = () => {
    const userRedux = useSelector((state) => state.users.userName);
    const [category, setCategory] = useState([]);
    const [state, setState] = useState({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        base64image: "",
    });
    const handleFileSelect = async (event) => {
        const file = event?.target?.files[0];
        const reader = new FileReader();
        if (file) {

            // Check if the file type is allowed
            if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
                // Check if the file size is less than 10KB (51,200 bytes)
                if (file.size < 51200) {
                    reader.onloadend = () => {
                        const base64String = reader.result;
                        setState({ ...state, base64image: base64String });
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert("File size must be less than 10KB");
                    return;
                }
            } else {
                alert("Only JPG, JPEG, and PNG files are allowed");
            }
        }
    };

    useEffect(() => {
        axios
            .get("https://book-e-sell-node-api.vercel.app/api/category/all")
            .then((response) => {
                console.log(response);
                setCategory(response.data.result);

            })
            .catch((err) => {
                console.log("error", err);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("https://book-e-sell-node-api.vercel.app/api/book", state)
            .then((response) => {
                console.log(response);
                toast.info("Book posted Succesfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                const timer = setTimeout(() => {
                    window.location.href = "/books";
                }, 400);
                return () => clearTimeout(timer);
            });
    };

    if (!userRedux || userRedux === null) {
        return <Navigate to={'/login'} />
    }

    return (
        <>
            <div className='flex flex-col h-screen justify-between'>
                <div>
                    <Header />

                    <div className='w-8/12 mx-auto text-center text-4xl mt-6 mb-16'>
                        <span className='text-gray-700 font-semibold'>Add Book
                        </span>
                    </div>

                    <div className='w-8/12 mx-auto  mt-6 mb-16'>
                        <div className="outline-gray-500">
                            <form onSubmit={handleSubmit} className="contact-inputs flex flex-col justify-between gap-10 p-3">


                                <div className=" flex justify-between">
                                    <div className=" w-1/2 flex gap-2 flex-col px-4">
                                        <label htmlFor="name" >
                                            Book Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            autoComplete="off"
                                            className="border"
                                            onChange={(e) => setState({ ...state, name: e.target.value })}
                                        />
                                    </div>
                                    <div className=" w-1/2 flex gap-2 flex-col px-4">
                                        <label htmlFor="price" >
                                            Book Price
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            required
                                            autoComplete="off"
                                            className="border"
                                            onChange={(e) =>
                                                setState({ ...state, price: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>


                                <div className=" flex justify-between">
                                    <div className=" w-1/2 flex gap-2 flex-col px-4">
                                        <label htmlFor="category" >
                                            Choose Category
                                        </label>
                                        <select
                                            className="border"
                                            onChange={(e) =>
                                                setState({ ...state, categoryId: e.target.value })
                                            }
                                        >
                                            <option selected disabled hidden></option>
                                            {category.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {" "}
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className=" w-1/2 flex gap-2 flex-col px-4">
                                        <label htmlFor="base64Image" >
                                            Upload Image
                                        </label>
                                        <div className="">
                                            <input
                                                className="border"
                                                name="base64image"
                                                accept="image/jpeg, image/jpg, image/png"
                                                type="file"
                                                onChange={handleFileSelect}
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div className="flex flex-col px-4">
                                    <label htmlFor="description" >
                                        Book Description
                                    </label>
                                    <textarea
                                        className="border"
                                        rows="4"
                                        cols="50"
                                        name="description"
                                        onChange={(e) =>
                                            setState({ ...state, description: e.target.value })
                                        }
                                    />
                                </div>
                                <div className='w-full mt-8 mb-20 flex gap-4 px-4' >
                                    <button className='bg-green-500  w-32 h-11 rounded-md text-white' type="submit">
                                        Save
                                    </button>
                                    <Link to={'/books'} className='bg-rose-500 w-32 h-11 rounded-md text-white flex items-center justify-center' type="submit">
                                        Cancel
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>

                <Footer />
            </div>

        </>

    );

};


export default AddBook;