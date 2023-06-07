import React, { useContext } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CartContext } from '../../context/CartContext';

function Cart() {
    const { numberOfItems, total, details,removeBook,increaseAmount,decreaseAmount } = useContext(CartContext);
    return (
        <>
            <div className='flex flex-col h-screen justify-between'>
                <div>
                    <Header />
                    <div className='px-10 mt-10'>
                        <div className='w-8/12 mx-auto text-center text-4xl mt-6 mb-7'>
                            <span className='text-gray-700 font-semibold'>Cart Page
                            </span>
                        </div>
                    </div>
                    <div className='w-4/12 mx-auto text-center mt-6 mb-7  flex justify-between'>
                        <div>
                            My Shopping Bag ({numberOfItems} items)
                        </div>
                        <div>
                            Total price: {total}
                        </div>
                    </div>
                    <div className='w-4/12 mx-auto mt-6 mb-7 flex-col gap-2'>
                        {details && numberOfItems > 0 && details.map(element => (
                            <div key={element.id} className='border border-gray-400 rounded-md m-3 p-4'>
                                <div className='flex gap-5'>
                                    <div className='w-[130px] aspect-square flex shrink grow-0'>
                                        <img src={element.book.base64image} alt="imageOfBook" className='object-cover aspect-square' />
                                    </div>
                                    <div className='grow shrink-0 p-3  flex justify-between'>
                                        <div className=' flex flex-col'>
                                            <div className='text-xl font-bold'>
                                                {element.book.name}
                                            </div>
                                            <div className='mt-4 font-semibold flex'>
                                               <button onClick={()=>decreaseAmount(element.id,element.book.id,element.quantity)} className='aspect-square w-7 text-white bg-rose-500  flex justify-center items-center'>-</button>
                                               <div className='aspect-square w-7  flex justify-center items-center'>{element.quantity}</div>
                                               <button onClick={()=>increaseAmount(element.id,element.book.id,element.quantity)} className='aspect-square w-7 text-white bg-rose-500  flex justify-center items-center'>+</button>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className='font-semibold'>
                                                MRP ₹{element.book.price}
                                            </div>
                                            <button onClick={()=>removeBook(element.id)} className='mt-4  text-md text-rose-500'>
                                                remove
                                            </button>
                                            {/* {element.quantity} */}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                <Footer />
            </div>

        </>
    );
}

export default Cart