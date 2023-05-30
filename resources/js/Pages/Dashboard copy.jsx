import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Link, Head } from "@inertiajs/react";
import React from "react";
import Highcharts from "highcharts";
import LeaderLayout from "@/Layouts/LeaderLayout";
import accessibility from 'highcharts/modules/accessibility';


const Home = ({ data }) => {
    const shiftChartRef = React.useRef(null);
    const personChartRef = React.useRef(null);
    const dailyChartRef = React.useRef(null);
    const monthlyChartRef = React.useRef(null);
    const weeklyChartRef = React.useRef(null);
    const productChartRef = React.useRef(null);
    console.log("data:", data);

    accessibility(Highcharts);
Highcharts.setOptions({
  accessibility: {
    enabled: false
  }
});

    React.useEffect(() => {
        //CODINGAN AWAL SHIFT
        if (shiftChartRef.current) {
            Highcharts.chart(shiftChartRef.current, {
                chart: {
                    type: "column",
                    
                 
                },
                title: {
                    text: "Chart Target Per Shift",
                },
                subtitle: {
                    text: "Data Chart Terbaru",
                },
                xAxis: {
                    type: "category",
                },
                yAxis: {
                    title: {
                        text: "Total Data",
                    },
                },
                legend: {
                    enabled: false,
                },
                series: [
                    {
                        name: "Total Lot",
                        data: Array.isArray(data.Shift)
                            ? data.Shift.map((item) => ({
                                  name: item.name,
                                  y: item.total_lot,
                              }))
                            : [],
                    },
                    {
                        name: "QTY",
                        data: Array.isArray(data.Shift)
                            ? data.Shift.map((item) => ({
                                  name: item.name,
                                  y: item.qty,
                              }))
                            : [],
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
                                    layout: "horizontal",
                                    align: "center",
                                    verticalAlign: "bottom",
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
                    type: "column",
                    
               
                },
                title: {
                    text: "Chart Drawing Number Harian",
                },
                subtitle: {
                    text: "Data Chart Terbaru",
                },
                xAxis: {
                    type: "category",
                },
                yAxis: {
                    title: {
                        text: "Total Data",
                    },
                },
                legend: {
                    enabled: false,
                },
                series: [
                    {
                        name: "Total Lot",
                        data: Array.isArray(data.Daily)
                            ? data.Daily.map((item) => ({
                                  name: item.name,
                                  y: item.total_lot,
                              }))
                            : [],
                    },
                    {
                        name: "QTY",
                        data: Array.isArray(data.Daily)
                            ? data.Daily.map((item) => ({
                                  name: item.name,
                                  y: item.qty,
                              }))
                            : [],
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
                                    layout: "horizontal",
                                    align: "center",
                                    verticalAlign: "bottom",
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
                    type: "column",
                    
                 
                },
                title: {
                    text: "Chart Drawing Number Mingguan",
                },
                subtitle: {
                    text: "Data Chart Terbaru",
                },
                xAxis: {
                    type: "category",
                },
                yAxis: {
                    title: {
                        text: "Total Data",
                    },
                },
                legend: {
                    enabled: false,
                },
                series: [
                    {
                        name: "Total Lot",
                        data: Array.isArray(data.Weekly)
                            ? data.Weekly.map((item) => ({
                                  name: item.name,
                                  y: item.total_lot,
                              }))
                            : [],
                    },
                    {
                        name: "QTY",
                        data: Array.isArray(data.Weekly)
                            ? data.Weekly.map((item) => ({
                                  name: item.name,
                                  y: item.qty,
                              }))
                            : [],
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
                                    layout: "horizontal",
                                    align: "center",
                                    verticalAlign: "bottom",
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
                type: "column",
              },
              title: {
                text: "Chart Drawing Number Bulanan",
              },
              subtitle: {
                text: "Data Chart Terbaru",
              },
              xAxis: {
                type: "category",
              },
              yAxis: {
                title: {
                  text: "Total Data",
                },
              },
              legend: {
                enabled: false,
              },
              series: [
                {
                  name: "Total Lot",
                  data: Array.isArray(data.Monthly)
                    ? data.Monthly.map((item) => ({
                        name: monthNames[item.month - 1],
                        y: item.total_lot,
                      }))
                    : [],
                },
                {
                  name: "QTY",
                  data: Array.isArray(data.Monthly)
                    ? data.Monthly.map((item) => ({
                        name: monthNames[item.month - 1],
                        y: item.qty,
                      }))
                    : [],
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
                        layout: "horizontal",
                        align: "center",
                        verticalAlign: "bottom",
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
                    type: "column",
                   
                
                },
                title: {
                    text: "Chart Target Per Operator",
                },
                subtitle: {
                    text: "Data Chart Terbaru",
                },
                xAxis: {
                    type: "category",
                },
                yAxis: {
                    title: {
                        text: "Total Data",
                    },
                },
                legend: {
                    enabled: false,
                },
                series: [
                    {
                        name: "Total Lot",
                        data: Array.isArray(data.Person)
                            ? data.Person.map((item) => ({
                                  name: item.name1,
                                  y: item.total_lot,
                              }))
                            : [],
                    },
                    {
                        name: "QTY",
                        data: Array.isArray(data.Person)
                            ? data.Person.map((item) => ({
                                  name: item.name1,
                                  y: item.qty1,
                              }))
                            : [],
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
                                    layout: "horizontal",
                                    align: "center",
                                    verticalAlign: "bottom",
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
                    type: "column",
                    
                    
                },
                title: {
                    text: "Chart Target Per Product",
                },
                subtitle: {
                    text: "Data Chart Terbaru",
                },
                xAxis: {
                    type: "category",
                },
                yAxis: {
                    title: {
                        text: "Total Data",
                    },
                },
                legend: {
                    enabled: false,
                },
                series: [
                    {
                        name: "Total Lot",
                        data: Array.isArray(data.Product)
                            ? data.Product.map((item) => ({
                                  name: item.name,
                                  y: item.total_lot,
                              }))
                            : [],
                    },
                    {
                        name: "QTY",
                        data: Array.isArray(data.Product)
                            ? data.Product.map((item) => ({
                                  name: item.name,
                                  y: item.qty,
                              }))
                            : [],
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
                                    layout: "horizontal",
                                    align: "center",
                                    verticalAlign: "bottom",
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
            <Navbar roles="admin" />
            {/* content */}

            <div className="container w-full px-10 mx-auto bg-gray-100 py-14">
                {Array.isArray(data.Product) ? (
                    <div className="grid grid-cols-5 gap-6 mb-6">
                        {data.Product.map((item, index) => (
                        <div className="w-full shadow-md bg-white rounded-md p-6 hover:bg-rose-500 group cursor-pointer">
                            <div className="text-gray-500 group-hover:text-white">{item.name}</div>
                            <div className="text-red-600 font-semibold text-2xl group-hover:text-white">{item.qty} Pcs</div>
                        </div>
                        ))}
                    </div>
                ) : (
                    <div>Data Kosong</div>
                )}

                <div className="grid grid-cols-2 gap-6">
                    
                        
                    <div className="w-full shadow-md"  ref={shiftChartRef}></div>
                
                    <div className="w-full shadow-md"  ref={personChartRef}></div>
                
            
                    <div className="w-full shadow-md"   ref={dailyChartRef}></div>
                
                    <div className="w-full shadow-md"  ref={weeklyChartRef}></div>
                
                    <div className="w-full shadow-md"   ref={monthlyChartRef}></div>
                
                    <div className="w-full shadow-md"  ref={productChartRef}></div>
                            
                </div>
            </div>
            <div className="flex justify-between gap-5 mb-6"></div>

            {/* content END */}

            <Footer />
        </>
    );
};

export default Home;
