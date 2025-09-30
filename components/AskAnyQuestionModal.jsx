import React from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';

const AskAnyQuestionModal = ({setIsModalOpen,isModalOpen}) => {
    return (
       <div
        className={`fixed bottom-8 right-8 w-80 bg-white rounded-lg shadow-2xl p-6 transition-all duration-500 ease-in-out z-70 ${
          isModalOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-16 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Contact Us</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <IoClose size={24} />
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          We are happy to answer your questions. Contact us by phone or email.
        </p>
        <div className="space-y-4 text-gray-700">
          <div className="flex items-center">
            <BsTelephoneFill className="w-5 h-5 mr-3 text-gray-500" />
            <span>+8801713-117849</span>
          </div>
          <div className="flex items-center">
            <MdEmail className="w-5 h-5 mr-3 text-gray-500" />
            <span>aasourcingltd77@gmail.com</span>
          </div>
        </div>
        <div className="border-t mt-6 pt-4 text-sm text-gray-600">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">Monday - Thursday</p>
              <p>08:30h - 17:00h GMT+6</p>
            </div>
            <div>
              <p className="font-semibold">Friday</p>
              <p>08:30h - 14:30h GMT+6</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AskAnyQuestionModal;