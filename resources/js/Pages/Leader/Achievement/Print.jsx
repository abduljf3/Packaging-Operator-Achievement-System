import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head } from "@inertiajs/react";
import { format } from "date-fns";
import { id } from 'date-fns/locale';
import { useEffect } from "react";

export default function Print({ achievements,data}) {
    useEffect(() => {
        window.document.title = "Data Achievement";
        window.print();
    }, []);
    
    const formatDate = (date) => {
        return format(new Date(date), 'dd-MM-yyyy', { locale: id });
    }

    const formatTime = (time) => {
        const formatTime = new Date(`1970-01-01T${time}`);
        return formatTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    }

    const calculateTarget =(row) => {
        let target = parseInt(row.target.quantity);
        const startTime = new Date(`2023-07-22T${row.start}`);
        const finishTime = new Date(`2023-07-22T${row.finish}`);
        let differenceTime = (finishTime - startTime) / 60000;    
        let minutes = 0;
        if(row.shift === 1){
            minutes = 415;
        }else if(row.shift === 2){
            minutes = 395;
        }
        let targetActual = Math.round((differenceTime/minutes)*target);
        return targetActual;
    }

    const achievementPercents = (rowQuantity, rowTarget) => {
        let qty = Math.round(rowQuantity);
        let target = Math.round(rowTarget);
        let achievement = Math.round((qty / target)*100);
        let progressWidth = achievement > 100 ? 100 : Math.round(achievement);
        return (
            <div className="w-full h-4 rounded-full">
                <div
                className={`h-full block rounded-full text-right px-2 text-xs text-white ${progressWidth <= 50 ? 'bg-red-500' : progressWidth <= 75 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                style={{ width: `${progressWidth}%` }}
                >{achievement}%</div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <Head title="Achievement" />
            <style>
                {`
                    @media print {
                    @page {
                        size: landscape;
                    }
                    }
                `}
            </style>
            <div className="w-full flex justify-between">
                <div className="flex w-fit items-center gap-1">
                    <ApplicationLogo className="h-10"/>
                    <div className="flex flex-col gap-0">
                        <div className="font-semibold text-gray-800 text-sm">PT. Arai Rubeer Seal Indonesia</div>
                        <div className="text-xs text-gray-800">Packaging Section</div>
                    </div>
                </div>
            </div>
            <h1 className="text-gray-800 text-3xl font-semibold text-center w-full">Detail Achievement Packaging</h1>  
            <div className="text-gray-800 font-semibold w-full mb-3 text">Periode : {formatDate(data.from_date)} - {formatDate(data.to_date)}</div>  
            <table class="border-collapse border border-slate-400 table-auto w-full">
            <thead>
                <tr>
                    <th class="border border-slate-400">No</th>
                    <th class="border border-slate-400">Date</th>
                    <th class="border border-slate-400">Shift</th>
                    <th class="border border-slate-400">NPK</th>
                    <th class="border border-slate-400">Name</th>
                    <th class="border border-slate-400">Drw. No.</th>
                    <th class="border border-slate-400">Lot No.</th>
                    <th class="border border-slate-400">Total Lot</th>
                    <th class="border border-slate-400">Start</th>
                    <th class="border border-slate-400">Qty (pcs)</th>
                    <th class="border border-slate-400">Finish</th>
                    <th class="border border-slate-400">Target (pcs)</th>
                    <th class="border border-slate-400">Achievement (%)</th>
                </tr>
            </thead>
            <tbody>
                {achievements.map((achievement,index) => (
                    <tr key={achievement.id}>
                        <td class="px-2 text-center border border-slate-400">{index+1}</td>
                        <td class="px-2 text-center border border-slate-400">{formatDate(achievement.date)}</td>
                        <td class="px-2 text-center border border-slate-400">{achievement.shift}</td>
                        <td class="px-2 text-center border border-slate-400">{achievement.user.npk}</td>
                        <td class="px-2 text-center border border-slate-400">{achievement.user.fullname}</td>
                        <td class="px-2 text-center border border-slate-400">{achievement.product.drw_no}</td>
                        <td class="px-2 text-center border border-slate-400">{achievement.product_lot}</td>
                        <td class="px-2 text-center border border-slate-400">{achievement.total_lot}</td>
                        <td class="px-2 text-center border border-slate-400">{formatTime(achievement.start)}</td>
                        <td class="px-2 text-center border border-slate-400">{formatTime(achievement.finish)}</td>
                        <td class="px-2 text-center border border-slate-400">{Math.round(achievement.qty).toLocaleString()}</td>
                        <td class="px-2 text-center border border-slate-400">{calculateTarget(achievement).toLocaleString()}</td>
                        <td class="px-2 text-center border border-slate-400">
                            {achievementPercents(achievement.qty, calculateTarget(achievement))}
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>     
        </div>
    );
}
