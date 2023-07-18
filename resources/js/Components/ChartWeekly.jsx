import { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';

export default function ChartWeekly({ achievements }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (achievements) {
      const labels = achievements.map((achievement, index) => index + 1);
      const productTypes = [...new Set(achievements.map((achievement) => achievement.product_type))];
      const datasets = [];

      // Generate random colors for each product type
      const colorPalette = generateRandomColors(productTypes.length);

      productTypes.forEach((productType, index) => {
        const data = achievements.filter((achievement) => achievement.product_type === productType)
          .map((achievement) => achievement.total_qty);

        datasets.push({
          label: productType,
          data: data,
          backgroundColor: colorPalette[index],
          borderColor: colorPalette[index],
          borderWidth: 1,
        });
      });

      const chartData = {
        labels: labels,
        datasets: datasets,
      };

      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Week',
                color: '#911',
                font: {
                  size: 20,
                  style: 'normal',
                },
                padding: { top: 10, left: 0, right: 0, bottom: 70 }
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Pcs',
                color: '#191',
                font: {
                  size: 20,
                  style: 'normal',
                },
              }
            },
          },
        },
      });
    }
  }, [achievements]);

  useEffect(() => {
    const updateChartSize = () => {
      const chart = chartRef.current;
      chart.width = chart.parentNode.clientWidth;
      chart.style.width = chart.parentNode.clientWidth + 'px';
      chart.height = chart.parentNode.clientHeight;
      chart.style.width = chart.parentNode.clientWidth + 'px';
    };

    window.addEventListener('resize', updateChartSize);

    return () => {
      window.removeEventListener('resize', updateChartSize);
    };
  }, []);

  // Function to generate random colors
  function generateRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, 0.5)`;
      colors.push(color);
    }
    return colors;
  }

  // Function to generate random value within a range
  function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return <canvas ref={chartRef} height={480} width={window.innerWidth} />;
}
