import React, { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const CategoryWiseExpensesChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const root = am5.Root.new(chartRef.current);

      // Apply the animated theme
      root.setThemes([am5themes_Animated.new(root)]);

      // Remove amCharts logo
      root._logo.dispose();

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

      series.data.setAll([
        { category: 'Housing & Utilities', value: 20, color: '#8A4FFF' },
        { category: 'Food', value: 20, color: '#5E5CE6' },
        { category: 'Groceries', value: 20, color: '#4A90E2' },
        { category: 'Personal Care', value: 20, color: '#50E3C2' },
        { category: 'Miscellaneous', value: 20, color: '#B8E986' },
      ]);

      // Apply color to slices
      series.slices.template.setAll({
        fillField: 'color',
        stroke: am5.color(0xffffff),
        strokeWidth: 2,
        cornerRadius: 5,
      });

      // Hide labels outside the chart (by showing only the value in the center label)
      series.labels.template.set('forceHidden', true);
      series.ticks.template.set('forceHidden', true);

      // Add label in the center
      chart.seriesContainer.children.push(
        am5.Label.new(root, {
          text: 'Expense\n1000',
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
  }, []);

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
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-[2px] bg-[#A8905F]"></div>
            <span>Housing & Utilities</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-[2px] bg-[#FFA500]"></div>
            <span>Food</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-[2px] bg-[#FF6F61]"></div>
            <span>Groceries</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-[2px] bg-[#FFB7C5]"></div>
            <span>Personal Care</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-[2px] bg-[#4682B4]"></div>
            <span>Miscellaneous</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseExpensesChart;
