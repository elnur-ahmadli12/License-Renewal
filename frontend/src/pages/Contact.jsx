import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="w-full py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Left Side - Contact Info */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-[#00df9a] mb-6">Contact Us</h2>
          <p className="text-gray-300 mb-4">
            If you have any questions about driving license renewal, feel free to contact us.
          </p>

          <div className="space-y-4">
            <p className="flex items-center">
              📍 <span className="ml-2">Final International University, Kyrenia, Northern Cyprus</span>
            </p>
            
            
            <p className="flex items-center">
              ✉ <span className="ml-2">support@drivingrenewal.com</span>
            </p>
          </div>

         
         
        </motion.div>

        {/* Right Side - Google Maps */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.0299853660154!2d33.358837875575325!3d35.33007687270256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de6b45150f5809%3A0xdc324b8f3a16d848!2sUluslararas%C4%B1%20Final%20%C3%9Cniversitesi%20%2F%20Final%20International%20University!5e0!3m2!1str!2s!4v1742237876785!5m2!1str!2s"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;