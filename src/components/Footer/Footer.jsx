import React from "react";

export const Footer = () => {
  return (
    <footer className='bg-white-100 rounded-lg'>
      <div className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
        {/* Text Section */}
        <span className='text-sm text-blue-700 sm:text-center'>
          © 2025{" "}
          <a href='#' className='hover:underline'>
            Joblytics™
          </a>
          . Made with &#9829; by Shamika Redkar
        </span>
        {/* Links Section */}
        <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-blue-700 sm:mt-0'>
          <li>
            <a
              href='https://github.com/shamikaredkar'
              target='_blank'
              className='hover:underline me-4 md:me-6'
            >
              Github
            </a>
          </li>
          <li>
            <a
              href='https://www.linkedin.com/in/shamika-redkar'
              target='_blank'
              className='hover:underline me-4 md:me-6'
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href='mailto:redkars@sheridancollege.ca'
              className='hover:underline'
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
