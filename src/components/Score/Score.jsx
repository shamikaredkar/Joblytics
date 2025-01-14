import {
  faCheck,
  faExclamation,
  faExclamationCircle,
  faLightbulb,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import pdfToText from "react-pdftotext";
import { generateScore } from "../../assets/utils/geminiService";

export const Score = () => {
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [responseText, setResponseText] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Please upload a valid PDF file.");
      return;
    }

    setLoading(true);

    pdfToText(file)
      .then((text) => {
        setExtractedText(text);
        console.log("Extracted PDF Text:", text);
      })
      .catch((error) => {
        console.error("Failed to extract text from PDF:", error);
        alert("Failed to extract text from the PDF.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGenerateScore = async () => {
    if (!extractedText || !jobDescription) {
      alert("Please upload a PDF and provide a job description.");
      return;
    }

    setLoading(true);

    try {
      // Directly use the result without parsing it
      const result = await generateScore(extractedText, jobDescription);

      // Assuming `generateScore` already returns a parsed object
      if (typeof result === "object") {
        setResponseText(result); // Store the response as it is
        console.log("Generated Score:", result);
      } else {
        console.error("Unexpected response format:", result);
        alert("Unexpected response format from API.");
      }
    } catch (error) {
      console.error("Error generating score:", error);
      alert("Failed to generate score. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className='bg-white py-3 sm:py-5'>
        <h1 className='block max-w-sm p-2 bg-white rounded-lg font-bold text-2xl'>
          Get Your Resume Score
        </h1>
        <label>
          <input
            type='file'
            className='text-sm text-grey-500
              file:mr-2 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-medium
              file:bg-blue-50 file:text-blue-700
              hover:file:cursor-pointer hover:file:bg-blue-100
              hover:file:text-blue-800'
            accept='application/pdf'
            onChange={handleFileUpload}
          />
        </label>
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
          onClick={handleGenerateScore}
          disabled={loading}
        >
          <FontAwesomeIcon icon={faScrewdriverWrench} className='mr-2' />
          {loading ? "Generating..." : "Generate Score"}
        </button>
        <div className=''>
          {/* Progress Bar */}
          <div className='bg-gray-50 mt-4 p-4 rounded-lg'>
            <div className='mb-4'>
              <div className='flex justify-between'>
                <p className='font-semibold text-sm text-gray-800'>
                  Resume Match Score:
                </p>
                <p className='mb-2 text-md font-bold text-blue-600'>
                  {responseText?.relevance_score || 0}%
                </p>
              </div>
              <div className='flex relative w-full h-2 bg-blue-100 rounded-lg'>
                <div
                  className='h-2 bg-blue-700 rounded-lg'
                  style={{ width: `${responseText?.relevance_score || 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Missing Keywords */}
          <div className='mt-4'>
            <div className='bg-gray-50 mt-4 p-4 rounded-lg'>
              <div className='flex justify-between items-center'>
                <p className='font-semibold text-gray-700'>Missing Keywords:</p>
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className='text-red-700'
                />
              </div>
              <ul className='flex flex-wrap gap-2 mt-2'>
                {responseText?.missing_keywords?.length ? (
                  responseText.missing_keywords.map((keyword, index) => (
                    <li
                      key={index}
                      className='py-1 px-3 bg-red-100 text-red-700 rounded-full text-xs font-medium'
                    >
                      {keyword}
                    </li>
                  ))
                ) : (
                  <li className='py-1 px-3 bg-red-50 text-red-500 rounded-full text-xs font-medium'>
                    No missing keywords identified.
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div className='mt-4'>
            <div className='bg-gray-50 mt-4 p-4 rounded-lg'>
              <div className='flex justify-between items-center'>
                <p className='font-semibold text-gray-700'>Recommendations:</p>
                <FontAwesomeIcon
                  icon={faLightbulb}
                  className='text-green-500'
                />
              </div>
              <ul className='flex flex-wrap gap-2 mt-2'>
                {responseText?.recommendations?.length ? (
                  responseText.recommendations.map((rec, index) => (
                    <div key={index} className='flex items-center gap-2'>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className='text-green-400'
                      />
                      <li className='py-1 px-3 text-gray-900 rounded-full text-xs font-medium'>
                        {rec}
                      </li>
                    </div>
                  ))
                ) : (
                  <li className='py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium'>
                    No recommendations available.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
