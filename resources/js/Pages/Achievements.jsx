import React from 'react';
import Highcharts from 'highcharts';
import { Inertia } from '@inertiajs/inertia';

const Home = ({ data }) => {
  const shiftChartRef = React.useRef(null);
  const personChartRef = React.useRef(null);
  const dailyChartRef = React.useRef(null);
  const monthlyChartRef = React.useRef(null);
  const weeklyChartRef = React.useRef(null);
  const productChartRef = React.useRef(null);
  console.log('data:', data);

  React.useEffect(() => {

    //CODINGAN AWAL SHIFT
    if (shiftChartRef.current) {
      Highcharts.chart(shiftChartRef.current, {
        chart: {
          type: 'column',
        },
        title: {
          text: 'New User Growth by Shift, 2020',
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
            data: Array.isArray(data.Shift) ? data.Shift.map(item => ({ name: item.name, y: item.total_lot })) : [],
          },
          {
            name: 'QTY',
            data: Array.isArray(data.Shift) ? data.Shift.map(item => ({ name: item.name, y: item.qty })) : [],
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
      //CODINGAN AHIR SHIFT

      //CODINGAN AWAL DAILY
    if (dailyChartRef.current) {
      Highcharts.chart(dailyChartRef.current, {
        chart: {
          type: 'column',
        },
        title: {
          text: 'New User Growth by Daily, 2020',
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
            data: Array.isArray(data.Daily) ? data.Daily.map(item => ({ name: item.name, y: item.total_lot })) : [],
          },
          {
            name: 'QTY',
            data: Array.isArray(data.Daily) ? data.Daily.map(item => ({ name: item.name, y: item.qty })) : [],
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
      //CODINGAN AHIR DAILY

      //CODINGAN AWAL WEEKLY
    if (weeklyChartRef.current) {
      Highcharts.chart(weeklyChartRef.current, {
        chart: {
          type: 'column',
        },
        title: {
          text: 'New User Growth by Weekly, 2020',
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
            data: Array.isArray(data.Weekly) ? data.Weekly.map(item => ({ name: item.name, y: item.total_lot })) : [],
          },
          {
            name: 'QTY',
            data: Array.isArray(data.Weekly) ? data.Weekly.map(item => ({ name: item.name, y: item.qty })) : [],
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
  //CODINGAN AHIR WEEKLY

  //CODINGAN AWAL MONTHLY
    if (monthlyChartRef.current) {
      Highcharts.chart(monthlyChartRef.current, {
        chart: {
          type: 'column',
        },
        title: {
          text: 'New User Growth by Monthly, 2020',
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
            data: Array.isArray(data.Monthly) ? data.Monthly.map(item => ({ name: item.name, y: item.total_lot })) : [],
          },
          {
            name: 'QTY',
            data: Array.isArray(data.Monthly) ? data.Monthly.map(item => ({ name: item.name, y: item.qty })) : [],
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
  //CODINGAN AHIR MONTHLY

    //CODINGAN AWAL PERSON
    if (personChartRef.current) {
      Highcharts.chart(personChartRef.current, {
        chart: {
          type: 'column',
        },
        title: {
          text: 'New User Growth by Person, 2020',
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
            data: Array.isArray(data.Person) ? data.Person.map(item => ({ name: item.name1, y: item.total_lot })) : [],
          },
          {
            name: 'QTY',
            data: Array.isArray(data.Person) ? data.Person.map(item => ({ name: item.name1, y: item.qty1 })) : [],
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
  //CODINGAN AHIR PERSON

  //CODINGAN AWAL PRODUCT
    if (productChartRef.current) {
      Highcharts.chart(productChartRef.current, {
        chart: {
          type: 'column',
        },
        title: {
          text: 'New User Growth by Product, 2020',
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
            data: Array.isArray(data.Product) ? data.Product.map(item => ({ name: item.name, y: item.total_lot })) : [],
          },
          {
            name: 'QTY',
            data: Array.isArray(data.Product) ? data.Product.map(item => ({ name: item.name, y: item.qty })) : [],
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
    //CODINGAN AHIR PRODUCT
  }, [data]);



  
  return (
    <div>
      <h1>Highcharts in Laravel Example</h1>
      <div>
        <h2>New User Growth by Shift, 2020</h2>
        <div ref={shiftChartRef}></div>
      </div>

      <div>
        <h2>New User Growth by Person, 2020</h2>
        <div ref={personChartRef}></div>
      </div>

      <div>
        <h2>New User Growth by Daily, 2020</h2>
        <div ref={dailyChartRef}></div>
      </div>

      <div>
        <h2>New User Growth by Weekly, 2020</h2>
        <div ref={weeklyChartRef}></div>
      </div>
      
      <div>
        <h2>New User Growth by Monthly, 2020</h2>
        <div ref={monthlyChartRef}></div>
      </div>

      <div>
        <h2>New User Growth by Product, 2020</h2>
        <div ref={productChartRef}></div>
      </div>
    </div>

  );
};

export default Home;
