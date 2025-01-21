import { useSelector } from 'react-redux';

interface PropType {
  totalExpensesOfMonth: number;
  totalAddedMoneyOfMonth: number;
  lastTotalExpenses: number;
  totalLentMoney: number;
  isPending: boolean;
}

const SummarizeBoxes: React.FC<PropType> = ({
  totalExpensesOfMonth,
  totalAddedMoneyOfMonth,
  lastTotalExpenses,
  totalLentMoney,
  isPending,
}) => {
  const summarizeBoxesContents = [
    {
      id: 1,
      title: 'Total Expenses',
      value: totalExpensesOfMonth,
      bgClass: 'bg-[#4A90E2]',
    },
    {
      id: 2,
      title: 'Remain Balance',
      value:
        useSelector((state: any) => state.user.user.currentPocketMoney) | 0,
      bgClass: 'bg-[#4CAF50]',
    },
    {
      id: 3,
      title: 'Added Balance',
      value: totalAddedMoneyOfMonth,
      bgClass: 'bg-[#FF9800]',
    },
    {
      id: 4,
      title: 'Lent Money',
      value: totalLentMoney,
      bgClass: 'bg-[#00BCD4]',
    },
    {
      id: 5,
      title: 'Last Expenses',
      value: lastTotalExpenses,
      bgClass: 'bg-[#FB899D]',
    },
  ];

  return (
    <div className="summarize_box_container flex flex-col justify-start items-start gap-4 bg-[#FFFEFE] rounded-md w-full p-4 px-5 shadow-sm">
      <h4 className="text-base font-semibold">Summaries Information</h4>
      <div className="summary_boxes_outer flex justify-start lg:justify-start flex-wrap items-center gap-7 w-full">
        {summarizeBoxesContents.slice(0,4).map(({ title, value, bgClass }, index) => (
          <div
            key={index}
            className={`flex flex-col max-w-full md:max-w-[14rem] w-full flex-wrap justify-center items-center gap-0 rounded-[10px] p-3 ${bgClass}`}
          >
            <p className="text-lg text-white font-semibold text-center">
              {title}
            </p>
            {isPending && title !== 'Remain Balance' ? (
              <p className="text-2xl text-white font-bold text-center animate-pulse rounded-md bg-slate-500 h-7 mt-1 w-2/5 "></p>
            ) : (
              <p className="text-2xl text-white font-bold text-center">
                {value}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummarizeBoxes;
