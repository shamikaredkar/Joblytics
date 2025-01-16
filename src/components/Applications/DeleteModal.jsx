import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faExclamationTriangle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export const DeleteModal = ({ isOpen, toggleModal, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50'
      aria-hidden='true'
    >
      <div className='relative p-4 w-full max-w-md max-h-full'>
        <div className='relative bg-white rounded-lg shadow'>
          {/* Close button */}
          <button
            onClick={toggleModal}
            className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center'
          >
            <FontAwesomeIcon icon={faTimes} />
            <span className='sr-only'>Close modal</span>
          </button>

          {/* Modal body */}
          <div className='p-4 md:p-5 text-center'>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className='text-4xl text-red-400 p-2'
            />
            <h3 className='mb-5 text-lg font-normal text-gray-500'>
              Are you sure you want to delete this row?
            </h3>
            <button
              onClick={onConfirm}
              className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
            >
              Yes, I'm sure
            </button>
            <button
              onClick={toggleModal}
              className='py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100'
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
