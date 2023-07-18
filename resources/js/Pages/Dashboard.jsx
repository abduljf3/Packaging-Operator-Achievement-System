import Calendar from "@/Components/Calendar";
import ChartDaily from "@/Components/ChartDaily";
import ChartMonthly from "@/Components/ChartMonthly";
import ChartWeekly from "@/Components/ChartWeekly";
import ChartYearly from "@/Components/ChartYearly";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home({products,yearlyAchievement,monthlyAchievement,weeklyAchievement,dailyAchievement,roles}) {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    return (
        <>
        <Head title="Welcome" />
            <div className="w-full min-h-screen flex flex-col justify-between bg-gray-200">
                <Navbar roles={roles} />
                <Calendar/>
                <div className="container w-full mx-auto h-full grow">
                    <div className="w-full mb-5">
                        {products.length > 0 ? (
                            <div className="grid grid-cols-5 gap-6 mb-8">
                                {products.sort((a, b) => b.total_qty - a.total_qty) // Sort by highest qty
                                    .map((product, index) => (
                                        <div
                                            key={`product_${index}`}
                                            className="w-full shadow-md bg-white rounded-md p-6 hover:bg-rose-500 group cursor-pointer duration-500"
                                        >
                                            <div className="text-gray-500 group-hover:text-white duration-500">
                                                {product.product_type}
                                            </div>
                                            <div className="text-red-600 font-semibold text-2xl group-hover:text-white duration-500">
                                                {product.total_qty.toLocaleString("US")} Pcs
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className="block text-center py-3 bg-rose-500 text-white">Data Kosong</div>
                        )}
                        </div>

                        
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={false}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="overflow-hidden bg-transparent"
                        >
                            <SwiperSlide>
                                <div className="bg-white rounded-md overflow-hidden shadow-md h-[36rem]">
                                    <div className="w-full border-b border-gray-300">
                                        <h1 className="font-semibold px-5 py-2 block text-red-600">Monthly Achievement {year}</h1>
                                    </div>
                                    <ChartYearly achievements={yearlyAchievement}/>
                                </div>
                            </SwiperSlide>    
                            <SwiperSlide>
                                <div className="bg-white rounded-md overflow-hidden shadow-md h-[36rem]">
                                    <div className="w-full border-b border-gray-300">
                                        <h1 className="font-semibold px-5 py-2 block text-red-600">Achievement {month} {year}</h1>
                                    </div>
                                    <ChartMonthly achievements={monthlyAchievement}/>
                                </div>
                            </SwiperSlide>      
                            <SwiperSlide>
                                <div className="bg-white rounded-md overflow-hidden shadow-md h-[36rem]">
                                    <div className="w-full border-b border-gray-300">
                                        <h1 className="font-semibold px-5 py-2 block text-red-600">Weakly Achievement {month} {year}</h1>
                                    </div>
                                    <ChartWeekly achievements={weeklyAchievement}/>
                                </div>
                            </SwiperSlide> 
                            <SwiperSlide>
                                <div className="bg-white rounded-md overflow-hidden shadow-md h-[36rem]">
                                    <div className="w-full border-b border-gray-300">
                                        <h1 className="font-semibold px-5 py-2 block text-red-600">Daily Achievement {month} {year}</h1>
                                    </div>
                                    <ChartDaily achievements={dailyAchievement}/>
                                </div>
                            </SwiperSlide>           
                        </Swiper>
                    </div>
                <Footer />
            </div>
        </>
    )
}