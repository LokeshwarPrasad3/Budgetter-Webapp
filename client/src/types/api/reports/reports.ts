export interface CategoryWiseExpensesData {
  GroceriesExpenses: number;
  Housing_UtilitiesExpenses: number;
  MedicalExpenses: number;
  FoodExpenses: number;
  PersonalExpenses: number;
  EducationalExpenses: number;
  TransportationExpenses: number;
  MiscellaneousExpenses: number;
}

export interface TotalExpensesAndAddedMoneyInMonthResType {
  statusCode: number;
  data: {
    totalExpenses: number;
    totalAddedMoney: number;
    lastTotalExpenses: number;
    totalLentMoney: number;
    categoryWiseExpensesData: CategoryWiseExpensesData;
  };
  message: string;
  success: boolean;
}
