import ButtonGreen from "@/Components/ButtonGreen";
import Calendar from "@/Components/Calendar";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";

export default function Edit({ users, achievement, products, auth }) {
    const [selectedUser, setSelectedUser] = useState({});
    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedShift, setSelectedShift] = useState({});
    const { data, setData } = useForm({
        id: achievement.id,
        date: achievement.date,
        shift: achievement.shift,
        group: achievement.user.group,
        user_id: achievement.user_id,
        npk: achievement.user.npk,
        fullname: achievement.user.fullname,
        customer_id: achievement.product.customer_id,
        drw_no: achievement.product.drw_no,
        product_id: achievement.product_id,
        product_name: achievement.product.product_name,
        spring_lot: achievement.spring_lot,
        product_lot: achievement.product_lot,
        total_lot: achievement.total_lot,
        qty: achievement.qty,
        remarks: achievement.remarks,
    });

    const optionUsers = users.map((user) => ({
        value: user.id,
        label: user.npk,
    }));

    const optionProducts = products.map((product) => ({
        value: product.id,
        label: product.drw_no,
    }));

    const handleUserChange = (selectedOption) => {
        const user = users.find((item) => item.id === selectedOption.value);
        setData((data) => ({
            ...data,
            user_id:selectedOption.value,
            fullname:user.fullname,
            group: user.group,
        }));
    };

    const handleProductChange = (selectedOption) => {
        const product = products.find((item) => item.id === selectedOption.value);
        setData((data) => ({
            ...data,
            product_id: selectedOption.value,
            product_name: product.product_name,
        }));
    };

    const optionShifts = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
    ];

    const handleShiftChange = (selectedOption) => {
        setData((data) => ({
            ...data,
            shift: selectedOption.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            text: 'Simpan?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("admin.achievement.update", achievement.id), {
                    _method: "PUT",
                    ...data,
                });
            }
        })
        
    };

    return (
        <>
            <Head title="Edit Achievement" />
            <Authenticated>
                <Calendar/>
                <div className="flex justify-center w-full items-center py-20">
                    <div className="w-full md:max-w-7xl">
                        <div className="p-4 bg-white shadow sm:rounded-lg">
                            <div className="mb-6 font-extrabold">
                                <h1>Edit Achievement</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="w-full">
                                        <div className="mb-5">
                                            <InputLabel value="NPK" />
                                            <Select
                                                onChange={handleUserChange}
                                                options={optionUsers}
                                                value={optionUsers.find(optionUser => optionUser.value === data.user_id)}
                                                className="bg-gray-100"
                                                menuPlacement="auto"
                                                menuPosition="absolute"
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <InputLabel value="Name" />
                                            <TextInput
                                                className="block bg-gray-100 w-full"
                                                type="text"
                                                id="fullname"
                                                name="fullname"
                                                value={data.fullname}
                                                readOnly
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputLabel value="Group" />
                                            <TextInput
                                                className="block bg-gray-100 w-full"
                                                type="text"
                                                name="group"
                                                value={data.group}
                                                disabled={true}
                                            />
                                        </div>
                                        
                                        <div className="flex gap-3">
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Date" />
                                                <TextInput
                                                    type="date"
                                                    className="block bg-gray-100 w-full"
                                                    value={data.date}
                                                    onChange={(e) => setData('date', e.target.value)}
                                                />
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Shift" />
                                                <Select
                                                    className="block"
                                                    value={optionShifts.find(optionShift => optionShift.value === data.shift)}
                                                    options={optionShifts}
                                                    onChange={handleShiftChange}
                                                />
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="flex gap-4 mb-5">
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Drawing Number" />
                                                <Select
                                                    options={optionProducts}
                                                    value={optionProducts.find(optionProduct => optionProduct.value === data.product_id)}
                                                    onChange={handleProductChange}
                                                    className=""
                                                />
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Product Name" />
                                                <TextInput
                                                    className="block w-full bg-gray-100"
                                                    type="text"
                                                    name="product_name"
                                                    disabled={true}
                                                    value={data.product_name}                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4 mb-5">
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Spring Lot No" />
                                                <TextInput
                                                    className="block w-full"
                                                    type="text"
                                                    name="spring_lot"
                                                    value={data.spring_lot}
                                                    onChange={(e) => setData('spring_lot', e.target.value)}
                                                />
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Product Lot No" />
                                                <TextInput
                                                    className="block w-full"
                                                    type="text"
                                                    name="product_lot"
                                                    value={data.product_lot}
                                                    onChange={(e) => setData('product_lot', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4 mb-5">
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Total Lot" />
                                                <TextInput
                                                    className="block w-full"
                                                    type="text"
                                                    name="total_lot"
                                                    value={data.total_lot}
                                                    onChange={(e) => setData('total_lot', e.target.value)}
                                                />
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Qty(pcs)" />
                                                <TextInput
                                                    className="block w-full"
                                                    type="text"
                                                    name="qty"
                                                    value={data.qty}
                                                    onChange={(e) => setData('qty', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <InputLabel value="Remarks" />
                                        <TextInput
                                            className="mb-5 block w-full"
                                            type="text"
                                            name="remarks"
                                            value={data.remarks || ''}
                                            onChange={(e) => setData('remarks', e.target.value)}
                                        />

                                        <div className="flex justify-end gap-4 pt-5">
                                            <Link href={route("admin.achievement.index")} className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-opacity-75 duration-500 ">
                                                    CANCEL
                                            </Link>
                                            <ButtonGreen type="submit">
                                                Update
                                            </ButtonGreen>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </Authenticated>
        </>
    );
}
