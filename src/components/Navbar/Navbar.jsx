import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { UserAuth } from "../../assets/utils/Auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log("Error signing in:", error);
    }
  };
  useEffect(() => {
    if (user != null) {
      navigate("/account");
    }
  }, [user]);
  return (
    <div>
      <nav className='bg-white border-gray-200'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          {/* Logo and App Name */}
          <a
            href='#'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <FontAwesomeIcon
              icon={faChartLine}
              className='text-blue-700 h-6 w-6'
            />
            <span className='self-center text-2xl font-semibold whitespace-nowrap text-gray-900'>
              Joblytics
            </span>
          </a>

          {/* CTA Section: Sign In and Get Started */}
          <div className='flex md:order-2 space-x-3'>
            <button
              onClick={handleSignIn}
              type='button'
              className='text-gray-700 font-bold hover:text-blue-700 font-medium rounded-lg text-sm px-4 py-2'
            >
              Sign In
            </button>
            <button
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2'
            >
              Get Started
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
            id='navbar-links'
          >
            <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white'>
              <li>
                <a
                  href='#features'
                  className='block py-2 px-3 md:p-0 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href='#demo'
                  className='block py-2 px-3 md:p-0 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'
                >
                  Demo
                </a>
              </li>
              <li>
                <a
                  href='#contact'
                  className='block py-2 px-3 md:p-0 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
