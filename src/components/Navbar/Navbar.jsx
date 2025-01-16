import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faChartLine } from "@fortawesome/free-solid-svg-icons";
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
              icon={faBriefcase}
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
              className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2'
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
