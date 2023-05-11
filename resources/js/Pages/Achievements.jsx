import React from 'react';
import Highcharts from 'highcharts';

const Home = ({ data }) => {
  const chartRef = React.useRef(null);
  
  React.useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: {
          type: 'column',
        },
        title: {
          text: 'New User Growth, 2020',
        },
        subtitle: {
          text: 'Source: positronx.io',
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          title: {
            text: 'Number of New Data',
          },
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            name: 'Total Lot',
            data: data.map(item => ({ name: item.name, y: item.total_lot, })),
           
          },
          {
            name: 'QTY',
            data: data.map(item => ({ name: item.name, y: item.qty, })),
           
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom',
                },
              },
            },
          ],
        },
      });
    }
  }, [data]);

  return (
    <div>
      <h1>Highcharts in Laravel Example</h1>
      <div ref={chartRef}></div>

      <div>
      <h1>TARGET</h1>
      <div>
        {data.map(item => (
          <div key={item.name}>
            <span>{item.name}: </span>
            <span>{item.qty}</span>
          </div>
        ))}
      </div>
      <div ref={chartRef}></div>
    </div>
    
    </div>
  );
};

export default Home;
