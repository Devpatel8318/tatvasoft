import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import ProductCard from '../../components/ProductCard';

function Products() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('https://book-e-sell-node-api.vercel.app/api/book/all').then(res => {
            setBooks(res.data.result);
        });
    }, [])
    return (
        <>
            <div className='flex flex-col h-screen justify-between'>
                <div>
                    <Header />

                    <div className='w-8/12 mx-auto text-center text-4xl mt-6 mb-7'>
                        <span className='text-gray-700 font-semibold'>Book Listing
                        </span>
                    </div>

                    {books && books.length > 0 && (



                        <div className='w-8/12 mx-auto  mt-6 mb-7  flex gap-3 justify-evenly'>
                            {books.map(book=>(
                            <ProductCard base64image={book.base64image} name={book.name} category={book.category} description={book.description} price={book.price} />
                            ))}
                        </div>
                    )}








                </div>
                <Footer />
            </div>

        </>
    )
}

export default Products