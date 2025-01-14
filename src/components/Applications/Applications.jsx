import React, { useState, useEffect } from "react";
import {
  faPenToSquare,
  faPlus,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputModal } from "./InputModal"; // Import the InputModal component
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../assets/utils/firebase";
import { UserAuth } from "../../assets/utils/Auth";
import { deleteJobFromUser } from "../../assets/utils/firestoreService";
import { EditModal } from "./EditModal";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const Applications = () => {
  let today = new Date().toISOString().slice(0, 10);
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Add Modal
  const [editModalOpen, setEditModalOpen] = useState(false); // Edit Modal
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null); // Track the application being edited
  const [editApplication, setEditApplication] = useState(null);
  const { user } = UserAuth(); // Get logged-in user details
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5; // Number of entries per page
  const totalPages = Math.ceil(applications.length / entriesPerPage);
  const paginatedApplications = applications.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
  const [jobs, setJobs] = useState([]);
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

  // Fetch job applications from Firestore
  useEffect(() => {
    const fetchApplications = async () => {
      if (!user || !user.email) return;

      try {
        const jobsRef = collection(db, "Users", user.email, "Jobs");
        const querySnapshot = await getDocs(jobsRef);
        const jobs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchApplications();
  }, [user]);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const toggleExpand = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, isExpanded: !app.isExpanded } : app
      )
    );
  };

  // Define handleRefresh function to re-fetch applications
  const handleRefresh = async () => {
    if (!user || !user.email) return;

    try {
      const jobsRef = collection(db, "Users", user.email, "Jobs");
      const querySnapshot = await getDocs(jobsRef);
      const jobs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setApplications(jobs); // Update the applications state
    } catch (error) {
      console.error("Error refreshing jobs:", error);
    }
  };

  const toggleEditModal = (application = null) => {
    setSelectedApplication(application); // Set the application being edited
    setEditModalOpen(!editModalOpen);
  };

  const addApplication = (newApplication) => {
    setApplications((prev) => [...prev, newApplication]);
    toggleModal();
  };

  const updateApplication = async (updatedData, jobId) => {
    if (!user || !user.email || !jobId) return;

    try {
      const storage = getStorage();

      // Check if files are included in updatedData
      if (updatedData.resume) {
        const resumePath = `Users/${user.email}/Jobs/${jobId}/Resume/Resume.pdf`;
        const resumeRef = ref(storage, resumePath);
        await uploadBytes(resumeRef, updatedData.resume); // Upload the file
        updatedData.existingResume = await getDownloadURL(resumeRef); // Get the URL
      }

      if (updatedData.coverLetter) {
        const coverLetterPath = `Users/${user.email}/Jobs/${jobId}/CoverLetter/CoverLetter.pdf`;
        const coverLetterRef = ref(storage, coverLetterPath);
        await uploadBytes(coverLetterRef, updatedData.coverLetter); // Upload the file
        updatedData.existingCoverLetter = await getDownloadURL(coverLetterRef); // Get the URL
      }

      // Remove file objects before Firestore update
      delete updatedData.resume;
      delete updatedData.coverLetter;

      // Update Firestore document
      const jobsRef = doc(db, "Users", user.email, "Jobs", jobId);
      await updateDoc(jobsRef, updatedData);

      // Update local state
      setApplications((prev) =>
        prev.map((app) => (app.id === jobId ? { ...app, ...updatedData } : app))
      );
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  const deleteApplication = async (jobId) => {
    if (!user || !user.email || !jobId) return;

    try {
      await deleteJobFromUser(user.email, jobId);
      setApplications((prev) => prev.filter((app) => app.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <section className='py-3 sm:py-5'>
      <div className='max-w-screen-xl mx-auto p-4'>
        {/* Header Section */}
        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold'>Job Applications</h1>
          <div className='flex gap-4'>
            <button onClick={handleRefresh}>
              <FontAwesomeIcon
                icon={faRefresh}
                className='mr-2 hover:text-blue-600'
              />
            </button>
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
        </div>

        {/* Table Section */}
        <div className='relative overflow-hidden bg-white shadow-md sm:rounded-lg mt-4'>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm text-left text-gray-500 table-fixed'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-200'>
                <tr>
                  <th scope='col' className='px-5 py-4'>
                    Date
                  </th>
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
                {paginatedApplications.length === 0 ? (
                  <tr>
                    <td colSpan='10' className='text-center py-4 border-b'>
                      No applications found. Add a new application!
                    </td>
                  </tr>
                ) : (
                  paginatedApplications.map((app) => (
                    <tr key={app.id} className='border-b hover:bg-gray-100'>
                      <td className='px-5 py-4 break-words whitespace-normal  truncate max-w-xs'>
                        {today}
                      </td>
                      <td className='px-5 py-4 break-words whitespace-normal max-w-xs'>
                        {app.title}
                      </td>

                      <td className='px-5 py-4 break-words whitespace-normal  truncate max-w-xs'>
                        {app.company}
                      </td>
                      <td className='px-5 py-4 break-words whitespace-normal  truncate max-w-xs'>
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
                              : app.status === "Shortlist"
                              ? "bg-gray-200 text-gray-700"
                              : "bg-gray-100 text-gray-600"
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
                        {app.notes && app.notes.length > 50 ? (
                          <>
                            {app.isExpanded
                              ? app.notes
                              : `${app.notes.slice(0, 50)}...`}
                            <button
                              onClick={() => toggleExpand(app.id)}
                              className='text-blue-600 hover:underline ml-2 text-sm'
                            >
                              {app.isExpanded ? "Less" : "More"}
                            </button>
                          </>
                        ) : (
                          app.notes || "N/A"
                        )}
                      </td>

                      <td className='px-5 py-4 truncate max-w-xs'>
                        {app.resumeUrl ? (
                          <a
                            href={app.resumeUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-600 hover:underline'
                          >
                            View
                          </a>
                        ) : (
                          "No File"
                        )}
                      </td>
                      <td className='px-5 py-4 truncate max-w-xs'>
                        {app.coverLetterUrl ? (
                          <a
                            href={app.coverLetterUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-600 hover:underline'
                          >
                            View
                          </a>
                        ) : (
                          "No File"
                        )}
                      </td>
                      <td className='flex items-center justify-start px-5 py-4 space-x-4'>
                        {/* Edit Button */}
                        <button
                          className='flex items-center justify-center rounded p-2 hover:bg-blue-100'
                          onClick={() => {
                            setEditApplication(app); // Pass the application being edited
                            setEditModalOpen(true);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className='text-blue-600'
                          />
                          <span className='sr-only'>Edit</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className='flex items-center justify-center rounded p-2 hover:bg-red-100'
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className='text-red-600'
                          />
                          <span className='sr-only'>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className='flex justify-between px-4 py-3 bg-white'>
            <p className='text-sm text-gray-700'>
              Showing {(currentPage - 1) * entriesPerPage + 1}-
              {Math.min(currentPage * entriesPerPage, applications.length)} of{" "}
              {applications.length}
            </p>
            <div className='flex items-center space-x-2'>
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === 1
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-blue-600"
                }`}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === totalPages
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-blue-600"
                }`}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render Add Modal */}
      {modalOpen && (
        <InputModal toggleModal={toggleModal} onSave={addApplication} />
      )}
      {/* Edit Modal */}
      {editModalOpen && (
        <EditModal
          toggleEditModal={() => setEditModalOpen(false)}
          application={editApplication} // Pass the application being edited
          onSave={updateApplication} // Pass the update function
          user={user}
        />
      )}
    </section>
  );
};
