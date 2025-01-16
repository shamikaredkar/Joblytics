import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const [isSaving, setIsSaving] = useState(false);
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
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (!user || !user.email) {
        throw new Error("User is not logged in.");
      }

      const userEmail = user.email;
      const jobData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        status: formData.status,
        link: formData.link,
        notes: formData.notes,
      };

      const jobId = await addJobToUser(userEmail, jobData);
      const updatedJobData = { ...jobData };

      if (formData.resume) {
        const resumePath = `Users/${userEmail}/Jobs/${jobId}/Resume/Resume.pdf`;
        const resumeUrl = await uploadFile(formData.resume, resumePath);
        updatedJobData.resumeUrl = resumeUrl;
      }

      if (formData.coverLetter) {
        const coverLetterPath = `Users/${userEmail}/Jobs/${jobId}/CoverLetter/CoverLetter.pdf`;
        const coverLetterUrl = await uploadFile(
          formData.coverLetter,
          coverLetterPath
        );
        updatedJobData.coverLetterUrl = coverLetterUrl;
      }

      await addJobToUser(userEmail, updatedJobData, jobId);

      console.log("Job added with files successfully:", jobId);
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
      <div className='relative w-full max-w-2xl px-4 sm:px-6 md:px-8 lg:px-10'>
        <div className='bg-white rounded-lg shadow max-h-[calc(100vh-40px)] overflow-y-auto'>
          {/* Modal Header */}
          <div className='flex items-center justify-between p-4 border-b rounded-t'>
            <h3 className='text-lg sm:text-xl font-semibold text-gray-900'>
              New Application
            </h3>
            <button
              type='button'
              className='text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg text-sm p-2'
              onClick={toggleModal}
            >
              <FontAwesomeIcon icon={faTimes} />
              <span className='sr-only'>Close modal</span>
            </button>
          </div>

          {/* Modal Body */}
          <form className='p-4 sm:p-6 md:p-8' onSubmit={handleSubmit}>
            <div className='grid gap-4 sm:gap-6 md:gap-8 mb-4 sm:grid-cols-1 md:grid-cols-2'>
              {/* Title Input */}
              <div>
                <label
                  htmlFor='title'
                  className='block mb-2 text-sm font-medium'
                >
                  Title<sup className='text-red-600 font-bold'>*</sup>
                </label>
                <input
                  type='text'
                  name='title'
                  id='title'
                  className='bg-gray-50 border border-gray-300 text-sm sm:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='Software Developer'
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Company Input */}
              <div>
                <label
                  htmlFor='company'
                  className='block mb-2 text-sm font-medium'
                >
                  Company<sup className='text-red-600 font-bold'>*</sup>
                </label>
                <input
                  type='text'
                  name='company'
                  id='company'
                  className='bg-gray-50 border border-gray-300 text-sm sm:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='Google'
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Location Input */}
              <div>
                <label
                  htmlFor='location'
                  className='block mb-2 text-sm font-medium'
                >
                  Location<sup className='text-red-600 font-bold'>*</sup>
                </label>
                <input
                  type='text'
                  name='location'
                  id='location'
                  className='bg-gray-50 border border-gray-300 text-sm sm:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='California, LA'
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Status Select */}
              <div>
                <label
                  htmlFor='status'
                  className='block mb-2 text-sm font-medium'
                >
                  Status<sup className='text-red-600 font-bold'>*</sup>
                </label>
                <select
                  name='status'
                  id='status'
                  className='bg-gray-50 border border-gray-300 text-sm sm:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
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
                  className='block mb-2 text-sm font-medium'
                >
                  Link
                </label>
                <input
                  type='text'
                  name='link'
                  id='link'
                  className='bg-gray-50 border border-gray-300 text-sm sm:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='Paste link to the job'
                  value={formData.link}
                  onChange={handleInputChange}
                />
              </div>

              {/* Notes Input */}
              <div className='col-span-2'>
                <label
                  htmlFor='notes'
                  className='block mb-2 text-sm font-medium'
                >
                  Notes
                </label>
                <textarea
                  name='notes'
                  id='notes'
                  rows='4'
                  className='block w-full p-2.5 text-sm sm:text-base bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Add Notes'
                  value={formData.notes}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {/* Resume Upload */}
              <div className='col-span-2'>
                <label
                  htmlFor='resume'
                  className='block mb-2 text-sm font-medium'
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
                  className='block mb-2 text-sm font-medium'
                >
                  Cover Letter
                </label>
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
              className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4'
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
