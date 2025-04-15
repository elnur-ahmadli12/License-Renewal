import React from 'react';
import {
  FaDribbble,
  FaFacebookSquare,
  FaGithubSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // isteğe bağlı smooth scroll
    });
  };
  const companyAddress = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.0299853660154!2d33.358837875575325!3d35.33007687270256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de6b45150f5809%3A0xdc324b8f3a16d848!2sUluslararas%C4%B1%20Final%20%C3%9Cniversitesi%20%2F%20Final%20International%20University!5e0!3m2!1str!2s!4v1742237876785!5m2!1str!2s";

   // Telefon numarası
   const phoneNumber = "+905331234567";

   const handleVisitUs = () => {
    window.open(companyAddress, '_blank');
  };

  const handleCallUs = () => {
    window.location.href = `tel:${phoneNumber}`;
  };


  return (
    <div className='w-full bg-gray-800 py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-8 text-gray-300'>
        {/* Sol Taraf: Logo ve Sosyal Medya */}
        <div>
          <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Driving License Renewal.</h1>
          <p className='py-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
          <div className='flex justify-between md:w-[75%] my-6'>
            <FaFacebookSquare size={30} className='hover:text-[#00df9a] cursor-pointer' />
            
            
            <FaTwitterSquare size={30} className='hover:text-[#00df9a] cursor-pointer' />
            <FaInstagramSquare size={30} className='hover:text-[#00df9a] cursor-pointer' />
          </div>
        </div>

        {/* Sağ Taraf: Bağlantılar */}
        <div className='lg:col-span-2 flex justify-between mt-5'>
          {/* Home */}
          <div>
            <h6 className='font-medium text-gray-400'>Home</h6>
            <ul>
            <li className='py-2 text-sm hover:text-[#00df9a] cursor-pointer'>
              <Link 
                to="/company" 
                onClick={scrollToTop}
                className="hover:text-[#00df9a]"
              >
                About Us
              </Link>
            </li>
              <li className='py-2 text-sm hover:text-[#00df9a] cursor-pointer'>Services</li>
              <li className='py-2 text-sm hover:text-[#00df9a] cursor-pointer'>Blog</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h6 className='font-medium text-gray-400'>Company</h6>
            <ul>
              <li className='py-2 text-sm hover:text-[#00df9a] cursor-pointer'>Careers</li>
              <li className='py-2 text-sm hover:text-[#00df9a] cursor-pointer'>Partners</li>
              <li className='py-2 text-sm hover:text-[#00df9a] cursor-pointer'>Privacy Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h6 className='font-medium text-gray-400'>Contact</h6>
            <ul>
              <li className='py-2 text-sm hover:text-[#00df9a] cursor-pointer'>Email Us</li>
              <li 
                className='py-2 text-sm hover:text-[#00df9a] cursor-pointer'
                onClick={handleCallUs}
              >
                Call Us
              </li>
              <li 
                className='py-2 text-sm hover:text-[#00df9a] cursor-pointer'
                onClick={handleVisitUs}
              >
                Visit Us
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;