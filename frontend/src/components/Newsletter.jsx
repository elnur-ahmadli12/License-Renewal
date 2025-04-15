import React from 'react';

const Newsletter = () => {
  return (
    <div className='w-full py-16 text-white px-4 bg-gradient-to-r from-gray-800 to-gray-900'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-8'>
        {/* Sol Taraf: Metin */}
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Is your license about to expire? Renew it now!
          </h1>
          <p className='text-gray-300'>
            Apply online and save time. Get instant reminders and avoid penalties.
          </p>
        </div>

        {/* Sağ Taraf: Email Input ve Buton */}
        <div className='my-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              className='p-3 flex-grow rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#00df9a]'
              type="email"
              placeholder='Enter Email'
            />
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium ml-4 my-6 px-6 py-3 text-black hover:bg-[#00df9a] hover:text-white transition duration-300'>
              Notify Us
            </button>
          </div>
          <p className='text-gray-300 text-sm mt-2'>
            We care about the protection of your data. Read our{' '}
            <span className='text-[#00df9a] cursor-pointer hover:underline'>Privacy Policy.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;