import React from "react";
import { AiFillCodeSandboxCircle, AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Header = ({ toggleSidebar, isSidebarOpen  }) => {

    return (
        <header className={`header fixed top-0 left-0 w-full backdrop-blur-lg z-[100] border-b border-white/20 bg-[#333333]`} id="sidebar-header">
            <div className={`header_container px-[2.2rem] flex justify-between items-center h-12 lg:h-16`}>
                <div
                    className={`header_toggle flex items-center justify-center text-[3rem] lg:text-[2rem] cursor-pointer`}
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? <AiOutlineClose className={"text-[#737373]"}/> : <AiOutlineMenu className={"text-[#737373]"} />}
                </div>

                <div className={`header_logo flex items-center justify-center text-[1.5rem] lg:text-[2rem] cursor-pointer`}>
                    <AiFillCodeSandboxCircle/>
                </div>
            </div>
        </header>
    );
};

export default Header;
