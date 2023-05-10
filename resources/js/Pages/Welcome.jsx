import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Link, Head } from "@inertiajs/react";
import React from 'react';
import Highcharts from 'highcharts';
import LeaderLayout from "@/Layouts/LeaderLayout";




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
          width: '500', // Lebar grafik dalam piksel
          height: '300', // Tinggi grafik dalam piksel
          borderWidth: 3, // Lebar border dalam piksel
          borderColor: '#ccc', // Warna border
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
          width: '500', // Lebar grafik dalam piksel
          height: '300', // Tinggi grafik dalam piksel
          borderWidth: 3, // Lebar border dalam piksel
          borderColor: '#ccc', // Warna border
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
          width: '500', // Lebar grafik dalam piksel
          height: '300', // Tinggi grafik dalam piksel
          borderWidth: 3, // Lebar border dalam piksel
          borderColor: '#ccc', // Warna border
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
          width: '500', // Lebar grafik dalam piksel
          height: '300', // Tinggi grafik dalam piksel
          borderWidth: 3, // Lebar border dalam piksel
          borderColor: '#ccc', // Warna border
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
          width: '500', // Lebar grafik dalam piksel
          height: '300', // Tinggi grafik dalam piksel
          borderWidth: 3, // Lebar border dalam piksel
          borderColor: '#ccc', // Warna border
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
          width: '500', // Lebar grafik dalam piksel
          height: '300', // Tinggi grafik dalam piksel
          borderWidth: 3, // Lebar border dalam piksel
          borderColor: '#ccc', // Warna border
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
        <>
            <Head title="Welcome" />
            <Navbar roles />
            {/* content */}
            
            <div className="container w-full px-10 mx-auto bg-gray-100 py-14">
                <div className="flex justify-between gap-5 mb-10">
                    <div className="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            className="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            Oil Seal
                        </h1>
                        <h1
                            className="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                    
                    <div className="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            className="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            O-Ring
                        </h1>
                        <h1
                            className="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                    <div className="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            className="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            Rubber Part
                        </h1>
                        <h1
                            className="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                    <div className="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            className="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            Joint Carburator
                        </h1>
                        <h1
                            className="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                    <div className="w-40 bg-white border-2 border-gray-200 h-30 rounded-xl">
                        <h1
                            className="px-3 py-2 text-sm font-bold leading-snug text-center text-black hover:opacity-75"
                            href="#pablo"
                        >
                            Oil Level Gauge
                        </h1>
                        <h1
                            className="px-3 py-2 text-2xl italic font-bold leading-snug text-center text-red-600 hover:opacity-75"
                            href="#pablo"
                        >
                            5000pcs
                        </h1>
                    </div>
                    
                </div>
           
             
               
            </div>
            <div className='flex justify-center justify'>
    <div>
        
        <div className='flex gap-5'>

            <div>
                <h2>New User Growth by Shift, 2020</h2>
                <div ref={shiftChartRef}></div>
            </div>
        <div>
            <h2>New User Growth by Person, 2020</h2>
            <div ref={personChartRef}></div>
        </div>
    </div>

    <div className='flex gap-5'>
      <div >
        <h2>New User Growth by Daily, 2020</h2>
          <div ref={dailyChartRef}></div>
      </div>


      <div>
        <h2>New User Growth by Weekly, 2020</h2>
        
        <div ref={weeklyChartRef}></div>
      </div>
    </div>

    {Array.isArray(data.Product) ? (
  data.Product.map(item => (
    <div key={item.name}>
      <span>{item.name}: </span>
      <span>Total Lot: {item.total_lot}, QTY: {item.qty}</span>
    </div>
  ))
) : (
  <div>No data available</div>
)}


    <div className='flex gap-5'>
      <div>
        <h2>New User Growth by Monthly, 2020</h2>
        <div ref={monthlyChartRef}></div>
      </div>

      <div>
        <h2>New User Growth by Product, 2020</h2>
        
        <div ref={productChartRef}></div>
      </div>
      
    </div>
    </div>
    </div>

            
            {/* content END */}

            <Footer />
        </>
    );
};

export default Home;
