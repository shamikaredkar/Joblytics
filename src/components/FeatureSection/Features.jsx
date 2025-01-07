import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faHexagonNodes,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

const Features = () => {
  return (
    <section className='py-24 bg-gray-100'>
      {/* bg-gray-100 for light gray background */}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-14 text-center'>
          <span className='py-1 px-4 bg-blue-100 rounded-full text-xs font-medium text-blue-600'>
            Features
          </span>
          <h2 className='text-4xl font-bold text-gray-900 py-5'>
            What can Joblytics do for you?
          </h2>
          <p className='text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto'>
            Explore the tools that streamline your job application process!
          </p>
        </div>

        {/* Features */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8'>
          {/* Feature 1: Job Tracking */}
          <div className='text-center group mt-16'>
            <FontAwesomeIcon
              icon={faTable}
              className='text-blue-700 h-10 w-10'
            />
            <h4 className='text-lg font-medium text-gray-900 mb-3'>
              Job Tracking
            </h4>
            <p className='text-sm font-normal text-gray-500'>
              Easily add and manage job applications. Keep everything organized
              during your search.
            </p>
          </div>

          {/* Feature 2: AI-Powered Resume Builder */}
          <div className='text-center group mt-16'>
            <FontAwesomeIcon
              icon={faHexagonNodes}
              className='text-blue-700 h-10 w-10'
            />
            <h4 className='text-lg font-medium text-gray-900 mb-3'>
              AI-Powered Resume Builder
            </h4>
            <p className='text-sm font-normal text-gray-500'>
              Optimize your resume with ATS-friendly keywords extracted by AI.
            </p>
          </div>

          {/* Feature 3: Notifications & Reminders */}
          <div className='text-center group mt-16'>
            <FontAwesomeIcon
              icon={faCalendarCheck}
              className='text-blue-700 h-10 w-10'
            />
            <h4 className='text-lg font-medium text-gray-900 mb-3'>
              Notifications & Reminders
            </h4>
            <p className='text-sm font-normal text-gray-500'>
              Never miss deadlines, interviews, or follow-ups with timely
              reminders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
