import LentMoneyTable from "./table/LentMoneyTable";

const LentRecordsDetailsTable = () => {
  return (
    <div className="lent_records_details_container flex flex-col justify-start items-start bg-[#FFFEFE] rounded-md w-full shadow-sm">
      <h4 className="text-base font-semibold p-4">Your Lent Money Records</h4>
      <div className="flex justify-center items-center w-full">
        <LentMoneyTable />
      </div>
    </div>
  );
};

export default LentRecordsDetailsTable;
