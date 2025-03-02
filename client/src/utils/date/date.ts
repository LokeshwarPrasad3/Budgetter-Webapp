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

export function getMonthInNumber(month: string): string {
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

  // Convert the month name to title case to ensure case-insensitive matching
  const monthName =
    month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
  const monthIndex = months.indexOf(monthName);
  if (monthIndex === -1) {
    throw new Error('Invalid month name. Please provide a valid month name.');
  }
  // Return the month number (index + 1)
  return (monthIndex + 1).toString().padStart(2,"0");
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
    result.unshift(monthNames[monthIndex]);
  }
  return result;
}

// get all months name
export const monthsNames = [
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

// get years 
export const prevYearsName = [
  "2024",
  "2025",
]


// Get last 7 days dates
export const getLast7Days = (): string[] => {
  const today = new Date();
  const endDate = today.getDate(); // Current day of the month
  const startDate = endDate - 6; // 6 days before today

  const dates: string[] = [];
  const year = today.getFullYear(); // Current year
  const month = today.getMonth(); // Current month

  // Helper function to format the date as "DD-MM-YYYY"
  const formatDate = (day: number, month: number, year: number): string => {
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = (month + 1).toString().padStart(2, '0'); // month is zero-based
    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  // If startDate is less than 1, adjust to the previous month
  if (startDate < 1) {
    const prevMonth = month - 1 < 0 ? 11 : month - 1; // Handle previous month edge case (December to January)
    const prevMonthLastDate = new Date(year, prevMonth + 1, 0).getDate(); // Last day of previous month

    // Add dates from the previous month
    for (let i = prevMonthLastDate + startDate; i <= prevMonthLastDate; i++) {
      dates.push(formatDate(i, prevMonth, year));
    }

    // Add dates from the current month
    for (let i = 1; i <= endDate; i++) {
      dates.push(formatDate(i, month, year));
    }
  } else {
    // If startDate is valid, just return the range for this month
    for (let i = startDate; i <= endDate; i++) {
      dates.push(formatDate(i, month, year));
    }
  }

  return dates.reverse(); // Reverse the dates to ensure the correct order
};

// get day name by date string
export const getDayName = (dateStr: string): string => {
  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day); 
  return date.toLocaleDateString("en-US", { weekday: "long" });
}


// get last 7 days dates
export const getLast7Dates = [...Array(7)]
  .map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits (Months are 0-based)
    const year = date.getFullYear();

    return `${day}-${month}-${year}`; // Format as dd-mm-yyyy
  })
  .reverse();