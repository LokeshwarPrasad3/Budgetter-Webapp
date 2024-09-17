import SummarizeBoxes from '@/components/user/dashbaord/SummarizeBoxes';
import CategoryWiseExpensesChart from '@/components/user/dashbaord/charts/CategoryWiseExpensesChart';
import CategoryWiseLineChart from '@/components/user/dashbaord/charts/CategoryWiseLineChart';

const Dashboard = () => {
  return (
    <>
      <div className="dashboard_page_ flex flex-col justify-start items-start w-full gap-5">
        <div className="heading_dashboard_page flex justify-start items-start w-full">
          <h3 className="font-semibold text-base text-left">
            August Month Report 2024
          </h3>
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
