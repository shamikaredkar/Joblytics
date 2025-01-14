import React from "react";

export const Score = () => {
  return (
    <>
      <section className='bg-white py-3 sm:py-5'>
        <h1 className='block max-w-sm p-2 bg-white rounded-lg font-bold text-2xl'>
          Get Your Resume Score
        </h1>
        <textarea
          id='message'
          rows='10'
          className='block mt-4 p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-400'
          placeholder='Paste job description here.'
        ></textarea>
        <input
          className='mt-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none'
          id='multiple_files'
          type='file'
          multiple
        />
      </section>
    </>
  );
};
