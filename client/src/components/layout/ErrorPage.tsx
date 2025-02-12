const dribbleErrorPageGif =
  'https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif';

const ErrorPage = () => {
  return (
    <section className="error_page_container py-10 bg-white font-serif min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-0">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-3xl text-center">
            <div
              className="h-[400px] bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url(${dribbleErrorPageGif})`,
              }}
            >
              <h1 className="text-[8rem] relative -top-20 sm:-top-32 font-semibold tracking-wider bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
                404
              </h1>
            </div>

            <div className="-mt-12">
              <h3 className="text-3xl mb-4">Look like you're lost</h3>

              <p className="text-gray-600 text-lg mb-8">
                The page you are looking for is not available!
              </p>

              <a
                href="/"
                className="inline-block px-6 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors duration-300"
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
