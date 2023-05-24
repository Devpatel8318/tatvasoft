import React from 'react'

function Footer() {
  return (
    <div className='fixed bottom-0 py-12 w-full  bg-gray-200 flex justify-center items-center'>
      <div className='flex flex-col items-center gap-5'>
        <div className='w-40'>
          <img src="https://bookstore-sooty.vercel.app/static/media/site-logo.005b78aa01d0b4eadda3fa91c02202c5.svg" alt="" />
        </div>
        <div className='text-gray-400 text-xs'>
          © 2015 Tatvasoft.com. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Footer