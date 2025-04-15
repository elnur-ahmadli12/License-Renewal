import React from 'react';
import Companypng from '../assets/company.jpg';
import { motion } from 'framer-motion';

const Company = () => {
  return (
    <section id="company" className="w-full py-16 bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Left: Image */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={Companypng}
            alt="Company"
            className="rounded-lg shadow-2xl w-full md:w-3/4 mx-auto md:mx-0 transform hover:scale-105 transition duration-300"
            style={{ filter: 'brightness(90%) contrast(110%)' }}
          />
        </motion.div>

        {/* Right: Text */}
        <motion.div
          className="md:w-1/2 md:pl-10 mt-6 md:mt-0"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-[#00df9a]">About Our Company</h2>
          <p className="mt-4 text-gray-300">
            At Driving License Renewal, we are dedicated to making license renewal and road tax payments as smooth as possible. Our mission is to eliminate the hassle of remembering deadlines and provide users with a seamless, automated reminder system.
          </p>
          <br />
          <h2 className="text-3xl font-bold text-[#00df9a]">🌍 Who We Are?</h2>
          <p className="mt-4 text-gray-300">
            We are a team of passionate developers committed to improving road safety and making life easier for vehicle owners. Whether you're an individual driver or a fleet manager, our platform helps you stay compliant without stress.
          </p>
          <br />
          <h2 className="text-3xl font-bold text-[#00df9a]">⚡ What We Offer?</h2>
          <p className="mt-4 text-gray-300">
            ✔ Smart Reminders – Never miss your license or road tax renewal deadline. <br />
            ✔ Easy Tracking – Keep all your renewal details in one place. <br />
            ✔ User-Friendly Interface – Simple, intuitive, and accessible from anywhere. <br />
            ✔ Multi-Vehicle Support – Manage multiple vehicles effortlessly.
          </p>
          <br />
          <h2 className="text-3xl font-bold text-[#00df9a]">🚀 Why Choose Us?</h2>
          <p className="mt-4 text-gray-300">
            🔹 Time-Saving – No more last-minute rush. <br />
            🔹 Accuracy – Get timely notifications to avoid penalties. <br />
            🔹 Secure & Reliable – Your data is safe with us.
          </p>
          <button className="mt-6 px-6 py-3 bg-[#00df9a] text-black font-semibold rounded-lg shadow-md hover:bg-[#00b87a] hover:text-white transition duration-300">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Company;