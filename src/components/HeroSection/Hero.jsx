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
          </div>
          <div className='lg:col-span-5 flex items-center justify-center'>
            <img
              src={hero}
              alt='Hero'
              className='w-full max-w-lg h-auto lg:max-w-xl shadow-2xl'
            />
          </div>{" "}
        </div>
      </section>
    </div>
  );
};
