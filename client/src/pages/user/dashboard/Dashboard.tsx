import SummarizeBoxes from '@/components/user/dashbaord/SummarizeBoxes';
import CategoryWiseExpensesChart from '@/components/user/dashbaord/charts/CategoryWiseExpensesChart';
import CategoryWiseLineChart from '@/components/user/dashbaord/charts/CategoryWiseLineChart';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state: any) => state.user.user);

  return (
    <>
      <div className="dashboard_page_ flex flex-col justify-start items-start w-full gap-5">
        <div className="heading_dashboard_page flex justify-start items-start w-full">
          <h3 className="font-semibold text-lg text-left">
            {user && user?.name && (
              <>
                {' '}
                <span className="font-bold text-orange-800">
                  Welcome! {user.name} 
                </span>
              </>
            )}{' '}
          </h3>
        </div>
        <div className="summarize_box_container flex flex-col justify-start items-start gap-4 bg-[#FFFEFE] rounded-md w-full p-4 px-5 shadow-sm">
          <h4 className="text-base font-semibold">Your August Month Report</h4>
        </div>
        <SummarizeBoxes />
        <div className="visual_graph_container flex justify-center flex-col xl:flex-row items-center w-full gap-y-10 md:gap-5">
          <CategoryWiseExpensesChart />
          <CategoryWiseLineChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
