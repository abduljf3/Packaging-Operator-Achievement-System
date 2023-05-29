import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Link, Head } from "@inertiajs/react";
import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import accessibility from 'highcharts/modules/accessibility';

const Home = ({ data }) => {
    const shiftChartRef = useRef(null);
    const personChartRef = useRef(null);
    const dailyChartRef = useRef(null);
    const monthlyChartRef = useRef(null);
    const weeklyChartRef = useRef(null);
    const productChartRef = useRef(null);
    console.log("data:", data);

    accessibility(Highcharts);
    Highcharts.setOptions({
        accessibility: {
            enabled: false
        }
    });

    useEffect(() => {
        // CODINGAN AWAL MONTHLY
        if (monthlyChartRef.current) {
            const sortedMonthlyData = Array.isArray(data.Monthly)
                ? data.Monthly.sort((a, b) => a.month - b.month)
                : [];

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
                    categories: sortedMonthlyData.map((item) => item.month_name),
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
                        name: "QTY",
                        data: sortedMonthlyData.map((item) => ({
                            name: item.month_name,
                            y: item.qty,
                            key: `qty_${item.month}`,
                        })),
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
        // CODINGAN AHIR MONTHLY
 // CODINGAN AWAL DAILY
 if (dailyChartRef.current) {
    const sortedDailyData = Array.isArray(data.Daily)
        ? data.Daily.sort((a, b) => a.day - b.day)
        : [];

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
            categories: sortedDailyData.map((item) => ` ${item.day}`),
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
                name: "QTY",
                data: sortedDailyData.map((item) => ({
                    name: `Day ${item.day}`,
                    y: item.qty,
                    key: `qty_${item.day}`,
                })),
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
// CODINGAN AHIR DAILY
         // CODINGAN AWAL WEEKLY
    if (weeklyChartRef.current) {
        const sortedWeeklyData = Array.isArray(data.Weekly)
            ? data.Weekly.sort((a, b) => a.week - b.week)
            : [];

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
                categories: sortedWeeklyData.map((item) => `Week ${item.week}`),
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
                    name: "QTY",
                    data: sortedWeeklyData.map((item) => ({
                        name: `Week ${item.week}`,
                        y: item.qty,
                        key: `qty_${item.week}`,
                    })),
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
    // CODINGAN AHIR WEEKLY
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
          name: "QTY",
          data: Array.isArray(data.Shift)
            ? data.Shift
                .sort((a, b) => {
                  // Sort by shift number in ascending order
                  const shiftNumA = parseInt(a.name);
                  const shiftNumB = parseInt(b.name);
                  return shiftNumA - shiftNumB;
                })
                .map((item) => ({
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
                            <div
                                key={`product_${index}`}
                                className="w-full shadow-md bg-white rounded-md p-6 hover:bg-rose-500 group cursor-pointer"
                            >
                                <div className="text-gray-500 group-hover:text-white">{item.name}</div>
                                <div className="text-red-600 font-semibold text-2xl group-hover:text-white">{item.qty.toLocaleString('en')} Pcs</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>Data Kosong</div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full shadow-md" ref={monthlyChartRef}></div>
                    <div className="w-full shadow-md" ref={productChartRef}></div>
                    <div className="w-full shadow-md" ref={weeklyChartRef}></div>
                    <div className="w-full shadow-md" ref={shiftChartRef}></div>
                    <div className="w-full h-full shadow-md md:col-span-2" ref={dailyChartRef}></div>
                </div>
            </div>
            <div className="flex justify-between gap-5 "></div>
            {/* content END */}
            <Footer />
        </>
    );
};

export default Home;
