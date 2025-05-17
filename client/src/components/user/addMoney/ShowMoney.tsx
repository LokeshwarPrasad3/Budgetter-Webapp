import { useSelector } from 'react-redux';

const ShowMoney = () => {
  return (
    <div className="summary_boxes_outer flex w-full flex-wrap items-center justify-start gap-7 lg:justify-start">
      <div className="flex w-full max-w-full flex-col flex-wrap items-center justify-center gap-0 rounded-[10px] bg-gradient-to-br from-[#a376fc] to-[#f96f9b] p-3 hover:bg-gradient-to-tl md:max-w-[14rem]">
        <p className="text-center text-lg font-semibold text-white">
          Current Balance
        </p>
        <p className="text-center text-2xl font-bold text-white">
          {useSelector((state: any) => state.user.user.currentPocketMoney) | 0}
        </p>
      </div>
    </div>
  );
};

export default ShowMoney;
