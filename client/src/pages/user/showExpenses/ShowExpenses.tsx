import ExpenseHistoryDetailsTable from "@/components/user/showExpenses/ExpenseHistoryDetailsTable";
import FilterShowExpenses from "@/components/user/showExpenses/FilterShowExpenses";

const ShowExpenses = () => {
  return (
    <>
      <FilterShowExpenses />
      <ExpenseHistoryDetailsTable />
    </>
  );
}

export default ShowExpenses
