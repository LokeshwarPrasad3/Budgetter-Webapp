import React, { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

interface CategoryWiseDataPropTypes {
  totalExpensesOfMonth: number | undefined;
  CategoryWiseData?: {
    GroceriesExpenses: number;
    Housing_UtilitiesExpenses: number;
    MedicalExpenses: number;
    FoodExpenses: number;
    PersonalExpenses: number;
    EducationalExpenses: number;
    TransportationExpenses: number;
    MiscellaneousExpenses: number;
  };
}

interface ChartData {
  category: string;
  value: number;
  color: am5.Color;
}

const CategoryWiseExpensesChart: React.FC<CategoryWiseDataPropTypes> = ({
  CategoryWiseData,
  totalExpensesOfMonth,
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
    { label: 'Groceries', value: GroceriesExpenses, color: '#FF6347' },
    {
      label: 'Housing & Utilities',
      value: Housing_UtilitiesExpenses,
      color: '#FFA500',
    },
    { label: 'Medical', value: MedicalExpenses, color: '#4682B4' },
    { label: 'Food', value: FoodExpenses, color: '#6A5ACD' },
    { label: 'Personal', value: PersonalExpenses, color: '#32CD32 ' },
    { label: 'Educational', value: EducationalExpenses, color: '#FFD700 ' },
    {
      label: 'Transportation',
      value: TransportationExpenses,
      color: '#FF1493 ',
    },
    {
      label: 'Miscellaneous',
      value: MiscellaneousExpenses,
      color: '#8A2BE2 ',
    },
  ];

  const chartRef = useRef<HTMLDivElement>(null);

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
        { category: 'Food', value: FoodExpenses || 0, color: am5.color(0x6a5acd) }, // Orange
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

      series.data.setAll(chartData);

      // Apply color to slices using fillField
      series.slices.template.setAll({
        stroke: am5.color(0xffffff),
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
  ]);

  return (
    <div className="flex items-center p-0 py-4 md:p-4 bg-white rounded-lg shadow-sm flex-col max-w-full w-full">
      <h2 className="text-lg md:text-left text-center font-semibold mb-4">
        Category wise Expenses Visualization
      </h2>
      <div className="chart_element_container flex flex-col sm:flex-row justify-center items-center w-full">
        <div
          ref={chartRef}
          className="h-52 w-52"
          style={{ maxWidth: '400px' }}
        ></div>
        <div className="flex flex-wrap sm:flex-col gap-2 justify-center sm:justify-start items-center sm:items-start text-sm">
          {categoryData.map(({ label, value, color }) => (
            <React.Fragment key={label}>
              {value !== 0 && (
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-[2px]"
                    style={{ backgroundColor: color }}
                  ></div>
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
