import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../assets/utils/firebase";
import { UserAuth } from "../../assets/utils/Auth";

export const ListModal = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [jobs, setJobs] = useState([]); // State to store jobs
  const [selectedJobId, setSelectedJobId] = useState(null); // Track selected job
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const entriesPerPage = 5;
  const { user } = UserAuth();

  // Close the modal
  const closeModal = () => {
    setIsVisible(false);
  };

  // Fetch jobs from Firestore
  useEffect(() => {
    const fetchJobs = async () => {
      if (!user || !user.email) return; // Ensure user is logged in

      try {
        const jobsRef = collection(db, "Users", user.email, "Jobs");
        const querySnapshot = await getDocs(jobsRef);
        const fetchedJobs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(fetchedJobs); // Store jobs in state
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [user]);

  // Prevent body scroll when modal is visible
  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isVisible]);

  // Pagination logic
  const totalPages = Math.ceil(jobs.length / entriesPerPage);
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleApply = () => {
    if (selectedJobId) {
      console.log("Applying for job with ID:", selectedJobId);
      // Add application logic here
    } else {
      alert("Please select a job to apply!");
    }
  };

  if (!isVisible) return null;

  return (
    <div
      id='select-modal'
      aria-hidden='true'
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300'
    >
      <div className='relative w-full max-w-md p-4'>
        {/* Modal Content */}
        <div className='bg-white rounded-lg shadow'>
          {/* Modal Header */}
          <div className='flex justify-between items-center p-4 border-b rounded-t'>
            <h3 className='text-lg font-semibold text-gray-900'>Your Jobs</h3>
            <button
              type='button'
              className='text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2'
              onClick={closeModal}
              aria-label='Close'
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Modal Body */}
          <div className='p-4'>
            <ul className='space-y-4'>
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <li key={job.id}>
                    <label
                      htmlFor={`job-${job.id}`}
                      className={`flex justify-between items-center p-5 bg-white border rounded-lg cursor-pointer hover:bg-gray-100 ${
                        selectedJobId === job.id
                          ? "border-blue-600"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedJobId(job.id)} // Set the selected job ID
                    >
                      <p
                        className={`text-lg font-semibold ${
                          selectedJobId === job.id
                            ? "text-blue-600"
                            : "text-gray-900"
                        }`}
                      >
                        {job.title || "No Title"}
                      </p>
                      <div className='text-right'>
                        <p className='text-gray-500 font-semibold'>
                          {job.company || "No Company"}
                        </p>
                        <p className='text-gray-400 text-sm'>
                          {job.location || "No Location"}
                        </p>
                      </div>
                    </label>
                  </li>
                ))
              ) : (
                <p className='text-center text-gray-500'>
                  No jobs found. Add some applications!
                </p>
              )}
            </ul>

            {/* Pagination */}
            <nav aria-label='Page navigation' className='mt-4'>
              <ul className='flex justify-center space-x-2'>
                <li>
                  <button
                    className={`px-3 py-1.5 text-sm rounded ${
                      currentPage === 1
                        ? "text-gray-500 cursor-not-allowed"
                        : "hover:bg-neutral-100 text-blue-600"
                    }`}
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      className={`px-3 py-1.5 text-sm rounded ${
                        currentPage === index + 1
                          ? "text-blue-600 underline "
                          : "bg-transparent hover:bg-neutral-100 text-gray-700"
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className={`px-3 py-1.5 text-sm rounded ${
                      currentPage === totalPages
                        ? "text-gray-500 cursor-not-allowed"
                        : "hover:bg-neutral-100 text-blue-600"
                    }`}
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </li>
              </ul>
            </nav>

            {/* Apply Button */}
            <button
              className='w-full text-blue-600 rounded-lg font-medium text-sm py-2.5 mt-4'
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
