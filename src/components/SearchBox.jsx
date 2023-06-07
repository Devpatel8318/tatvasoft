import React, {  useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { CartContext } from '../context/CartContext';
function SearchBox() {
    const inputRef = useRef(null);
    const [isInputClicked, setIsInputClicked] = useState(false);

    const [input, setinput] = useState("");
    const [results, setResults] = useState([]);
    const [openSearchResult, setOpenSearchResult] = useState(false);
    const {addToCart } = useContext(CartContext);

    function handleAddToCart(id) {
        // console.log("clicked");
        addToCart(id);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsInputClicked(false);
            }
        }

        function handleEscapeKey(event) {
            if (event.key === 'Escape') {
                setIsInputClicked(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);





    const fetchData = async (value) => {
        axios
            .get(
                `https://book-e-sell-node-api.vercel.app/api/book/search?keyword=${value}`
            )
            .then((res) => {
                setResults(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (value) => {
        setinput(value);
        fetchData(value);
        setOpenSearchResult(true);
    };


    return (
        <>
            <div className='relative'>
                <div className='bg-gray-200 mt-10 py-5'>
                    <div className=' flex gap-2 w-1/2 mx-auto'>
                        <div className='flex flex-col relative items-center w-full'>
                            <input type="text" className='w-full rounded-sm px-2 border-lg'
                                placeholder='What are you looking for?'
                                value={input}
                                onChange={(e) => handleChange(e.target.value)}
                                onClick={() => setIsInputClicked(true)}
                                ref={inputRef}
                            />
                        </div>
                    </div>
                </div>
                {results.length > 0 && isInputClicked && (
                    <div className='w-1/2 mx-auto absolute left-[50%] transform -translate-x-1/2 bg-white -mt-5 p-4 rounded-sm border shadow-lg'>
                        {
                            openSearchResult && (
                                <div className='' >
                                    {results?.length > 0 &&
                                        results.map((result, id) => {
                                            return (
                                                <div key={id} className="flex justify-between py-2 items-center">
                                                    <div > {result.name} </div>
                                                    <div className="flex flex-col text-sm">
                                                        <div>{result.price}</div>
                                                        <button type="submit" className='text-red-500' onClick={() => handleAddToCart(result.id)} >Add to cart</button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            )
                        }
                    </div>
                )}

            </div>


        </>




    )
}

export default SearchBox