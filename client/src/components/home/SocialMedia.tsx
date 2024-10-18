import React from "react";

const SocialMedia: React.FC = () => {
  return (
    <div className="auth_footer_container h-20 flex mt-3 flex-col justify-center items-center w-full">
      <div className="flex space-x-6 mb-4">
        <a
          href="https://www.instagram.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 opacity-80 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full"
        >
          <i className="ri-instagram-fill text-xl text-white"></i>
        </a>
        <a
          href="https://www.facebook.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 opacity-80 bg-blue-600 rounded-full"
        >
          <i className="ri-facebook-fill text-xl text-white"></i>
        </a>
        <a
          href="https://twitter.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 opacity-80 bg-blue-400 rounded-full"
        >
          <i className="ri-twitter-fill text-xl text-white"></i>
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
