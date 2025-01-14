import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { extractKeywords } from "../../assets/utils/geminiService";
import { ListModal } from "./ListModal";

export const Keywords = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleExtractKeywords = async () => {
    setLoading(true);
    try {
      const extractedContent = await extractKeywords(jobDescription);
      setKeywords(extractedContent); // Save extracted keywords
    } catch (error) {
      console.error("Failed to extract keywords:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev); // Toggle modal visibility
  };

  return (
    <section className='bg-white py-4 rounded-lg'>
      <h1 className='block max-w-sm p-2 bg-white rounded-lg font-bold text-2xl'>
        Make Your Resume ATS Friendly
      </h1>
      <h2 className='pb-5 px-2 text-sm font-regular text-gray-400'>
        Extract Keywords from Job Descriptions to Perfect Your Resume!
      </h2>
      <textarea
        id='message'
        rows='8'
        className='block mt-4 p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-400'
        placeholder='Paste job description here.'
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      ></textarea>
      <button
        className='flex justify-center items-center w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm py-2 cursor-pointer mt-6'
        onClick={handleExtractKeywords}
        disabled={loading}
      >
        <FontAwesomeIcon icon={faWandMagicSparkles} className='mr-2' />
        {loading ? "Extracting..." : "Extract Keywords"}
      </button>
      <div className='mt-6 bg-gray-50 p-4 rounded-lg'>
        <h1 className='font-semibold text-sm mb-4'>Extracted Keywords:</h1>
        <ul className='flex flex-wrap gap-2 mt-2'>
          {keywords.length > 0 ? (
            keywords.map((keyword, index) => (
              <li
                key={index}
                className='py-1 px-4 bg-blue-100 rounded-full text-xs font-medium text-blue-600'
              >
                {keyword}
              </li>
            ))
          ) : (
            <p className='text-gray-500'>No keywords extracted yet.</p>
          )}
        </ul>
        {keywords.length > 0 && (
          <button
            className='flex justify-center items-center p-2 gap-2 text-blue-600 text-xs hover:bg-gray-200 rounded-lg mt-4'
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>ADD</p>
          </button>
        )}
      </div>
      {/* Pass keywords to the modal */}
      {isModalVisible && <ListModal keywords={keywords} />}
    </section>
  );
};
