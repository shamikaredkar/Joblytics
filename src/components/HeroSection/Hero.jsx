import React from "react";
import hero from "../../assets/Hero.png";

export const Hero = () => {
  return (
    <div>
      <section className='bg-white'>
        <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
          {/* Left Content */}
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-900'>
              Your job search companion, every step of the way
            </h1>
            <p className='max-w-2xl mb-6 font-regular text-gray-500 lg:mb-8 md:text-lg lg:text-xl'>
              Streamline your job search with Joblytics, a powerful job
              application tracker. Manage applications, optimize resumes with
              AI, track progress, and stay organized—all in one place.
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800'
              >
                Get started
                <svg
                  className='w-5 h-5 ml-2 -mr-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </a>
              <a
                href='#'
                className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100'
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Content: Image with SVG Background */}
          <div className='relative hidden lg:mt-0 lg:col-span-5 lg:flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 240 225'
              className='w-[1000px] h-[500px]'
            >
              {/* Define the Clipping Path */}
              <defs>
                <clipPath id='clipShape'>
                  <path
                    d='M123.63,4.78C58.88,12.27,34.28-11.9,13.02,15.7C-4.75,38.48-14.32,153.77,63.69,188.97
          c68.24,30.8,138.63-9.43,172.27-78.99C255.75,69.05,193.75-5.76,123.63,4.78z'
                  >
                    <animate
                      attributeName='d'
                      dur='8s'
                      repeatCount='indefinite'
                      values='M123.63,4.78C58.88,12.27,34.28-11.9,13.02,15.7C-4.75,38.48-14.32,153.77,63.69,188.97
              c68.24,30.8,138.63-9.43,172.27-78.99C255.75,69.05,193.75-5.76,123.63,4.78z;

              M123.63,4.78C41.5,14.05,29.65-14.91,13.02,15.7C-7,52.55-6.32,204.81,63.69,188.97
              c74.81-16.92,143.01-7.48,172.27-78.99C252.5,69.55,212.5-8.45,123.63,4.78z;

              M123.63,4.78C41.5,14.05,16.11-16.94,13.02,15.7C3,121.55,0.78,223.54,63.69,188.97
              c86.31-47.42,155.03-3.67,172.27-78.99C247.5,59.55,219.5-17.95,123.63,4.78z;

              M123.63,4.78C41.5,14.05,29.65-14.91,13.02,15.7C-7,52.55-6.32,204.81,63.69,188.97
              c74.81-16.92,143.01-7.48,172.27-78.99C252.5,69.55,212.5-8.45,123.63,4.78z;

              M123.63,4.78C58.88,12.27,34.28-11.9,13.02,15.7C-4.75,38.48-14.32,153.77,63.69,188.97
              c68.24,30.8,138.63-9.43,172.27-78.99C255.75,69.05,193.75-5.76,123.63,4.78z;'
                    />
                  </path>
                </clipPath>
              </defs>

              {/* Image Clipped to Shape */}
              <image
                href={hero}
                width='240'
                height='225'
                clipPath='url(#clipShape)'
                preserveAspectRatio='xMidYMid slice'
              />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};
