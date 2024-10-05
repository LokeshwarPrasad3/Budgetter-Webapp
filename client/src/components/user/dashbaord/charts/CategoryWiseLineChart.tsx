import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const CategoryWiseLineChart: React.FC = () => {
  const chartRef = useRef(null);

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
      });

      const series = chart.series.push(
        am5xy.StepLineSeries.new(root, {
          name: 'Expenses',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'value',
          categoryXField: 'day',
          tooltip: am5.Tooltip.new(root, {
            labelText: '${valueY}',
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

      const data = [
        { day: 'Sunday', value: 290 },
        { day: 'Monday', value: 420 },
        { day: 'Tuesday', value: 420 },
        { day: 'Wednesday', value: 950 },
        { day: 'Thursday', value: 650 },
        { day: 'Friday', value: 650 },
        { day: 'Saturday', value: 560 },
      ];

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
  }, []);

  return (
    <>
      <div className="flex items-center p-0 py-5 md:p-4 bg-white rounded-lg shadow-sm flex-col max-w-full w-full">
        <h2 className="text-lg text-left font-semibold mb-4">
          Monthly Expenses
        </h2>
        <div className="chart_element_container flex justify-center items-center w-full h-full">
          <div
            ref={chartRef}
            className="h-[210px] w-full xl:w-[650px]"
            style={{ maxWidth: '100%' }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default CategoryWiseLineChart;
