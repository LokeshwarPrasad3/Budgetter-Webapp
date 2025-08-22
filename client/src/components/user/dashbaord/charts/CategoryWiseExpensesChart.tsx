import React, { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import DonutChartLoader from './Loader/DonutChartLoader';
import { useSelector } from 'react-redux';
import { CategoryWiseExpensesData } from '@/types/api/reports/reports';

interface CategoryWiseDataPropTypes {
  totalExpensesOfMonth: number | undefined;
  CategoryWiseData?: CategoryWiseExpensesData;
  isPending: boolean;
}

interface ChartData {
  category: string;
  value: number;
  color: am5.Color;
}

const CategoryWiseExpensesChart: React.FC<CategoryWiseDataPropTypes> = ({
  CategoryWiseData,
  totalExpensesOfMonth,
  isPending,
}) => {
  const {
    GroceriesExpenses,
    Housing_UtilitiesExpenses,
    MedicalExpenses,
    FoodExpenses,
    PersonalExpenses,
    EducationalExpenses,
    TransportationExpenses,
    MiscellaneousExpenses,
  } = CategoryWiseData || {};

  const categoryData = [
    {
      label: 'Groceries',
      value: GroceriesExpenses,
      color: 'linear-gradient(to right, #FF6347, #FF4500)', // Tomato to Dark Red
    },
    {
      label: 'Housing & Utilities',
      value: Housing_UtilitiesExpenses,
      color: 'linear-gradient(to right, #FFA500, #FF8C00)', // Orange to Darker Orange
    },
    {
      label: 'Medical',
      value: MedicalExpenses,
      color: 'linear-gradient(to right, #4682B4, #5F9EA0)', // SteelBlue to CadetBlue
    },
    {
      label: 'Food',
      value: FoodExpenses,
      color: 'linear-gradient(to right, #6A5ACD, #483D8B)', // SlateBlue to DarkSlateBlue
    },
    {
      label: 'Personal',
      value: PersonalExpenses,
      color: 'linear-gradient(to right, #32CD32, #228B22)', // LimeGreen to ForestGreen
    },
    {
      label: 'Educational',
      value: EducationalExpenses,
      color: 'linear-gradient(to right, #FFD700, #FFC200)', // Gold to Darker Gold
    },
    {
      label: 'Transportation',
      value: TransportationExpenses,
      color: 'linear-gradient(to right, #FF1493, #C71585)', // DeepPink to MediumVioletRed
    },
    {
      label: 'Miscellaneous',
      value: MiscellaneousExpenses,
      color: 'linear-gradient(to right, #8A2BE2, #6A0DAD)', // BlueViolet to Darker Violet
    },
  ];

  const chartRef = useRef<HTMLDivElement>(null);
  const isDarkMode = useSelector((state: any) => state.themeMode.isDarkMode);

  useEffect(() => {
    if (chartRef.current) {
      const root = am5.Root.new(chartRef.current);

      // Apply the animated theme
      root.setThemes([am5themes_Animated.new(root)]);

      // Remove amCharts logo
      root._logo?.dispose();

      // Create the chart
      const chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.horizontalLayout,
          innerRadius: am5.percent(65), // Creates donut chart
        })
      );

      // Create series
      const series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: 'value',
          categoryField: 'category',
          alignLabels: false, // Disable aligning labels outside the chart
        })
      );

      series.set(
        'colors',
        am5.ColorSet.new(root, {
          colors: [
            am5.color(0xff6347),
            am5.color(0xffa500),
            am5.color(0x4682b4),
            am5.color(0x6a5acd),
            am5.color(0x32cd32),
            am5.color(0xffd700),
            am5.color(0xff1493),
            am5.color(0x8a2be2),
          ],
        })
      );

      // Set data for series with type safety
      const chartData: ChartData[] = [
        {
          category: 'Groceries',
          value: GroceriesExpenses || 0,
          color: am5.color(0xff6347),
        },
        {
          category: 'Housing & Utilities',
          value: Housing_UtilitiesExpenses || 0,
          color: am5.color(0xffa500),
        },
        {
          category: 'Medical',
          value: MedicalExpenses || 0,
          color: am5.color(0x4682b4),
        },
        {
          category: 'Food',
          value: FoodExpenses || 0,
          color: am5.color(0x6a5acd),
        }, // Orange
        {
          category: 'Personal',
          value: PersonalExpenses || 0,
          color: am5.color(0x32cd32),
        },
        {
          category: 'Educational',
          value: EducationalExpenses || 0,
          color: am5.color(0xffd700),
        },
        {
          category: 'Transportation',
          value: TransportationExpenses || 0,
          color: am5.color(0xff1493),
        },
        {
          category: 'Miscellaneous',
          value: MiscellaneousExpenses || 0,
          color: am5.color(0x8a2be2),
        },
      ];

      series.slices.template.setAll({
        strokeWidth: 2,
        stroke: am5.color(0xffffff), // Optional: Border color
      });

      // Apply gradient fills dynamically
      series.slices.template.adapters.add('fillGradient', (fill, target) => {
        // Ensure the data context is typed correctly
        const data = target.dataItem?.dataContext as { category?: string };

        // Define gradient mapping
        const gradientMap: Record<string, am5.LinearGradient> = {
          Groceries: am5.LinearGradient.new(root, {
            stops: [
              { color: am5.color(0xff6347) }, // Tomato
              { color: am5.color(0xff4500) }, // Darker Red
            ],
          }),
          'Housing & Utilities': am5.LinearGradient.new(root, {
            stops: [
              { color: am5.color(0xffa500) }, // Orange
              { color: am5.color(0xff8c00) }, // Darker Orange
            ],
          }),
          Medical: am5.LinearGradient.new(root, {
            stops: [
              { color: am5.color(0x4682b4) }, // SteelBlue
              { color: am5.color(0x5f9ea0) }, // CadetBlue
            ],
          }),
          Food: am5.LinearGradient.new(root, {
            stops: [
              { color: am5.color(0x6a5acd) }, // SlateBlue
              { color: am5.color(0x483d8b) }, // DarkSlateBlue
            ],
          }),
          Personal: am5.LinearGradient.new(root, {
            stops: [
              { color: am5.color(0x32cd32) }, // LimeGreen
              { color: am5.color(0x228b22) }, // ForestGreen
            ],
          }),
          Educational: am5.LinearGradient.new(root, {
            stops: [
              { color: am5.color(0xffd700) }, // Gold
              { color: am5.color(0xffc200) }, // Darker Gold
            ],
          }),
          Transportation: am5.LinearGradient.new(root, {
            stops: [
              { color: am5.color(0xff1493) }, // DeepPink
              { color: am5.color(0xc71585) }, // MediumVioletRed
            ],
          }),
          Miscellaneous: am5.LinearGradient.new(root, {
            stops: [
              { color: am5.color(0x8a2be2) }, // BlueViolet
              { color: am5.color(0x6a0dad) }, // Darker Violet
            ],
          }),
        };

        return data?.category ? gradientMap[data.category] || fill : fill;
      });

      series.data.setAll(chartData);

      // Apply color to slices using fillField
      series.slices.template.setAll({
        stroke: am5.color(!isDarkMode ? 0xffffff : 0x000000),
        strokeWidth: 2,
        cornerRadius: 5,
      });

      // Enable animations for the slices
      series.appear(1000, 100);

      // Hide labels outside the chart (by showing only the value in the center label)
      series.labels.template.set('forceHidden', true);
      series.ticks.template.set('forceHidden', true);

      // Add label in the center
      chart.seriesContainer.children.push(
        am5.Label.new(root, {
          text: `Expense\n${totalExpensesOfMonth}`,
          textAlign: 'center',
          centerX: am5.percent(50),
          centerY: am5.percent(50),
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: 'Karla',
          fill: am5.color(isDarkMode ? 0xffffff : 0x000000),
        })
      );

      // Clean up chart when the component is unmounted
      return () => {
        root.dispose();
      };
    }
  }, [
    Housing_UtilitiesExpenses,
    FoodExpenses,
    GroceriesExpenses,
    PersonalExpenses,
    MiscellaneousExpenses,
    isDarkMode,
  ]);

  const total = categoryData.reduce((acc, { value }) => acc + (value ?? 0), 0);

  return (
    <div
      id="donut_chart_category_expense_section"
      className="flex w-full max-w-full flex-col items-center rounded-lg border border-border_light bg-bg_primary_light p-0 py-4 shadow-sm dark:border-border_dark dark:bg-bg_primary_dark md:p-4"
    >
      <h2 className="mb-4 text-center text-lg font-semibold md:text-left">
        Category wise Expenses Visualization
      </h2>
      {isPending && <DonutChartLoader />}
      <div
        className={`chart_element_container ${isPending ? 'hidden' : 'flex'} w-full flex-col items-center justify-center gap-4 sm:flex-row`}
      >
        <div
          ref={chartRef}
          className="h-52 w-52"
          style={{ maxWidth: '400px' }}
        ></div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm sm:flex-col sm:items-start sm:justify-start">
          {categoryData.map(({ label, value, color }) => (
            <React.Fragment key={label}>
              {value !== 0 && (
                <div className="flex items-center space-x-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-sm p-0.5 text-sm font-semibold text-white"
                    style={{ background: color }}
                  >
                    {`${
                      (((value ?? 0) / total) * 100).toFixed(0) === '0'
                        ? (((value ?? 0) / total) * 100).toFixed(1)
                        : (((value ?? 0) / total) * 100).toFixed(0)
                    }%`}
                  </div>
                  <span>{label}</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseExpensesChart;
