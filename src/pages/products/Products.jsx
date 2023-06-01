import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import ProductCard from '../../components/ProductCard';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';

function Products() {

    const [books, setBooks] = useState([]);

    const {user} = useContext(UserContext);
    if (!user) {
        window.location.replace('/login');
    }

    useEffect(() => {
        axios.get('https://book-e-sell-node-api.vercel.app/api/book/all').then(res => {
            setBooks(res.data.result);
        });
    }, [])

    const { cartItems, setCartItems } = useContext(CartContext);

    function handleAddToCart(name, price) {
        console.log("clicked");
        setCartItems((prev) => [...prev, { name, price }]);
    }


    return (
        <>
            <div className='flex flex-col h-screen justify-between'>
                <div>
                    <Header />

                    <div className='w-8/12 mx-auto text-center text-4xl mt-6 mb-7'>
                        <span className='text-gray-700 font-semibold'>Book Listing
                        </span>
                    </div>

                    <div className="container mx-auto mb-10">

                        <div className="grid sm:px-2 md:px-10 lg:px-30 px-2 grid-cols-2 mt-8 gap-x-2 gap-y-8 sm:gap-x-4 sm:gap-y-8 md:gap-x-6 md:gap-y-8 md:grid-cols-4 lg:grid-cols-5">

                            {books.length > 0 && books.map(book => (
                                <div key={book.price} className='border rounded-2xl border-gray-300 ' >

                                    <div className="flex mb-2 bg-gray-500 rounded-t-2xl  h-1/2 w-full">
                                        <img className="object-cover w-full rounded-t-2xl aspect-square" src={book.base64image} alt="" />
                                    </div>

                                    <div className=' h-1/2 flex flex-col justify-between p-4'>

                                        <div>
                                            <div className='text-2xl truncate overflow-hidden line-clamp-1 font-bold text-gray-700 ' >{book.name}</div>
                                            <div className='text-gray-400'>{book.category}</div>
                                            <div className='text-gray-800 overflow-hidden line-clamp-2'>{book.description}</div>
                                        </div>


                                        <div className='mb-2'>
                                            <div className=' mt-auto'>
                                                <div className='mt-7 text-gray-400 text-xl'>MRP {book.price}</div>
                                                <button className='bg-red-500 w-full rounded-md text-white mt-auto text-sm px-2 py-2' onClick={() => handleAddToCart(book.name, book.price)}>ADD TO CART</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* 
                    {books && books.length > 0 && (



                        <div className='w-8/12 mx-auto  mt-6 mb-7  flex gap-3 justify-evenly'>
                            {books.map(book=>(
                            <ProductCard base64image={book.base64image} name={book.name} category={book.category} description={book.description} price={book.price} />
                            ))}
                        </div>
                    )} */}








                </div>
                <Footer />
            </div>

        </>
    )
}

export default Products