import React, { useState } from "react";
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputModal } from "./InputModal"; // Import the InputModal component

export const Applications = () => {
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [applications, setApplications] = useState([]);

  const toggleModal = () => {
    setModalOpen(!modalOpen); // Toggle modal visibility
  };
  const addApplication = (newApplication) => {
    setApplications((prev) => [...prev, newApplication]); // Add new application to the state
    toggleModal(); // Close modal after adding
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
                    Job Title
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Company Name
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Location
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Status
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Link
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Notes
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Resume
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Cover Letter
                  </th>
                  <th scope='col' className='px-5 py-4'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={index} className='border-b hover:bg-gray-100'>
                    <td className='px-5 py-4 truncate max-w-xs'>{app.title}</td>
                    <td className='px-5 py-4 truncate max-w-xs'>
                      {app.company}
                    </td>
                    <td className='px-5 py-4 truncate max-w-xs'>
                      {app.location}
                    </td>
                    <td className='px-5 py-4'>
                      <span
                        className={`py-1 px-5 rounded-full text-xs font-medium ${
                          app.status === "Rejected"
                            ? "bg-red-100 text-red-600"
                            : app.status === "Interview"
                            ? "bg-yellow-100 text-yellow-600"
                            : app.status === "Applied"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600" // Default for unknown statuses
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className='px-5 py-4 break-all'>
                      <a
                        href={app.link}
                        className='text-blue-600 hover:underline'
                      >
                        {app.link || "N/A"}
                      </a>
                    </td>
                    <td className='px-5 py-4 break-words max-w-xs'>
                      {app.notes || "N/A"}
                    </td>
                    <td className='px-5 py-4 truncate max-w-xs'>
                      {app.resume ? app.resume.name : "N/A"}
                    </td>
                    <td className='px-5 py-4 truncate max-w-xs'>
                      {app.coverLetter ? app.coverLetter.name : "N/A"}
                    </td>
                    <td className='flex justify-between px-5 py-4 truncate max-w-xs ml-2 mr-12'>
                      <button>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className='text-blue-600'
                        />
                      </button>
                      <button>
                        {" "}
                        <FontAwesomeIcon
                          icon={faTrash}
                          className='text-blue-600'
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className='flex justify-between px-4 py-3 bg-white'>
            <p className='text-sm text-gray-700'>
              Showing {applications.length} of {applications.length}
            </p>
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
      {modalOpen && (
        <InputModal toggleModal={toggleModal} onSave={addApplication} />
      )}
    </section>
  );
};
