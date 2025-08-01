import LentMoneyTable from './table/LentMoneyTable';

const LentRecordsDetailsTable = () => {
  return (
    <div className="lent_records_details_container flex w-full flex-col items-start justify-start rounded-md border border-border_light bg-bg_primary_light shadow-sm dark:border-border_dark dark:bg-bg_primary_dark">
      <h4 className="p-4 text-base font-semibold">Your Lent Money Records</h4>
      <div
        id="lent_records_details_table_section"
        className="flex w-full items-center justify-center"
      >
        <LentMoneyTable />
      </div>
    </div>
  );
};

export default LentRecordsDetailsTable;
