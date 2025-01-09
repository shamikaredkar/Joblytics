import React from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const InputModal = ({ toggleModal }) => {
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      aria-hidden='true'
    >
      <div className='relative w-full max-w-md p-4'>
        {/* Modal Content */}
        <div className='bg-white rounded-lg shadow'>
          {/* Modal Header */}
          <div className='flex items-center justify-between p-4 border-b rounded-t'>
            <h3 className='text-lg font-semibold text-gray-900'>
              New Application
            </h3>
            <button
              type='button'
              className='text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg text-sm p-2'
              onClick={toggleModal}
            >
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                ></path>
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>

          {/* Modal Body */}
          <form className='p-4'>
            <div className='grid gap-4 mb-4 grid-cols-2'>
              {/* Name Input */}
              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='price'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Title
                </label>
                <input
                  type='text'
                  id='price'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='Software Developer'
                  required
                />
              </div>

              {/* Category Input */}
              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='price'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Company
                </label>
                <input
                  type='text'
                  id='price'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='Google'
                  required
                />
              </div>

              {/* Price Input */}
              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='price'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Location
                </label>
                <input
                  type='text'
                  id='price'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='California, LA'
                  required
                />
              </div>

              {/* Category Input */}
              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='category'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Status
                </label>
                <select
                  id='category'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  defaultValue=''
                >
                  <option value='' disabled>
                    Select
                  </option>
                  <option value='TV'>Applied</option>
                  <option value='PC'>Interview</option>
                  <option value='GA'>Rejected</option>
                </select>
              </div>

              {/* Description Input */}
              <div className='col-span-2'>
                <label
                  htmlFor='description'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Link
                </label>
                <input
                  id='description'
                  rows='4'
                  className='block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Paste link to the job'
                ></input>
              </div>
              {/* Description Input */}
              <div className='col-span-2'>
                <label
                  htmlFor='description'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Notes
                </label>
                <textarea
                  id='description'
                  rows='4'
                  className='block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Add Notes'
                ></textarea>
              </div>
            </div>

            {/* Resume Upload */}
            <div className='col-span-2 mb-4'>
              <label
                htmlFor='resume'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Resume
              </label>
              <div className='flex items-center justify-center w-full'>
                <label
                  htmlFor='resume'
                  className='flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 border-gray-300 hover:bg-gray-100'
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <FontAwesomeIcon
                      icon={faUpload}
                      className='mr-2 text-gray-500'
                    />

                    <p className='mb-2 text-sm text-gray-500 pl-2 pr-2'>
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                  <input id='resume' type='file' className='hidden' />
                </label>
              </div>
            </div>
            {/* CoverLetter Upload */}
            <div className='col-span-2 mb-4'>
              <label
                htmlFor='resume'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Cover Letter
              </label>
              <div className='flex items-center justify-center w-full'>
                <label
                  htmlFor='resume'
                  className='flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 border-gray-300 hover:bg-gray-100'
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <FontAwesomeIcon
                      icon={faUpload}
                      className='mr-2 text-gray-500'
                    />

                    <p className='mb-2 text-sm text-gray-500 pl-2 pr-2'>
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                  <input id='resume' type='file' className='hidden' />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
