const dribbleErrorPageGif =
  'https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif';

const ErrorPage = () => {
  return (
    <section className="error_page_container flex min-h-screen items-center justify-center bg-white py-10 font-serif">
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-3xl text-center">
            <div
              className="h-[400px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${dribbleErrorPageGif})`,
              }}
            >
              <h1 className="relative -top-20 bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-[8rem] font-semibold tracking-wider text-transparent sm:-top-32">
                404
              </h1>
            </div>

            <div className="-mt-12">
              <h3 className="mb-4 text-3xl">Look like you're lost</h3>

              <p className="mb-8 text-lg text-gray-600">
                The page you are looking for is not available!
              </p>

              <a
                href="/"
                className="inline-block bg-green-600 px-6 py-2 text-white transition-colors duration-300 hover:bg-green-700"
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
