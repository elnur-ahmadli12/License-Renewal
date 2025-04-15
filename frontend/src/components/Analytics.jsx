import React from 'react';
import Laptop from '../assets/pexels-dom-j-7304-45113.jpg';
import { motion } from 'framer-motion';

const Analytics = () => {
  return (
    <div className='w-full bg-gradient-to-r from-gray-100 to-gray-200 py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8'>
        {/* Görsel */}
        <motion.img
          className='w-[500px] mx-auto my-4 rounded-lg shadow-2xl'
          src={Laptop}
          alt="/"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />

        {/* Metin ve Buton */}
        <motion.div
          className='flex flex-col justify-center'
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className='text-[#00df9a] font-bold text-lg'>Simplify Your Driving License Management</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl py-2'>
            Stay Ahead with Timely License Renewals
          </h1>
          <p className='text-gray-600'>
            Track your license expiration date and receive timely reminders. Avoid penalties and stay road-ready!
          </p>
          <button className='bg-gray-700 w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-white hover:bg-[#00df9a] hover:text-gray-800 transition duration-300'>
  Set Up Reminders
</button>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;