import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='w-full bg-gray-900 text-white'>
      <div className='flex justify-between items-center h-24 px-4'>
        {/* Logo */}
        <h1 className='text-3xl font-bold text-[#00df9a]'>
          <Link to="/home">Driving License Renewal.</Link>
        </h1>

        {/* Desktop Menü */}
        <ul className='hidden md:flex'>
          <li className='p-4'>
            <Link to="/home" className='hover:text-[#00df9a] transition duration-300'>Home</Link>
          </li>
          <li className='p-4'>
            <Link to="/company" className='hover:text-[#00df9a] transition duration-300'>Company</Link>
          </li>
          <li className='p-4'>
            <Link to="/contact" className='hover:text-[#00df9a] transition duration-300'>Contact</Link>
          </li>
          <li className='p-2 px-6 border-2 border-[#00df9a] rounded-full transition duration-300 hover:bg-[#00df9a] hover:text-black hover:border-transparent'>
            <Link to="/login" className='font-semibold'>Login</Link>
          </li>
          
        </ul>

        {/* Mobil Menü Butonu */}
        <div onClick={handleNav} className='block md:hidden cursor-pointer'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
      </div>

      {/* Mobil Menü */}
      <div
        className={
          nav
            ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-50'
            : 'fixed left-[-100%]'
        }
      >
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>Driving License Renewal.</h1>
        <ul className='uppercase p-4'>
          <li className='p-4 border-b border-gray-600 hover:text-[#00df9a] transition duration-300'>
            <Link to="/home" onClick={handleNav}>Home</Link>
          </li>
          <li className='p-4 border-b border-gray-600 hover:text-[#00df9a] transition duration-300'>
            <Link to="/company" onClick={handleNav}>Company</Link>
          </li>
          <li className='p-4 border-b border-gray-600 hover:text-[#00df9a] transition duration-300'>
            <Link to="/contact" onClick={handleNav}>Contact</Link>
          </li>
          <li className='p-4 border-b border-gray-600 hover:text-[#00df9a] transition duration-300'>
            <Link to="/login" onClick={handleNav}>Login</Link>
          </li>
        </ul>
      </div>

      {/* Mobil Menü Overlay */}
      {nav && (
        <div
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-40'
          onClick={handleNav}
        ></div>
      )}
    </div>
  );
};

export default Navbar;