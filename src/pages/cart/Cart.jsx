import React from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { removeBook, increaseAmount, decreaseAmount, placeOrder } from '../../state/slice/cartSlice'
function Cart() {
    const dispatch = useDispatch();
    const userRedux = useSelector((state) => state.users.userName);
    const numberOfItems = useSelector((state) => state.cart.numberOfItems);
    const total = useSelector((state) => state.cart.total);
    const details = useSelector((state) => state.cart.details);


    if (!userRedux || userRedux === null) {
        return <Navigate to={'/login'} />
    }
    
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
                                                <button onClick={() => dispatch(decreaseAmount({ cartid: element.id, bookid: element.book.id, quantity: element.quantity, userRedux }))} className='aspect-square w-7 text-white bg-rose-500  flex justify-center items-center'>-</button>
                                                <div className='aspect-square w-7  flex justify-center items-center'>{element.quantity}</div>
                                                <button onClick={() => dispatch(increaseAmount({ cartid: element.id, bookid: element.book.id, quantity: element.quantity, userRedux }))} className='aspect-square w-7 text-white bg-rose-500  flex justify-center items-center'>+</button>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className='font-semibold'>
                                                MRP ₹{element.book.price}
                                            </div>
                                            <button onClick={() => dispatch(removeBook({ cartId:element.id, userRedux }))} className='mt-4  text-md text-rose-500'>
                                                remove
                                            </button>
                                            {/* {element.quantity} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='w-4/12 text-xl mx-auto mt-6 mb-7' >
                        <button onClick={() => dispatch(placeOrder({ numberOfItems, details, userRedux }))} className='bg-rose-500 rounded-sm text-white px-5 py-3 m-3'>
                            Place Order
                        </button>
                    </div>

                </div>

                <Footer />
            </div>

        </>
    );
}

export default Cart