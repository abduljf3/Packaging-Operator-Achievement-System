import { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';

export default function ChartMonthly({ achievements }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (achievements) {
      const labels = achievements.map((type, index) => {
       return type.product_type
      });

      const data = achievements.map((type, index) => {
        return type.total_qty
      });

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Achievements",
            data: data,
            backgroundColor: 'rgba(135, 206, 235, 0.5)',
            borderColor: 'rgba(70, 130, 180, 1)',
            borderWidth: 1,
          },
        ],
      };

      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          maintainAspectRatio: false,
          scales: {
            x: {
              maxBarThickness: 50,
              title: {
                display: true,
                text: 'Product Type',
                color: '#911',
                font: {
                    size: 20,
                    style: 'normal',
                },
                padding: {top: 10, left: 0, right: 0, bottom: 70}
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
  
  return <canvas ref={chartRef} height={480} width={window.innerWidth} />;
}
