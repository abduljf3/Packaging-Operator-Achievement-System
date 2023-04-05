import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  
                    <div className="py-12 mx-10">
                     <div className="bg-red-400 overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 text-gray-900">You're logged in!</div>
                        <a href="http://localhost:8000/admin/Achievement">Admin Achievement</a><br></br>
                        <a href="http://localhost:8000/admin/Leader">Admin Leader</a><br></br>
                        <a href="http://localhost:8000/admin/Employee">Admin Employee</a><br></br>
                        <a href="http://localhost:8000/admin/products">Admin Products</a><br></br>
                        <br></br><br></br>
                        <a href="http://localhost:8000/operator/products">Operator Input Achievement</a><br></br>
                        <br></br><br></br>
                        <a href="http://localhost:8000/leader">Pimpinan Report Detail</a><br></br>
                        <a href="http://localhost:8000/leader/detail">Pimpinan Report Rekapitulasi</a><br></br>
                        <br></br><br></br>
                        <a href="http://localhost:8000/">Guess</a><br></br>
                    
                </div>
            </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
