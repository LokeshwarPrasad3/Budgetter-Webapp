import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useDispatch, useSelector } from 'react-redux';
import ChartFilterOptions from '../../common/ChartFilterOptions';
import { setAllExpenses } from '@/features/expenses/expenses';
import { getUserAllExpenses } from '@/services/expenses';
import { useQuery } from '@tanstack/react-query';
import { getDayName, getLast7Dates } from '@/utils/date/date';
import LineChartLoader from './Loader/LineChartLoader';

interface chartDataType {
  day: string;
  value: number;
}

const CategoryWiseLineChart: React.FC = () => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();
  const [chartFilter, setChartFilter] = useState<string>('daily'); // daily, weely, monthly , yearly
  const [chartData, setChartData] = useState<chartDataType[]>([
    { day: 'Sunday', value: 290 },
    { day: 'Monday', value: 420 },
    { day: 'Tuesday', value: 420 },
    { day: 'Wednesday', value: 950 },
    { day: 'Thursday', value: 650 },
    { day: 'Friday', value: 650 },
    { day: 'Saturday', value: 560 },
  ]);
  const isDarkMode = useSelector((state: any) => state.themeMode.isDarkMode);
  // Get all expenses from the Redux store
  const allExpensesArray = useSelector(
    (state: any) => state.expenses.allExpenses
  );

  // Use useQuery to fetch data only when necessary
  const { data: allExpensesResData, isLoading } = useQuery({
    queryFn: getUserAllExpenses,
    queryKey: ['getUserAllExpenses'],
    enabled: !allExpensesArray?.length, // Only fetch if no expenses in store
  });

  // Update Redux store with fetched data when available
  useEffect(() => {
    if (allExpensesResData?.success) {
      dispatch(setAllExpenses(allExpensesResData.data));
    }
  }, [allExpensesResData, dispatch]);

  // 1️⃣ Daily wise data in week
  const getWeeklyFilteredExpensesData = () => {
    // Map each day to its total expense (fill missing days with 0)
    const last7DaysData = getLast7Dates.map((day) => {
      const dayExpenses = allExpensesArray?.filter(
        (expense: any) => expense.date === day
      );
      return {
        day: getDayName(day),
        value: dayExpenses?.reduce(
          (acc: number, item: any) =>
            acc +
            item?.products?.reduce(
              (sum: number, prod: any) => sum + prod.price,
              0
            ),
          0
        ),
      };
    });
    return last7DaysData;
  };
  // 2️⃣ Weekly wise data in month
  const getWeelyFilteredExpensesData = () => {
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0'); // Ensure "MM" format
    const currentYear = currentDate.getFullYear().toString();

    // Step 1: Filter expenses for the current month
    const currentMonthExpenses = allExpensesArray?.filter((expenses: any) => {
      const [_, month, year] = expenses.date.split('-');
      return month === currentMonth && year === currentYear;
    });

    // Step 2: Initialize weekly data
    let weeklyData = [
      { day: 'Week-1', value: 0 },
      { day: 'Week-2', value: 0 },
      { day: 'Week-3', value: 0 },
      { day: 'Week-4', value: 0 },
    ];

    // Step 3: Group expenses into weeks
    currentMonthExpenses.forEach((expenses: any) => {
      const [day] = expenses?.date.split('-'); // Extract day (DD)
      const weekIndex = Math.min(Math.floor((parseInt(day) - 1) / 7), 3); // Get week index (0-3)

      weeklyData[weekIndex].value += expenses?.products?.reduce(
        (sum: number, product: any) => sum + product.price,
        0
      );
    });

    return weeklyData;
  };
  // 3️⃣ Monthly wise date in year
  const getMonthlyFilteredExpensesData = () => {
    // Step 1: Get unique months from expenses
    const monthlyExpensesMap = new Map();

    allExpensesArray?.forEach((expenses: any) => {
      const [_, month, year] = expenses?.date.split('-'); // Extract MM-YYYY
      const monthYearKey = `${month}-${year}`;

      // Step 2: Aggregate expenses for each month
      if (!monthlyExpensesMap.has(monthYearKey)) {
        monthlyExpensesMap.set(monthYearKey, 0);
      }

      monthlyExpensesMap.set(
        monthYearKey,
        monthlyExpensesMap.get(monthYearKey) +
          expenses?.products.reduce(
            (sum: any, product: any) => sum + product.price,
            0
          )
      );
    });

    // Step 3: Convert Map to Array format
    const monthlyData = Array.from(
      monthlyExpensesMap,
      ([monthYear, value]) => ({
        day: monthYear, // Example: "11-2024"
        value,
      })
    );

    return monthlyData;
  };
  // 4️⃣ Yearly data
  const getYearlyFilteredExpensesData = () => {
    // Step 1: Get unique years from expenses
    const yearlyExpensesMap = new Map();

    allExpensesArray?.forEach((expenses: any) => {
      const [, , year] = expenses?.date.split('-'); // Extract YYYY

      // Step 2: Aggregate expenses for each year
      if (!yearlyExpensesMap.has(year)) {
        yearlyExpensesMap.set(year, 0);
      }

      yearlyExpensesMap.set(
        year,
        yearlyExpensesMap.get(year) +
          expenses?.products.reduce(
            (sum: any, product: any) => sum + product.price,
            0
          )
      );
    });

    // Step 3: Convert Map to Array format
    const yearlyData = Array.from(yearlyExpensesMap, ([year, value]) => ({
      day: year, // Example: "2024"
      value,
    }));

    return yearlyData;
  };

  // filter every time whenever changes
  useEffect(() => {
    if (chartFilter === 'daily') {
      setChartData(getWeeklyFilteredExpensesData());
    } else if (chartFilter === 'weekly') {
      setChartData(getWeelyFilteredExpensesData());
    } else if (chartFilter === 'monthly') {
      setChartData(getMonthlyFilteredExpensesData());
    } else if (chartFilter === 'yearly') {
      setChartData(getYearlyFilteredExpensesData());
    }
  }, [allExpensesArray, chartFilter]);

  // chart configuration
  useLayoutEffect(() => {
    if (chartRef.current) {
      const root = am5.Root.new(chartRef.current);

      root.setThemes([am5themes_Animated.new(root)]);
      // Remove amCharts logo
      root._logo?.dispose();

      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: 'panX',
          wheelY: 'zoomX',
          pinchZoomX: true,
        })
      );

      const cursor = chart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
          behavior: 'none',
        })
      );
      cursor.lineY.set('visible', false);

      const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: 'day',
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
          }),
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      // Add this code to change the font size
      xAxis.get('renderer').labels.template.setAll({
        fontSize: 10,
        fontWeight: '500',
        fill: am5.color(isDarkMode ? 0xffffff : 0x000000),
      });

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );

      // Add this code to change the font size
      yAxis.get('renderer').labels.template.setAll({
        fontSize: 10,
        fontWeight: '500',
        fill: am5.color(isDarkMode ? 0xffffff : 0x000000),
      });

      const gridColor = am5.color(isDarkMode ? 0x666666 : 0xd9d8d8);
      xAxis.get('renderer').grid.template.setAll({
        stroke: gridColor,
        strokeOpacity: 0.5,
      });

      yAxis.get('renderer').grid.template.setAll({
        stroke: gridColor,
        strokeOpacity: 0.5,
      });

      const series = chart.series.push(
        am5xy.StepLineSeries.new(root, {
          name: 'Expenses',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'value',
          categoryXField: 'day',
          tooltip: am5.Tooltip.new(root, {
            labelText: '₹{valueY}',
          }),
          stroke: am5.color(0x6794dc),
          fill: am5.color(0x6794dc),
        })
      );

      series.strokes.template.setAll({
        strokeWidth: 3,
      });

      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.2,
      });

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get('stroke'),
          }),
        });
      });

      const data = chartData;

      xAxis.data.setAll(data);
      series.data.setAll(data);

      series.appear(1000);
      chart.appear(1000, 100);

      // Function to update labels based on window size
      const updateLabels = () => {
        if (window.innerWidth < 500) {
          // Set labels to the first letter when the screen width is less than 800px
          xAxis
            .get('renderer')
            .labels.template.adapters.add('text', function (text, target) {
              const category = target.dataItem?.get('category' as any);
              return category ? category[0] : text;
            });
        } else {
          // Use full names when the screen width is more than 800px
          xAxis.get('renderer').labels.template.adapters.remove('text');
        }
      };

      // Initial check
      updateLabels();

      // Add window resize listener
      window.addEventListener('resize', updateLabels);

      return () => {
        root.dispose();
        window.removeEventListener('resize', updateLabels);
      };
    }
  }, [isDarkMode, chartData]);

  return (
    <>
      <div className="flex items-center p-0 py-5 md:p-4 bg-bg_primary_light dark:bg-bg_primary_dark rounded-lg shadow-sm flex-col max-w-full w-full border border-border_light dark:border-border_dark">
        <div className="heading_part_chart relative w-full flex justify-center items-center">
          <h2 className="text-lg text-left font-semibold mb-4">
            Expenses Details
          </h2>
          <ChartFilterOptions setChartFilter={setChartFilter} />
        </div>
        <div className="chart_element_container flex justify-center items-center w-full h-full flex-col">
          {!isLoading ? (
            <div
              ref={chartRef}
              className="h-[250px] lg:h-full w-full"
              style={{ maxWidth: '100%' }}
            ></div>
          ) : (
            <LineChartLoader />
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryWiseLineChart;
