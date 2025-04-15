import React from 'react';
import Single from '../assets/single.png';
import Double from '../assets/double.png';
import Triple from '../assets/triple.png';

const Card = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
        {/* Basic Plan */}
        <div className='w-full shadow-2xl flex flex-col p-6 my-4 rounded-lg hover:scale-105 duration-300 bg-gradient-to-b from-gray-100 to-white'>
          <img className='w-20 mx-auto mt-[-3rem] bg-white p-2 rounded-full shadow-lg' src={Single} alt="/" />
          <h2 className='text-2xl font-bold text-center py-8'>Basic Plan</h2>
          <p className='text-center text-4xl font-bold'>$49</p>
          <div className='text-center font-medium text-gray-600'>
            <p className='py-4 border-b mx-8'>Standard processing time (7-10 days)</p>
            <p className='py-4 border-b mx-8'>Online application support</p>
            <p className='py-4 border-b mx-8'>Email updates</p>
          </div>
          <button className='bg-gray-700 w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white hover:bg-[#00df9a] hover:text-gray-800 transition duration-300'>
            Start Trial
          </button>
        </div>

        {/* Standard Plan */}
        <div className='w-full shadow-2xl flex flex-col p-6 md:my-0 my-8 rounded-lg hover:scale-105 duration-300 bg-gradient-to-b from-gray-100 to-white'>
          <img className='w-20 mx-auto mt-[-3rem] bg-white p-2 rounded-full shadow-lg' src={Double} alt="/" />
          <h2 className='text-2xl font-bold text-center py-8'>Standard Plan</h2>
          <p className='text-center text-4xl font-bold'>$99</p>
          <div className='text-center font-medium text-gray-600'>
            <p className='py-4 border-b mx-8'>Expedited processing time (3-5 days)</p>
            <p className='py-4 border-b mx-8'>Live customer support</p>
            <p className='py-4 border-b mx-8'>SMS and email notifications</p>
          </div>
          <button className='bg-gray-700 w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white hover:bg-[#00df9a] hover:text-gray-800 transition duration-300'>
            Start Trial
          </button>
        </div>

        {/* Premium Plan */}
        <div className='w-full shadow-2xl flex flex-col p-6 my-4 rounded-lg hover:scale-105 duration-300 bg-gradient-to-b from-gray-100 to-white'>
          <img className='w-20 mx-auto mt-[-3rem] bg-white p-2 rounded-full shadow-lg' src={Triple} alt="/" />
          <h2 className='text-2xl font-bold text-center py-8'>Premium Plan</h2>
          <p className='text-center text-4xl font-bold'>$149</p>
          <div className='text-center font-medium text-gray-600'>
            <p className='py-4 border-b mx-8'>Priority processing (1-2 days)</p>
            <p className='py-4 border-b mx-8'>Dedicated personal assistant</p>
            <p className='py-4 border-b mx-8'>Full document review and approval</p>
          </div>
          <button className='bg-gray-700 w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white hover:bg-[#00df9a] hover:text-gray-800 transition duration-300'>
            Start Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;