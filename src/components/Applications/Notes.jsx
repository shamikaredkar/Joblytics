import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const Notes = ({ isModalOpen, toggleModal, notes }) => {
  if (!isModalOpen) return null;

  return (
    <div
      className='fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50'
      aria-hidden='true'
    >
      <div className='relative p-6 w-full max-w-2xl bg-white rounded-lg shadow-md'>
        {/* Modal Header */}
        <div className='flex items-center justify-between border-b pb-4'>
          <h3 className='text-xl font-semibold text-gray-900'>Notes</h3>
          <button
            type='button'
            onClick={toggleModal}
            className='text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center'
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Modal Body */}
        <div className='p-4'>
          <p className='text-base text-gray-700'>
            {notes || "No notes available for this item."}
          </p>
        </div>
      </div>
    </div>
  );
};
