import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero_section_container relative bg-[#CCEFF5] font-karla h-full px-4 py-4 pt-10 pb-10 sm:pt-20 sm:pb-4 w-full flex flex-col sm:flex-row justify-center items-center ">
      <div className="hero_section_content flex flex-col sm:relative md:left-10 lg:left-16 gap-5 justify-center w-full max-w-full md:max-w-[33rem]">
        <h1 className="hero_section_title text-2xl sm:text-3xl sm:w-[110%] md:text-4xl font-bold ">
          Welcome to{' '}
          <span className="bg-[#F7CEDC] rounded-md px-2 text-2xl sm:text-3xl md:text-4xl py-0 font-bold">
            Budgetter
          </span>
        </h1>
        <p className="hero_section_description pr-5 text-base text-slate-600 md:text-lg font-semibold">
          <span> Manage Your Everyday Expenses </span>
          <br /> A simple budgeting app to help you track your expenses
        </p>
        <div className="hero_buttons flex w-full gap-3">
          <Link
            to="/login"
            className="hero_section_button bg-slate-700 hover:bg-slate-600 py-1 px-3 rounded-sm text-white cursor-pointer"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="hero_section_button bg-slate-700 hover:bg-slate-600 py-1 px-3 rounded-sm text-white cursor-pointer"
          >
            About
          </Link>
        </div>
      </div>
      <div className="flag_image sm:relative sm:top-[-2rem] md:right-10 lg:right-16 max-w-full w-full sm:max-w-[20rem] md:max-w-[26rem]">
        <img
          className="w-full hidden sm:block"
          src="./assets/dashboard/hero-left-image.png"
          alt="describe"
        />
        <img
          className="rounded-lg mt-4 sm:mt-10 w-full p-3 max-w-full block sm:hidden"
          src="./assets/dashboard/image-2.jpg"
          alt="describe"
        />
      </div>
    </div>
  );
};

export default HeroSection;
