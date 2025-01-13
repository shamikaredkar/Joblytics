import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

export const Keywords = () => {
  return (
    <>
      <section className='bg-white py-4 rounded-lg'>
        <h1
          href='#'
          className='block max-w-sm p-2 bg-white rounded-lg font-bold text-2xl'
        >
          Make Your Resume ATS Friendly
        </h1>
        <textarea
          id='message'
          rows='10'
          className='block mt-4 p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-400'
          placeholder='Paste job description here.'
        ></textarea>
        <button className='flex justify-center items-center w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm py-2 cursor-pointer mt-6'>
          <FontAwesomeIcon icon={faWandMagicSparkles} className='mr-2' />
          <p className='text-sm font-medium text-white'>Extract Keywords</p>
        </button>
        <div>
          <h2 className=' mt-4 text-md font-semibold'>Extracted Keywords:</h2>
        </div>
      </section>
    </>
  );
};
