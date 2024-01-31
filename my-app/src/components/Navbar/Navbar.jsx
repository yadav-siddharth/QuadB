import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex justify-center items-center space-x-8 h-[60px] bg-[#3652AD] text-white font-[Nunito,sans-serif] sticky top-0 z-10 '>
      <Link to='/' className='hover:text-gray-400'>Home</Link>
      <Link to='/show' className='hover:text-gray-400'>Show Summary</Link>
    </div>
  )
}

export default Navbar
