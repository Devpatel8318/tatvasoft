import React from 'react'

function ProductCard({base64image,name,category,description,price}) {
    return (
        <card className="border mw25 w-full rounded-lg">
            <div className='rounded-xl overflow-hidden w-full'>
                <div className='hDev relative'>
                    <img src={base64image} className="object-cover w-full h-full absolute top-0 left-0" alt="imagess" />
                </div>
                <div className='p-2'>
                    <div className='text-2xl truncate overflow-hidden line-clamp-1 font-bold text-gray-700'>{name}</div>
                    <div className='text-gray-400'>{category}</div>
                    <div className='text-gray-800 truncate overflow-hidden line-clamp-2'>{description}</div>
                    <div className='mt-7 text-gray-400 text-xl'>MRP {price}</div>
                    <button className='bg-red-500 w-full rounded-md text-white mt-2 text-sm px-2 py-2'>ADD TO CART</button>
                </div>
            </div>
        </card>
    )
}

export default ProductCard