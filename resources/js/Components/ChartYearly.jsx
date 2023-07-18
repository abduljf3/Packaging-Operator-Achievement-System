import { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';

export default function ChartYearly({ achievements }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (achievements) {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const labels = monthNames.map((monthName, index) => {
        const foundData = achievements.find((achievement) => achievement.month === (index + 1));
        return foundData ? monthName : `${monthName}`;
      });

      const data = monthNames.map((monthName, index) => {
        const foundData = achievements.find((achievement) => achievement.month === (index + 1));
        return foundData ? foundData.total : 0;
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
                text: 'Month',
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

  return <canvas ref={chartRef} height={500} width={window.innerWidth} />;
}
