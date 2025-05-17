const SocialMediaFollow = () => {
  return (
    <div className="my-8 text-center text-gray-500">
      <p className="mb-4 font-bold">Follow us on</p>
      <div className="flex justify-center space-x-4">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="ri-twitter-fill text-2xl text-blue-500 hover:text-blue-600"></i>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="ri-facebook-fill text-2xl text-blue-800 hover:text-blue-900"></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="ri-linkedin-fill text-2xl text-blue-700 hover:text-blue-800"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="ri-instagram-fill text-2xl text-pink-500 hover:text-pink-600"></i>
        </a>
      </div>
    </div>
  );
};

export default SocialMediaFollow;
