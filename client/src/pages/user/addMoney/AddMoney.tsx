import AddMoneySection from '@/components/user/addMoney/AddMoneySection';
import ShowMoney from '@/components/user/addMoney/ShowMoney';
import PocketMoneyDetails from '@/components/user/addMoney/table/PocketMoneyDetails';

const AddMoney = () => {
  return (
    <>
      <ShowMoney />
      <AddMoneySection />
      <PocketMoneyDetails/>
    </>
  );
};

export default AddMoney;
