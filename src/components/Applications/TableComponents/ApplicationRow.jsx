import React from "react";

const ApplicationRow = ({
  applicationDate,
  jobTitle,
  companyName,
  jobLocation,
  status,
  jobLink,
  notes,
  resumeUsed,
  coverLetterUsed,
}) => {
  return (
    <tr className='border-b hover:bg-gray-100'>
      <td className='px-5 py-4'>{applicationDate}</td>
      <td className='px-5 py-4'>{jobTitle}</td>
      <td className='px-5 py-4'>{companyName}</td>
      <td className='px-5 py-4'>{jobLocation}</td>
      <td className='px-5 py-4'>{status}</td>
      <td className='px-5 py-4'>
        <a href={jobLink || "#"} className='text-blue-600 hover:underline'>
          {jobLink || "Add Link"}
        </a>
      </td>
      <td className='px-5 py-4'>{notes}</td>
      <td className='px-5 py-4'>{resumeUsed}</td>
      <td className='px-5 py-4'>{coverLetterUsed}</td>
    </tr>
  );
};

export default ApplicationRow;
