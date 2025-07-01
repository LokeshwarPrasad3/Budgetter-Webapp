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
      bgClass: 'bg-gradient-to-br from-[#9f78ff] to-[#32cafe]',
    },
    {
      id: 2,
      title: 'Remain Balance',
      value:
        useSelector((state: any) => state.user.user.currentPocketMoney) | 0,
      bgClass:
        'bg-gradient-to-br from-[#a376fc] to-[#f96f9b] hover:bg-gradient-to-tl',
    },
    {
      id: 3,
      title: 'Added Balance',
      value: totalAddedMoneyOfMonth,
      bgClass:
        'bg-gradient-to-br from-[#00cef9] to-[#00e6af] hover:bg-gradient-to-tl',
    },
    {
      id: 4,
      title: 'Lent Money',
      value: totalLentMoney,
      bgClass:
        'bg-gradient-to-br from-[#f95058] to-[#fc9197] hover:bg-gradient-to-tl',
    },
    {
      id: 5,
      title: 'Last Expenses',
      value: lastTotalExpenses,
      bgClass:
        'bg-gradient-to-br from-[#ffb547] to-[#ff72d2] hover:bg-gradient-to-tl',
    },
  ];

  return (
    <div className="summarize_box_container flex w-full flex-col items-start justify-start gap-4 rounded-md border border-border_light bg-bg_primary_light p-4 px-5 shadow-sm dark:border-border_dark dark:bg-bg_primary_dark">
      <h4 className="text-base font-semibold">Summaries Information</h4>
      <div className="summary_boxes_outer flex w-full flex-wrap items-center justify-start gap-7 lg:justify-start">
        {summarizeBoxesContents
          .slice(0, 4)
          .map(({ title, value, bgClass }, index) => (
            <div
              key={index}
              className={`flex w-full max-w-full flex-col flex-wrap items-center justify-center gap-0 rounded-[10px] p-3 md:max-w-[13rem] 2xl:max-w-[14rem] ${bgClass}`}
            >
              <p className="text-center text-lg font-semibold text-white">
                {title}
              </p>
              {isPending && title !== 'Remain Balance' ? (
                <p className="mt-1 h-7 w-2/5 animate-pulse rounded-md bg-slate-500 text-center text-2xl font-bold text-white dark:bg-slate-800"></p>
              ) : (
                <p className="text-center text-2xl font-bold text-white">
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
