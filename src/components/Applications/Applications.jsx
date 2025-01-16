import React, { useState, useEffect } from "react";
import {
  faPenToSquare,
  faPlus,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faRefresh,
  faSearch,
  faFilter,
  faLink,
  faLinkSlash,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputModal } from "./InputModal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../assets/utils/firebase";
import { UserAuth } from "../../assets/utils/Auth";
import { deleteJobFromUser } from "../../assets/utils/firestoreService";
import { EditModal } from "./EditModal";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { DeleteModal } from "./DeleteModal";
import { Notes } from "./Notes";

export const Applications = () => {
  let today = new Date().toISOString().slice(0, 10);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [editApplication, setEditApplication] = useState(null);
  const { user } = UserAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;
  const totalPages = Math.ceil(applications.length / entriesPerPage);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState("");

  const toggleNotesModal = () => {
    setIsNotesModalOpen(!isNotesModalOpen);
  };

  const handleViewNotes = (notes) => {
    setSelectedNotes(notes);
    toggleNotesModal();
  };
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "newest" ? "oldest" : "newest"));
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const paginatedFilteredApplications = filteredApplications.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

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

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = applications.filter((app) =>
      app.company.toLowerCase().includes(value)
    );
    setFilteredApplications(filtered);
  };
  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  useEffect(() => {
    let sorted = [...applications];

    if (sortOrder === "newest") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter((app) =>
        app.company.toLowerCase().includes(searchTerm)
      );
    }

    if (filterStatus !== "All") {
      filtered = filtered.filter((app) => app.status === filterStatus);
    }

    setFilteredApplications(filtered);
  }, [applications, searchTerm, filterStatus, sortOrder]);

  const handleRefresh = async () => {
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
      console.error("Error refreshing jobs:", error);
    }
  };

  const toggleEditModal = (application = null) => {
    setSelectedApplication(application);
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

      if (updatedData.resume) {
        const resumePath = `Users/${user.email}/Jobs/${jobId}/Resume/Resume.pdf`;
        const resumeRef = ref(storage, resumePath);
        await uploadBytes(resumeRef, updatedData.resume);
        updatedData.existingResume = await getDownloadURL(resumeRef);
      }

      if (updatedData.coverLetter) {
        const coverLetterPath = `Users/${user.email}/Jobs/${jobId}/CoverLetter/CoverLetter.pdf`;
        const coverLetterRef = ref(storage, coverLetterPath);
        await uploadBytes(coverLetterRef, updatedData.coverLetter);
        updatedData.existingCoverLetter = await getDownloadURL(coverLetterRef);
      }

      delete updatedData.resume;
      delete updatedData.coverLetter;

      const jobsRef = doc(db, "Users", user.email, "Jobs", jobId);
      await updateDoc(jobsRef, updatedData);

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
  const confirmDelete = async () => {
    if (applicationToDelete) {
      try {
        // Call the delete function
        await deleteApplication(applicationToDelete);
        console.log(`Application ${applicationToDelete} deleted.`);
      } catch (error) {
        console.error("Error deleting application:", error);
      } finally {
        toggleDeleteModal(); // Close the modal
        setApplicationToDelete(null); // Reset the state
      }
    }
  };

  return (
    <section className='py-3 sm:py-5'>
      <div className='max-w-screen-xl mx-auto p-4'>
        {/* Header Section */}
        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold'>Job Applications</h1>
          <div className='flex gap-4 items-center'>
            <button
              className='h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-200 text-gray-700 font-medium rounded-lg px-4'
              onClick={handleRefresh}
            >
              <FontAwesomeIcon
                icon={faRefresh}
                className='hover:text-blue-600'
              />
            </button>

            <select
              id='underline_select'
              className='h-10 p-2 text-sm font-semibold text-gray-500 bg-white border rounded-lg'
              value={filterStatus}
              onChange={handleFilterChange}
            >
              <option value='All'>All</option>
              <option value='Shortlist'>Shortlist</option>
              <option value='Applied'>Applied</option>
              <option value='Interview'>Interview</option>
              <option value='Rejected'>Rejected</option>
            </select>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <FontAwesomeIcon icon={faSearch} className='text-blue-600' />
              </div>
              <input
                type='text'
                id='table-search'
                className='h-10 bg-white border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10 pr-4'
                placeholder='Search for company'
                onChange={handleSearch}
              />
            </div>
            <button
              className='h-10 flex items-center bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg px-4 cursor-pointer'
              onClick={toggleModal}
            >
              <FontAwesomeIcon icon={faPlus} className='mr-2' />
              <p className='text-sm font-medium'>Add Application</p>
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
                    <div className='flex items-center gap-2'>
                      <p> Date</p>
                      <FontAwesomeIcon
                        icon={faSort}
                        onClick={toggleSortOrder}
                        className='hover:text-blue-600 cursor-pointer'
                      />
                    </div>
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
                {paginatedFilteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan='10' className='text-center py-4 border-b'>
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  paginatedFilteredApplications.map((app) => (
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
                        {app.link && app.link.trim() ? (
                          <a
                            href={
                              app.link.startsWith("http")
                                ? app.link
                                : `https://${app.link.trim()}`
                            }
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-600 hover:underline'
                          >
                            <FontAwesomeIcon icon={faLink} />
                          </a>
                        ) : (
                          <FontAwesomeIcon
                            icon={faLinkSlash}
                            className='text-gray-600'
                          />
                        )}
                      </td>

                      <td className='px-5 py-4 break-words max-w-xs'>
                        {app.notes && app.notes.length > 50 ? (
                          <>
                            <button
                              onClick={() => handleViewNotes(app.notes)}
                              className='text-blue-600 hover:underline text-sm'
                            >
                              Open
                            </button>
                          </>
                        ) : (
                          <span>{app.notes || "N/A"}</span>
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
                            setEditApplication(app);
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
                          onClick={() => {
                            setApplicationToDelete(app.id); // Set the application ID
                            toggleDeleteModal(); // Open the modal
                          }}
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
          application={editApplication}
          onSave={updateApplication}
          user={user}
        />
      )}
      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggleModal={toggleDeleteModal}
        onConfirm={confirmDelete}
      />
      {/* Notes Modal */}
      <Notes
        isModalOpen={isNotesModalOpen}
        toggleModal={toggleNotesModal}
        notes={selectedNotes}
      />
    </section>
  );
};
