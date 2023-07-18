import { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';

export default function ChartDaily({ achievements }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (achievements) {
      const uniqueDates = generateDateRange();
      const shifts = [...new Set(achievements.map((achievement) => achievement.shift))];
      const datasets = [];

      shifts.forEach((shift, index) => {
        const shiftData = achievements.filter((achievement) => achievement.shift === shift);
        const data = uniqueDates.map((date) => {
          const shiftAchievement = shiftData.find((achievement) => achievement.date === date);
          return shiftAchievement ? shiftAchievement.total_qty : 0;
        });
      
        const colors = ['rgba(10, 206, 235, 0.5)', 'rgba(15, 235, 135, 0.5)', 'rgba(235, 135, 206, 0.5)'];
        const color = colors[index % colors.length]; // Memperoleh warna sesuai indeks
      
        datasets.push({
          label: `Shift ${shift}`,
          data: data,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        });
      });
      

      const chartData = {
        labels: uniqueDates,
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
                text: 'Date',
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

  // Function to generate date range from 1st of the month to today's date
  function generateDateRange() {
    const startDate = new Date();
    startDate.setDate(1);
    const endDate = new Date();
    const dateRange = [];

    while (startDate <= endDate) {
      dateRange.push(formatDate(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    return dateRange;
  }

  // Function to format date as 'yyyy-mm-dd'
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return <canvas ref={chartRef} height={480} width={window.innerWidth} />;
}
