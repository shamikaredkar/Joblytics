import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const EditModal = ({ toggleEditModal, application, onSave, user }) => {
  const [formData, setFormData] = useState({
    title: application?.title || "",
    company: application?.company || "",
    location: application?.location || "",
    status: application?.status || "",
    link: application?.link || "",
    notes: application?.notes || "",
    resume: null, // New file to be uploaded
    coverLetter: null, // New file to be uploaded
    existingResume: application?.resumeUrl || null, // Existing file URL
    existingCoverLetter: application?.coverLetterUrl || null, // Existing file URL
  });

  // Update formData when application prop changes
  useEffect(() => {
    if (application) {
      setFormData({
        title: application.title || "",
        company: application.company || "",
        location: application.location || "",
        status: application.status || "",
        link: application.link || "",
        notes: application.notes || "",
        existingResume: application.resumeUrl || null,
        existingCoverLetter: application.coverLetterUrl || null,
        resume: null,
        coverLetter: null,
      });
    }
  }, [application]);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { ...formData };
    try {
      if (formData.resume) {
        const resumePath = `Users/${user.email}/Jobs/${application.id}/Resume.pdf`;
        const storageRef = ref(getStorage(), resumePath);
        await uploadBytes(storageRef, formData.resume);
        updatedData.existingResume = await getDownloadURL(storageRef);
      }

      if (formData.coverLetter) {
        const coverLetterPath = `Users/${user.email}/Jobs/${application.id}/CoverLetter.pdf`;
        const storageRef = ref(getStorage(), coverLetterPath);
        await uploadBytes(storageRef, formData.coverLetter);
        updatedData.existingCoverLetter = await getDownloadURL(storageRef);
      }

      // Pass updated data and application ID to parent
      onSave(updatedData, application.id);
      toggleEditModal(); // Close modal
    } catch (error) {
      console.error("Error uploading files or updating application:", error);
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      aria-hidden='true'
    >
      <div className='relative w-full max-w-2xl p-4'>
        <div className='bg-white rounded-lg shadow'>
          {/* Modal Header */}
          <div className='flex items-center justify-between p-4 border-b rounded-t'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Edit Application
            </h3>
            <button
              type='button'
              className='text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg text-sm p-2'
              onClick={toggleEditModal}
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
          <form className='p-4' onSubmit={handleSubmit}>
            <div className='grid gap-4 mb-4 grid-cols-2'>
              {/* Title Input */}
              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='title'
                  className='block mb-2 text-sm font-medium'
                >
                  Title
                </label>
                <input
                  type='text'
                  name='title'
                  id='title'
                  className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='Software Developer'
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Company Input */}
              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='company'
                  className='block mb-2 text-sm font-medium'
                >
                  Company
                </label>
                <input
                  type='text'
                  name='company'
                  id='company'
                  className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='Google'
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Location Input */}
              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='location'
                  className='block mb-2 text-sm font-medium'
                >
                  Location
                </label>
                <input
                  type='text'
                  name='location'
                  id='location'
                  className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='California, LA'
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Status Select */}
              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='status'
                  className='block mb-2 text-sm font-medium'
                >
                  Status
                </label>
                <select
                  name='status'
                  id='status'
                  className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value='' disabled>
                    Select
                  </option>
                  <option value='Applied'>Applied</option>
                  <option value='Interview'>Interview</option>
                  <option value='Rejected'>Rejected</option>
                </select>
              </div>

              {/* Notes Input */}
              <div className='col-span-2'>
                <label
                  htmlFor='notes'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Notes
                </label>
                <textarea
                  name='notes'
                  id='notes'
                  rows='4'
                  className='block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Add Notes'
                  value={formData.notes}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              {/* Resume Section */}
              <div className='col-span-2'>
                <label
                  htmlFor='resume'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Resume
                </label>
                {formData.existingResume && (
                  <p className='text-sm text-blue-600 mb-2'>
                    <a
                      href={formData.existingResume}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline'
                    >
                      View Current Resume
                    </a>
                  </p>
                )}
                <input
                  type='file'
                  name='resume'
                  id='resume'
                  className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
                  onChange={handleFileChange}
                />
              </div>

              {/* Cover Letter Section */}
              <div className='col-span-2'>
                <label
                  htmlFor='coverLetter'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Cover Letter
                </label>
                {formData.existingCoverLetter && (
                  <p className='text-sm text-blue-600 mb-2'>
                    <a
                      href={formData.existingCoverLetter}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline'
                    >
                      View Current Cover Letter
                    </a>
                  </p>
                )}
                <input
                  type='file'
                  name='coverLetter'
                  id='coverLetter'
                  className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
