import ButtonGreen from "@/Components/ButtonGreen";
import ButtonRed from "@/Components/ButtonRed";
import Calendar from "@/Components/Calendar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";

export default function Edit({ users, achievement, products, auth,parcels }) {
    const [errors, setErrors] = useState({});
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
        product_type: achievement.product.product_type,
            spring_lot: achievement.spring_lot,
            product_lot: achievement.product_lot,
            total_lot: achievement.total_lot,
            qty: achievement.qty,
            start: achievement.start,
            finish: achievement.finish,
            remarks: achievement.remarks,
            target_id: achievement.target_id,
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
        const user = users.find((item) => item.id === selectedOption?.value);
        setData((data) => ({
          ...data,
          user_id: selectedOption?.value ||'',
          fullname: user?.fullname || '',
          group: user?.group || '',
        }));
    };    

    const handleProductChange = (selectedOption) => {
        if(selectedOption){
            const product = products.find((item) => item.id === selectedOption?.value);
            setData((data) => ({
                ...data,
                product_id: selectedOption?.value || "",
                product_name: product?.product_name || "",
                product_type: product?.product_type || "",
            }));
            // setIsDisabledTarget(false)
        }else{
            setData((data) => ({
                ...data,
                product_id: "",
                product_name: "",
                product_type: "",
                target_id:'',
            }));
            // setIsDisabledTarget(true)
        }
    };

    const optionShifts = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
    ];

    const optionRemarks = [
        { value: "Meeting", label: "Meeting" },
        { value: "5S", label: "5S" },
        { value: "Repacking", label: "Repacking" },
        { value: "Proses Pecahan", label: "Proses Pecahan" },
        { value: "Serah Terima Box ke Gudang", label: "Serah Terima Box ke Gudang" },
        { value: "Others", label: "Others" },
    ];

    const filteredParcels = data.product_id
    ? parcels.filter((target) => target.product_id === data.product_id)
    : parcels;

    const optionParcels = filteredParcels.map((target) => ({
        value: target.id,
        label: target.parcel.quantity.toLocaleString(),
        target: target.quantity || 0,
    }));

    const handleShiftChange = (selectedOption) => {
        setData((data) => ({
            ...data,
            shift: selectedOption.value,
        }));
    };

    const handleParcelChange = (selectedOption) => {
        setData((data) => ({
          ...data,
          target_id: selectedOption?.value || "",
          target: selectedOption?.target || "",
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        
        if (!data.user_id) {
            newErrors.user_id = "NPK harus dipilih";
            isValid = false;
        }
        if (!data.fullname) {
            newErrors.fullname = "Nama operator harus diisi";
            isValid = false;
        }
        if (!data.group) {
            newErrors.group = "Group harus diisi";
            isValid = false;
        }
        if (!data.product_name) {
            newErrors.product_name = "Product name harus diisi";
            isValid = false;
        }
        if (!data.product_type) {
            newErrors.product_type = "Product type harus diisi";
            isValid = false;
        }
        if (!data.date) {
            newErrors.date = "Tanggal harus diisi";
            isValid = false;
        }
        if (!data.target_id) {
            newErrors.target_id = "Qty / parcel harus dipilih";
            isValid = false;
        }
        if (!data.product_id) {
            newErrors.product_id = "Drawing No. harus dipilih";
            isValid = false;
        }
        if (!data.target_id) {
            newErrors.target_id = "Qty / parcel harus dipilih";
            isValid = false;
        }
        if (!data.product_id || (!data.spring_lot && data.product_type === 'Oil Seals')) {
            newErrors.spring_lot = "Spring lot harus diisi";
            isValid = false;
        }
        if (!data.product_lot) {
            newErrors.product_lot = "Product lot harus diisi";
            isValid = false;
        }
        if (!data.total_lot) {
            newErrors.total_lot = "Total lot harus diisi";
            isValid = false;
        }
        if (!data.qty) {
            newErrors.qty = "Quantity harus diisi";
            isValid = false;
        }
        if (!data.start) {
            newErrors.start = "Waktu mulai harus diisi";
            isValid = false;
        }
        if (!data.finish) {
            newErrors.finish = "Waktu selesai harus diisi";
            isValid = false;
        }
        if (!data.remarks) {
            newErrors.remarks = "Remarks harus dipilih";
            isValid = false;
        }
            
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()){
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
        }
        
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
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div className="w-full">
                                        <div className="mb-5">
                                            <InputLabel value="NPK" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <Select
                                                onChange={handleUserChange}
                                                options={optionUsers}
                                                value={optionUsers.find(optionUser => optionUser.value === data.user_id)}
                                                className="bg-gray-100"
                                                isClearable={true}
                                            />
                                            <InputError message={errors.user_id}/>
                                        </div>

                                        <div className="mb-5">
                                            <InputLabel value="Name" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <TextInput
                                                className="block bg-gray-100 w-full"
                                                type="text"
                                                id="fullname"
                                                name="fullname"
                                                value={data.fullname}
                                                readOnly
                                                disabled={true}
                                            />
                                            <InputError message={errors.fullname}/>
                                        </div>
                                        <div className="mb-5">
                                            <InputLabel value="Group" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <TextInput
                                                className="block bg-gray-100 w-full"
                                                type="text"
                                                name="group"
                                                value={data.group}
                                                disabled={true}
                                            />
                                            <InputError message={errors.group}/>
                                        </div>
                                        
                                        <div className="flex gap-3 mb-5">
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Date" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                                <TextInput
                                                    type="date"
                                                    className="block w-full"
                                                    value={data.date}
                                                    onChange={(e) => setData('date', e.target.value)}
                                                />
                                                <InputError message={errors.date}/>
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Shift" />
                                                <Select
                                                    className="block"
                                                    value={optionShifts.find(optionShift => optionShift.value === data.shift)}
                                                    options={optionShifts}
                                                    onChange={handleShiftChange}
                                                />
                                                <InputError message={errors.shift}/>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="w-full mb-5">
                                            <InputLabel value="Drawing Number" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <Select
                                                options={optionProducts}
                                                value={optionProducts.find(optionProduct => optionProduct.value === data.product_id)}
                                                onChange={handleProductChange}
                                                
                                            />
                                             <InputError message={errors.product_id}/>
                                        </div>
                                        <div className="flex gap-3 mb-5">
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Product Name" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                                <TextInput
                                                    className="block w-full bg-gray-100"
                                                    type="text"
                                                    name="product_name"
                                                    disabled={true}
                                                    value={data.product_name}                                               
                                                />
                                                <InputError message={errors.product_name}/>
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Product Type" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                                <TextInput
                                                    className="block w-full bg-gray-100"
                                                    type="text"
                                                    name="product_type"
                                                    disabled={true}
                                                    value={data.product_type}                                                
                                                />
                                                <InputError message={errors.product_type}/>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 mb-5">
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Waktu Mulai" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                                <TextInput
                                                    type="time"
                                                    className="block w-full"
                                                    value={data.start}
                                                    onChange={(e) => setData('start', e.target.value)}
                                                />
                                                <InputError message={errors.start}/>
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Waktu Selesai" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                                <TextInput
                                                    type="time"
                                                    className="block w-full"
                                                    value={data.finish}
                                                    onChange={(e) => setData('finish', e.target.value)}
                                                />
                                                <InputError message={errors.finish}/>
                                            </div>
                                            
                                        </div>
                                        <div className="w-full mb-5">
                                            <InputLabel value="Qty / Parcel" className="after:content-['*'] after:ml-0.5 after:text-red-500 "/>
                                            <Select
                                                className="block w-full my-1"
                                                options={optionParcels}
                                                onChange={handleParcelChange}
                                                isClearable={true}
                                                value={optionParcels.find((optionParcel) => optionParcel.value === data.target_id) || null}
                                            />
                                            <InputError message={errors.target_id}/>
                                        </div>
                                        
                                    </div>
                                    <div className="w-full">
                                        <div className="w-full mb-4">
                                            <InputLabel value="Spring Lot No" />
                                            <TextInput
                                                className="block w-full"
                                                type="text"
                                                name="spring_lot"
                                                value={data.spring_lot}
                                                onChange={(e) => setData('spring_lot', e.target.value)}
                                            />
                                            <InputError message={errors.spring_lot}/>
                                        </div>
                                        <div className="flex gap-5 mb-5">
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Product Lot No" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                                <TextInput
                                                    className="block w-full"
                                                    type="text"
                                                    name="product_lot"
                                                    value={data.product_lot}
                                                    onChange={(e) => setData('product_lot', e.target.value)}
                                                />
                                                <InputError message={errors.product_lot}/>
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <InputLabel value="Total Lot" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                                <TextInput
                                                    className="block w-full"
                                                    type="text"
                                                    name="total_lot"
                                                    value={data.total_lot}
                                                    onChange={(e) => setData('total_lot', e.target.value)}
                                                />
                                                <InputError message={errors.total_lot}/>
                                            </div>
                                        </div>
                                        <div className="w-full mb-5">
                                            <InputLabel value="Quantity (Pcs)" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <TextInput
                                                className="block w-full"
                                                type="number"
                                                name="qty"
                                                value={data.qty}
                                                onChange={(e) => setData('qty', e.target.value)}
                                            />
                                            <InputError message={errors.qty}/>
                                        </div>
                                        <div className="w-full mb-5">
                                            <InputLabel value="Remarks" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <Select
                                                className="block w-full my-1"
                                                options={optionRemarks}
                                                isClearable={true}
                                                onChange={(selectedOption) => setData('remarks', selectedOption ? selectedOption.value : null)}
                                                placeholder="Pilih Remarks"
                                                defaultValue={optionRemarks.find(optionRemark => optionRemark.value === data.remarks)}
                                            />
                                            <InputError message={errors.remarks}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 pt-5 w-full">
                                    <Link href={route("admin.achievement.index")} className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-opacity-75 duration-500 ">
                                            CANCEL
                                    </Link>
                                    <ButtonRed type="submit">
                                        Update
                                    </ButtonRed>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </Authenticated>
        </>
    );
}
