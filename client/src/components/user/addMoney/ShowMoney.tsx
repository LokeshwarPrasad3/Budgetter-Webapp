
const ShowMoney = () => {
  return (
    <div className="summary_boxes_outer flex justify-start lg:justify-start flex-wrap items-center gap-7 w-full">
      <div className="flex flex-col max-w-full md:max-w-[14rem] w-full flex-wrap justify-center items-center gap-0 rounded-[10px] p-3 bg-[#4CAF50]">
        <p className="text-lg text-white font-semibold text-center">
          Current Balance
        </p>
        <p className="text-2xl text-white font-bold text-center">5000</p>
      </div>
    </div>
  );
};

export default ShowMoney;
