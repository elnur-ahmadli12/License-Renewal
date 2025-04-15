import React from 'react';
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className='text-white bg-gradient-to-r from-gray-800 to-gray-900 w-full h-screen'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <motion.p
          className='text-[#00df9a] font-bold p-2'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          REMEW IN MINUTES, DRİVE FOR YEARS
        </motion.p>
        <motion.h1
          className='md:text-5xl sm:text-3xl text-2xl font-bold md:py-6'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Never Miss a Renewal Again!
        </motion.h1>
        <div className='flex justify-center items-center'>
          <motion.p
            className='md:text-4xl sm:text-xl text-l font-bold py-4'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Get reminders for
          </motion.p>
          <ReactTyped
            className='md:text-4xl sm:text-xl text-l font-bold pl-2 md:pl-4 text-[#00df9a]'
            strings={[
              "Renewals.",
              "Deadlines.",
              "Registrations.",
            ]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <motion.p
          className='md:text-2xl text-xl font-bold text-gray-400 mt-4'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Renewing your license has never been this easy!
        </motion.p>
        <motion.button
          className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-black hover:bg-[#00a76f] hover:text-white transition duration-300'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          Set Your Reminder
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;