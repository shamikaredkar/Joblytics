import React from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { UserAuth } from "../../assets/utils/Auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addJobToUser } from "../../assets/utils/firestoreService";
export const InputModal = ({ toggleModal, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    status: "",
    link: "",
    notes: "",
    resume: null,
    coverLetter: null,
  });

  const [isSaving, setIsSaving] = useState(false); // State to track saving progress

  // Get the logged-in user's details
  const { user } = UserAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const uploadFile = async (file, path) => {
    const storage = getStorage();
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file); // Upload file
    return await getDownloadURL(fileRef); // Get file URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (!user || !user.email) {
        throw new Error("User is not logged in.");
      }

      const userEmail = user.email;

      // Step 1: Create the Firestore document and get the jobId
      const jobData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        status: formData.status,
        link: formData.link,
        notes: formData.notes,
      };

      const jobId = await addJobToUser(userEmail, jobData);

      // Step 2: Upload files to Firebase Storage
      const updatedJobData = { ...jobData }; // Copy initial job data

      if (formData.resume) {
        const resumePath = `Users/${userEmail}/Jobs/${jobId}/Resume/Resume.pdf`;
        const resumeUrl = await uploadFile(formData.resume, resumePath);
        updatedJobData.resumeUrl = resumeUrl; // Add resume URL to job data
      }

      if (formData.coverLetter) {
        const coverLetterPath = `Users/${userEmail}/Jobs/${jobId}/CoverLetter/CoverLetter.pdf`;
        const coverLetterUrl = await uploadFile(
          formData.coverLetter,
          coverLetterPath
        );
        updatedJobData.coverLetterUrl = coverLetterUrl; // Add cover letter URL to job data
      }

      // Step 3: Update the Firestore document with file URLs
      await addJobToUser(userEmail, updatedJobData, jobId); // Update the same document

      console.log("Job added with files successfully:", jobId);

      // Call parent onSave to update the UI
      onSave({ id: jobId, ...updatedJobData });
      toggleModal();
    } catch (error) {
      console.error("Error saving job:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      aria-hidden='true'
    >
      <div className='relative w-full max-w-2xl p-4'>
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
          <form className='p-4' onSubmit={handleSubmit}>
            <div className='grid gap-4 mb-4 grid-cols-2'>
              {/* Title Input */}
              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='title'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Title<sup className='text-red-600 font-bold'>*</sup>
                </label>
                <input
                  type='text'
                  name='title'
                  id='title'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
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
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Company<sup className='text-red-600 font-bold'>*</sup>
                </label>
                <input
                  type='text'
                  name='company'
                  id='company'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
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
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Location<sup className='text-red-600 font-bold'>*</sup>
                </label>
                <input
                  type='text'
                  name='location'
                  id='location'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
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
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Status<sup className='text-red-600 font-bold'>*</sup>
                </label>
                <select
                  name='status'
                  id='status'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value='' disabled>
                    Select
                  </option>
                  <option value='Shortlist'>Shortlist</option>

                  <option value='Applied'>Applied</option>
                  <option value='Interview'>Interview</option>
                  <option value='Rejected'>Rejected</option>
                </select>
              </div>

              {/* Link Input */}
              <div className='col-span-2'>
                <label
                  htmlFor='link'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Link
                </label>
                <input
                  type='text'
                  name='link'
                  id='link'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='Paste link to the job'
                  value={formData.link}
                  onChange={handleInputChange}
                />
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

              {/* Resume Upload */}
              <div className='col-span-2'>
                <label
                  htmlFor='resume'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Resume
                </label>
                <input
                  type='file'
                  name='resume'
                  id='resume'
                  className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
                  onChange={handleFileChange}
                />
              </div>

              {/* Cover Letter Upload */}
              <div className='col-span-2'>
                <label
                  htmlFor='coverLetter'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Cover Letter
                </label>
                <div className='flex items-center justify-center w-full'></div>
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
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
