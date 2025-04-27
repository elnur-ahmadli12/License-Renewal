import React, { useState, useEffect, useRef } from 'react';
import { BsLayoutSidebarInset } from 'react-icons/bs';
import { IoHomeOutline } from 'react-icons/io5';
import { CiDeliveryTruck, CiUser } from 'react-icons/ci';
import { CgWebsite } from 'react-icons/cg';
import { TfiLayoutMenuV } from 'react-icons/tfi';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';  // Re-added Email icon import
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Sidebar({ isSidebarOpen, sidebarRef }) {
    const [activeLink, setActiveLink] = useState('Home');
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const [showScrollDownArrow, setShowScrollDownArrow] = useState(false);

    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const checkOverflow = () => {
            const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight;
            setShowScrollDownArrow(container.scrollHeight > container.clientHeight && !atBottom);
        };
        container.addEventListener('scroll', checkOverflow);
        checkOverflow();
        return () => container.removeEventListener('scroll', checkOverflow);
    }, [isSidebarOpen]);

    const handleMouseDown = e => {
        const container = containerRef.current;
        setIsDragging(true);
        setStartX(e.clientX);
        setStartY(e.clientY);
        setScrollLeft(container.scrollLeft);
        setScrollTop(container.scrollTop);
        container.style.cursor = 'grabbing';
        e.preventDefault();
    };

    const handleMouseMove = e => {
        if (!isDragging) return;
        const container = containerRef.current;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        container.scrollLeft = scrollLeft - dx;
        container.scrollTop = scrollTop - dy;
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        const container = containerRef.current;
        setIsDragging(false);
        container.style.cursor = 'grab';
    };

    return (
        <div
            ref={sidebarRef}
            className={`fixed top-8 z-[101] transition-all duration-400 ease-in-out
        ${isSidebarOpen ? 'right-0' : '-right-full'}
         p-8 w-[190px] h-full
        lg:left-0 lg:top-[4rem] lg:w-[123px] lg:transition-width lg:duration-400 bg-[#262626] ${isSidebarOpen ? 'lg:w-[220px]' : ''}`}
        >
            <nav className="flex flex-col h-full gap-6">
                <div className="flex items-center justify-center gap-2">
                    <BsLayoutSidebarInset className=" text-2xl text-[#00df9a]" />
                    <span className="text-[#00df9a] font-semibold text-xl hidden lg:block">
                        Driving License Renewal
                    </span>
                </div>

                <div
                    ref={containerRef}
                    className="relative flex-1 pt-8 overflow-x-hidden cursor-grab hide-scrollbar"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <div className="flex flex-col gap-2">
                        <Link
                            to="/home"
                            onClick={() => setActiveLink('Home')}
                            className={`relative grid grid-cols-[max-content_max-content] items-center gap-4 px-6 py-4 rounded
                                transition bg-transparent hover:bg-[#333333] ${
                                activeLink === 'Home' ? 'bg-[#333333]' : ''
                            }`}
                        >
                            <IoHomeOutline className="text-[#00df9a] text-xl" />
                            <span className="text-base font-medium hidden lg:block text-[#00df9a]">Home</span>
                        </Link>

                        <Link
                            to="/order"
                            onClick={() => setActiveLink('Order')}
                            className={`relative grid grid-cols-[max-content_max-content] items-center gap-4 px-6 py-4 rounded
                                transition bg-transparent hover:bg-[#333333] ${
                                activeLink === 'Order' ? 'bg-[#333333]' : ''
                            }`}
                        >
                            <CiDeliveryTruck className="text-[#00df9a] text-xl" />
                            <span className="text-base font-medium hidden lg:block text-[#00df9a]">Order</span>
                        </Link>

                        <Link
                            to="/items"
                            onClick={() => setActiveLink('Menu')}
                            className={`relative grid grid-cols-[max-content_max-content] items-center gap-4 px-6 py-4 rounded
                                transition bg-transparent hover:bg-[#333333] ${activeLink === 'Menu' ? 'bg-[#D5EEFD]' : ''}`}
                        >
                            <TfiLayoutMenuV className="text-[#00df9a] text-xl" />
                            <span className="text-base font-medium hidden lg:block text-[#00df9a]">Items</span>
                        </Link>

                        <Link
                            to="/users"
                            onClick={() => setActiveLink('Contact')}
                            className={`relative grid grid-cols-[max-content_max-content] items-center gap-4 px-6 py-4 rounded
                                transition bg-transparent hover:bg-[#333333] ${
                                activeLink === 'Contact' ? 'bg-[#333333]' : ''
                            }`}
                        >
                            <RiContactsBook2Fill className="text-[#00df9a] text-xl" />
                            <span className="text-base font-medium hidden lg:block text-[#00df9a]">Users</span>
                        </Link>

                        <Link
                            to="/website-ui"
                            onClick={() => setActiveLink('Email')}
                            className={`relative grid grid-cols-[max-content_max-content] items-center gap-4 px-6 py-4 rounded
                                transition bg-transparent hover:bg-[#333333] ${
                                activeLink === 'Email' ? 'bg-[#D5EEFD]' : ''
                            }`}
                        >
                            <CgWebsite className="text-[#00df9a] text-xl" />
                            <span className="text-base font-medium hidden lg:block text-[#00df9a]">Website UI</span>
                        </Link>
                    </div>

                    {showScrollDownArrow && (
                        <div
                            className="absolute bottom-2 left-1/2 -translate-x-1/2 cursor-pointer"
                            onClick={() => containerRef.current.scrollBy({ top: 100, behavior: 'smooth' })}
                        >
                            <FiChevronDown className="text-[#00df9a] text-2xl" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center p-2 bg-white rounded-full lg:bg-transparent lg:p-0">
                    <Link
                        to="/account-setting"
                        className="flex items-center justify-center w-12 h-12 bg-[#D5EEFD] rounded-full transition-transform hover:scale-105"
                    >
                        <CiUser className="text-[#00df9a] text-2xl" />
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;
