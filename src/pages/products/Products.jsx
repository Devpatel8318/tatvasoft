import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import { CartContext } from '../../context/CartContext';
import ReactPaginate from "react-paginate";
import { UserContext } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';

function Products() {

    const [books, setBooks] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const currentPage = useRef();
    const [totalbooks, setTotalBooks] = useState([]);

    const { user } = useContext(UserContext);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        currentPage.current = 1;
        getPaginatedUsers();
    }, []);

    function handlePageClick(e) {
        currentPage.current = e.selected + 1;
        getPaginatedUsers();
    }

    function getPaginatedUsers() {
        axios
            .get(
                `https://book-e-sell-node-api.vercel.app/api/book?pageSize=4&pageIndex=${currentPage.current}`
            )
            .then((res) => {
                setPageCount(res.data.result.totalPages);
                setBooks(res.data.result.items);
                setTotalBooks(res.data.result.totalItems);
            });
    }

    const { setNumberOfItems } = useContext(CartContext);

    function handleAddToCart(id) {
        // console.log("clicked");
        addToCart(id);
    }

    if (!user || user === null) {
        return <Navigate to={'/login'} />
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
                        <h2 className='mx-auto text-center '>Total Items : {totalbooks}</h2>

                        <div className="grid sm:px-2 md:px-10 lg:px-30 px-2 grid-cols-2 mt-8 gap-x-2 gap-y-8 sm:gap-x-4 sm:gap-y-8 md:gap-x-6 md:gap-y-8 md:grid-cols-3 lg:grid-cols-4">

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
                                                <button className='bg-red-500 w-full rounded-md text-white mt-auto text-sm px-2 py-2' onClick={() => handleAddToCart(book.id)}>ADD TO CART</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< "
                        renderOnZeroPageCount={null}
                        containerClassName="pagination justify-content-center pagination-lg"
                        pageClassName=""
                        pageLinkClassName="rounded-full p-4 h-2 w-2 flex items-center justify-center"
                        previousClassName="rounded-full p-4 h-2 w-2 flex items-center justify-center"
                        previousLinkClassName="rounded-full p-4 h-2 w-2 flex items-center justify-center"
                        nextClassName="rounded-full p-4 h-2 w-2 flex items-center justify-center"
                        nextLinkClassName="rounded-full p-4 h-2 w-2 flex items-center justify-center"
                        activeClassName="text-white bg-rose-500 rounded-full p-4 h-2 w-2 flex items-center justify-center"
                        className=' flex mb-6 items-center justify-center gap-5 p-4'
                    />


                </div>


                <Footer />
            </div>

        </>
    )
}

export default Products