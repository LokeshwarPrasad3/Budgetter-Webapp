export const getTodayDate = (): string => {
  const now = new Date();
  const date = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear());
  return `${date}-${month}-${year}`;
};

export const formatDate = (date: Date | undefined) => {
  if (!date) {
    return '';
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export function getMonthInString(month: string): string {
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthIndex = parseInt(month, 10);
  if (monthIndex < 1 || monthIndex > 12) {
    throw new Error(
      'Invalid month. Please provide a two-digit month between 01 and 12.'
    );
  }
  return months[monthIndex - 2];
}

// Get previous months' names based on the passed number
export function getPreviousMonthsName(previousMonths: number): string[] {
  if (previousMonths < 1 || previousMonths >= 12) {
    throw new Error("The number of months must be between 1 and 11.");
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentMonth = new Date().getMonth(); // 0-based index (0 for January, 11 for December)
  const result: string[] = [];

  for (let i = 0; i <= previousMonths; i++) {
    const monthIndex = (currentMonth - i + 12) % 12; // Handle negative index
    result.push(monthNames[monthIndex]);
  }

  return result;
}
