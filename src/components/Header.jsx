import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
      <div className='pt-10 text-red-500 text-lg'>
        <div className=' w-9/12 mx-auto flex items-center justify-between'>
          <div className='w-40'>
            <img src="https://bookstore-sooty.vercel.app/static/media/site-logo.005b78aa01d0b4eadda3fa91c02202c5.svg" alt="" />
          </div>
          <div className='flex gap-2'>
            <Link to={'/login'}>
              <span>login | </span>
            </Link>
            <Link to={'/register'}>
              <span>register</span>
            </Link>
            <button className='border ml-2 px-2  shadow-1 flex gap-2 justify-center items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              cart</button>
          </div>
        </div>
        <div className='bg-gray-200 mt-10 py-5'>
          <div className='mx-40 flex gap-2'>
            <input type="text" className='w-full rounded-md px-2' placeholder='What are you looking for?' name="" id="" />
            <button className='text-white text-sm items-center py-2 flex gap-1 px-4 rounded-md bg-green-500'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              Search </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header