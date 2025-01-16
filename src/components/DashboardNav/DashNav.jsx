import React from "react";
import { UserAuth } from "../../assets/utils/Auth";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

export const DashNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { userSignOut, user } = UserAuth();
  const handleSignOut = async () => {
    try {
      await userSignOut();
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <>
      <nav className='bg-white border-gray-200'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          {/* Logo Section */}
          <h1
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
          </h1>

          {/* User Section */}
          <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative'>
            {/* Profile Picture and Dropdown */}
            <div className='relative'>
              <button
                type='button'
                className='flex text-sm bg-white rounded-full focus:ring-4 focus:ring-gray-300'
                id='user-menu-button'
                aria-expanded='false'
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className='sr-only'>Open user menu</span>
                <img
                  className='w-8 h-8 rounded-full'
                  src={user?.photoURL || "/default-user.png"}
                  alt='user photo'
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  className='absolute right-0 mt-2 w-48 z-50 bg-white divide-y border border-1 divide-gray-200 rounded-xl shadow'
                  id='user-dropdown'
                >
                  <div className='px-4 py-3'>
                    <span className='block text-sm text-gray-900'>
                      {user?.displayName || "Guest User"}
                    </span>
                    <span className='block text-sm text-gray-500 truncate'>
                      {user?.email || "guest@example.com"}
                    </span>
                  </div>
                  <ul className='py-2'>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:text-red-600'
                        onClick={handleSignOut}
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <hr />
    </>
  );
};
