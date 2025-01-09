import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputModal } from "./InputModal"; // Import the InputModal component

export const Applications = () => {
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  const toggleModal = () => {
    setModalOpen(!modalOpen); // Toggle modal visibility
  };

  return (
    <section className='bg-white py-3 sm:py-5'>
      <div className='max-w-screen-xl mx-auto p-4'>
        {/* Header Section */}
        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold'>Job Applications</h1>
          <button
            className='flex items-center bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-4 py-2 cursor-pointer'
            onClick={toggleModal} // Open modal when clicked
          >
            <FontAwesomeIcon icon={faPlus} className='mr-2' />
            <p className='flex items-center text-sm font-medium text-white'>
              Add Application
            </p>
          </button>
        </div>

        {/* Table Section */}
        <div className='relative overflow-hidden bg-white shadow-md sm:rounded-lg mt-4'>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm text-left text-gray-500 table-fixed'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-300'>
                <tr>
                  <th scope='col' className='px-5 py-4'>
                    Application Date
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Job Title
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Company Name
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Job Location
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Status
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Job Link
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Notes
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Resume Used
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Cover Letter Used
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>{/* Rows will go here */}</tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className='flex justify-between px-4 py-3 bg-white'>
            <p className='text-sm text-gray-700'>Showing 0 of 0</p>
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

      {/* Render Modal */}
      {modalOpen && <InputModal toggleModal={toggleModal} />}
    </section>
  );
};
