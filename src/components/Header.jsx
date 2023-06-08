import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

function Header() {
  const { numberOfItems } = useContext(CartContext);

  const { setUser, user } = useContext(UserContext);



  return (
    <>
      <div className='pt-10  text-lg'>
        <div className=' w-9/12 mx-auto text-red-500 flex items-center justify-between'>
          <Link to={'/products'} className='w-40'>
            <img src="https://bookstore-sooty.vercel.app/static/media/site-logo.005b78aa01d0b4eadda3fa91c02202c5.svg" alt="" />
          </Link>

          <div className='flex gap-4'>
            <Link to={'/users'}>
              <span>Users  </span>
            </Link>
            <Link to={'/categories'}>
              <span>Categories  </span>
            </Link>
            <Link to={'/books'}>
              <span>Books  </span>
            </Link>
            <Link to={'/profile'}>
              <span>update Profile  </span>
            </Link>
            {!user && (
              <>
                <Link to={'/login'}>
                  <span>login  </span>
                </Link>
                <Link to={'/register'}>
                  <span>register</span>
                </Link>
              </>
            )}
            <Link to={'/cart'} className='border ml-2 px-2  shadow-1 flex gap-2 justify-center items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <div>{numberOfItems}</div>
              cart
            </Link>
            {user && (
              <button onClick={() => {
                window.localStorage.removeItem('user');
                setUser(null);
              }}>
                logout
              </button>
            )}
          </div>
        </div>
        <SearchBox />


      </div>
    </>
  )
}

export default Header