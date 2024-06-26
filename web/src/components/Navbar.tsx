import React, { useState } from "react";
import { Link } from 'react-router-dom';

interface NavbarProps {
  title?: string;
  links?: { href: string; text: string }[];
}

const Navbar: React.FC<NavbarProps> = (props:NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Logo or brand name */}
              <h1 className="text-xl">{props.title}</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* Navigation Links */}
                {
                    props.links?.map( (link, index) => (
                            <Link key={index} to={link.href} className="px-3 py-2 rounded-md text-sm font-medium">
                                {link.text}
                            </Link>
                    ))
                }
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {
                    props.links?.map( (link, index) => ( 
                            <Link key={index}  to={link.href} className="block px-3 py-2 rounded-md text-base font-medium">
                                {link.text}
                            </Link>
                    ))
                }

            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
