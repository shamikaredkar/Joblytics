import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Applications = () => {
  return (
    <section className='bg-white py-3 sm:py-5'>
      <div className='max-w-screen-xl mx-auto p-4'>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold'>Job Applications</h1>
          <div className='flex items-center bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-4 py-2'>
            <FontAwesomeIcon icon={faPlus} className='mr-2' />
            <button
              type='button'
              className='flex items-center text-sm font-medium text-white'
            >
              Add Application
            </button>
          </div>
        </div>
        <div className='relative overflow-hidden bg-white shadow-md sm:rounded-lg mt-4'>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-slate-100'>
                <tr>
                  <th scope='col' className='px-4 py-3'>
                    Application Date
                  </th>
                  <th scope='col' className='px-4 py-3'>
                    Job Title
                  </th>
                  <th scope='col' className='px-4 py-3'>
                    Company Name
                  </th>
                  <th scope='col' className='px-4 py-3'>
                    Job Location
                  </th>
                  <th scope='col' className='px-4 py-3'>
                    Status
                  </th>
                  <th scope='col' className='px-4 py-3'>
                    Job Link
                  </th>
                  <th scope='col' className='px-4 py-3'>
                    Notes
                  </th>
                  <th scope='col' className='px-4 py-3'>
                    Resume Used
                  </th>
                  <th scope='col' className='px-4 py-3'>
                    Cover Letter Used
                  </th>
                  <th scope='col' className='px-4 py-3'></th>
                </tr>
              </thead>
            </table>
          </div>
          <div className='flex justify-between px-4 py-3 bg-white'>
            <p className='text-sm text-gray-700'>Showing 1 of 1</p>
            <div className='flex items-center space-x-2'>
              <button className='px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300'>
                Previous
              </button>
              <button className='px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300'>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
