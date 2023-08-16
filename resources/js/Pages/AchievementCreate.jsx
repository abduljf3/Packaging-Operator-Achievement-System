import PrimaryButton from "@/Components/ButtonGray";
import Calendar from "@/Components/Calendar";
import FlashMessage from "@/Components/FlashMessage";
import Footer from "@/Components/Footer";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Navbar from "@/Components/Navbar";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react"
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";

export default function AchievementCreate({users,products,parcels,flashMessage}) {
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isDisabledTarget, setIsDisabledTarget] = useState(true);
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const getCurrentShift = () => {
        const currentHour = new Date().getHours();
      
        if (currentHour >= 6 && currentHour < 14) {
          return "1";
        } else if (currentHour >= 14 && currentHour < 22) {
          return "2";
        } else {
          return "3";
        }
      };
    const { data, setData, post } = useForm({
        user_id:'',
        fullname:'',
        group:'',
        shift: getCurrentShift(),
        date: currentDate,
        product_id: "",
        product_name: "",
        product_type: "",
        target_id:"",
        target:"",
        spring_lot: "",
        product_lot: "",
        total_lot: "",
        qty: "",
        start: "",
        finish: "",
        remarks: "",
    });

    const OptionUsers = users.map((user) => ({
        value: user.id,
        label: user.npk,
    }));

    const handleChangeUser = (selectedOption) => {
        const user = users.find((item) => item.id === selectedOption?.value);
        setData((data) => ({
          ...data,
          user_id: selectedOption?.value ||'',
          fullname: user?.fullname || '',
          group: user?.group || '',
        }));
    };      

    const optionShifts = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
    ];

    const OptionProducts = products.map((product) => ({
        value: product.id,
        label:product.drw_no,
    }));

    const filteredParcels = data.product_id
    ? parcels.filter((target) => target.product_id === data.product_id)
    : parcels;

    const optionParcels = filteredParcels.map((target) => ({
        value: target.id,
        label: target.parcel.quantity.toLocaleString(),
        target: target.quantity || 0,
    }));

    const optionRemarks = [
        { value: "Meeting", label: "Meeting" },
        { value: "5S", label: "5S" },
        { value: "Repacking", label: "Repacking" },
        { value: "Proses Pecahan", label: "Proses Pecahan" },
        { value: "Serah Terima Box ke Gudang", label: "Serah Terima Box ke Gudang" },
        { value: "Others", label: "Others" },
    ];


    const handleChangeProduct = (selectedOption) => {
        if(selectedOption){
            const product = products.find((item) => item.id === selectedOption?.value);
            setData((data) => ({
                ...data,
                product_id: selectedOption?.value || "",
                product_name: product?.product_name || "",
                product_type: product?.product_type || "",
            }));
            setIsDisabledTarget(false)
        }else{
            setData((data) => ({
                ...data,
                product_id: "",
                product_name: "",
                product_type: "",
                target_id:'',
            }));
            setIsDisabledTarget(true)
        }
    };

    const handleChangeParcel = (selectedOption) => {
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

    useEffect(() => {
        if (isSubmitted) {
          setData({
            user_id: '',
            fullname: '',
            group: '',
            shift: getCurrentShift(),
            date: currentDate,
            product_id: '',
            product_name: '',
            product_type: '',
            target_id:"",
            target:"",
            spring_lot: '',
            product_lot: '',
            total_lot: '',
            qty: '',
            start: "",
            finish: "",
            remarks: '',
          });
          setIsSubmitted(false);
        }
      }, [isSubmitted]);
    
    const handleClear = () => {
        setIsSubmitted(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()){
            Swal.fire({
                text: 'Simpan?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsSubmitted(true);
                    post(route('achievement.store'));
                  }
            })
        }
    };


    return (
        <>
        <Head title="Create Achievement" />
            <Head>
                <link rel="icon" href="/logo.png" type="image/x-icon"/>
            </Head>
            {flashMessage?.message &&(
                <FlashMessage message={flashMessage.message} type={flashMessage.type}/>
            )}
            <div className="w-full min-h-screen flex flex-col bg-gray-100">
                <Navbar />
                <Calendar/>
                <div className="grow">
                    <div className="w-full container flex justify-center mx-auto">
                        <div className="w-full bg-white rounded-md shadow-md">
                            <h1 className="font-semibold text-gray-800 text-2xl p-5">Create New Achievement</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 pb-5">
                                    <div className="">
                                        <div className="w-full mb-5">
                                            <InputLabel value="NPK" className="after:content-['*'] after:ml-0.5 after:text-red-500 "/>
                                            <Select
                                                className="block w-full my-1"
                                                options={OptionUsers}
                                                onChange={handleChangeUser}
                                                isClearable={true}
                                                value={OptionUsers.find((optionUser) => optionUser.value === data.user_id) || null}
                                            />
                                            <InputError message={errors.user_id}/>
                                        </div>
                                        
                                        <div className="w-full mb-5">
                                            <InputLabel value="Operator Name" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <TextInput
                                                className="w-full block bg-gray-200 my-1"
                                                type="text"
                                                name="fullname"
                                                value={data.fullname}
                                                readOnly={true}
                                            />
                                            <InputError message={errors.fullname}/>
                                        </div>
                                        <div className="w-full mb-5">
                                            <InputLabel value="Group" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <TextInput
                                                className="w-full block bg-gray-200 my-1"
                                                type="text"
                                                name="group"
                                                value={data.group}
                                                readOnly={true}
                                            />
                                            <InputError message={errors.group}/>
                                        </div>
                                        
                                        <div className="w-full mb-5">
                                            <InputLabel value="Date" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <TextInput
                                                className="w-full block bg-gray-200 my-1"
                                                type="date"
                                                name="date"
                                                value={data.date}
                                                disabled={true}
                                                // onChange= {(e) => setData('date', e.target.value)}
                                            />
                                            <InputError message={errors.date}/>
                                        </div>
                                        <div className="w-full mb-5">
                                            <InputLabel value="Shift" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <Select
                                                className="block w-full my-1"
                                                options={optionShifts}
                                                onChange={(selectedOption) => setData('shift', selectedOption ? selectedOption.value : null)}
                                                defaultValue={optionShifts.find(optionShift => optionShift.value === data.shift)}
                                            />
                                            <InputError message={errors.shift}/>
                                        </div>
                                        
                                    </div>
                                    <div className="">
                                        <div className="w-full mb-5">
                                            <InputLabel value="Drawing No." className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <Select
                                                className="block w-full my-1"
                                                options={OptionProducts}
                                                onChange={handleChangeProduct}
                                                isClearable={true}
                                                value={OptionProducts.find(OptionProduct => OptionProduct.value === data.product_id) || null}
                                            />
                                            <InputError message={errors.product_id}/>
                                        </div>
                                        <div className="w-full mb-5">
                                            <InputLabel value="Product Type" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <TextInput
                                                className="w-full block bg-gray-200 my-1"
                                                type="text"
                                                name="product_type"
                                                value={data.product_type || ''}
                                                readOnly={true}
                                            />
                                            <InputError message={errors.product_type}/>
                                        </div>
                                        <div className="w-full mb-5">
                                            <InputLabel value="Product Name" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <TextInput
                                                className="w-full block bg-gray-200 my-1"
                                                type="text"
                                                name="product_name"
                                                value={data.product_name}
                                                readOnly={true}
                                            />
                                            <InputError message={errors.product_name}/>
                                        </div>
                                       
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                            <div className="w-full">
                                                <InputLabel value="Waktu Mulai" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                                <TextInput
                                                    className="w-full block my-1"
                                                    type="time"
                                                    name="start"
                                                    value={data.start || ''}
                                                    onChange ={(e) => setData('start',e.target.value)}
                                                />
                                                <InputError message={errors.start}/>
                                            </div>
                                            <div className="w-full">
                                                <InputLabel value="Waktu Selesai" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                                <TextInput
                                                    className="w-full block my-1"
                                                    type="time"
                                                    name="finish"
                                                    value={data.finish || ''}
                                                    onChange ={(e) => setData('finish',e.target.value)}
                                                />
                                                <InputError message={errors.finish}/>
                                            </div>
                                        </div>
                                        <div className="w-full mb-5">
                                            <InputLabel value="Qty / Parcel" className="after:content-['*'] after:ml-0.5 after:text-red-500 "/>
                                            <Select
                                                className="block w-full my-1"
                                                options={optionParcels}
                                                onChange={handleChangeParcel}
                                                isClearable={true}
                                                value={optionParcels.find((optionParcel) => optionParcel.value === data.target_id) || null}
                                                isDisabled={isDisabledTarget}
                                            />
                                            <InputError message={errors.target_id}/>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="grid grid-cols-2 gap-3 mb-5">
                                            <div className="w-full">
                                                <InputLabel value="Spring Lot" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                                <TextInput
                                                    className="w-full block my-1"
                                                    type="text"
                                                    name="spring_lot"
                                                    value={data.spring_lot}
                                                    onChange={(e) => setData('spring_lot', e.target.value)}
                                                />
                                                <InputError message={errors.spring_lot}/>
                                            </div>
                                            <div className="w-full">
                                                <InputLabel value="Product Lot" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                                <TextInput
                                                    className="w-full block my-1"
                                                    type="text"
                                                    name="product_lot"
                                                    value={data.product_lot}
                                                    onChange={(e) => setData('product_lot', e.target.value)}
                                                />
                                                <InputError message={errors.product_lot}/>
                                            </div>
                                        </div>
                                        <div className="w-full mb-5">
                                            <InputLabel value="Total Lot" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <TextInput
                                                className="w-full block my-1"
                                                type="number"
                                                name="total_lot"
                                                value={data.total_lot}
                                                onChange={(e) => setData('total_lot', e.target.value)}
                                            />
                                            <InputError message={errors.total_lot}/>
                                        </div>
                                        <div className="w-full mb-5">
                                            <InputLabel value="Quantity" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                            <TextInput
                                                className="w-full block my-1"
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

                                <div className="flex w-full justify-end gap-3 bg-gray-200 p-5">
                                    <div onClick={handleClear} className="rounded-md cursor-pointer px-5 py-2 text-center bg-gray-500 text-white hover:bg-gray-600">Clear</div>
                                    <PrimaryButton type="submit" className="bg-red-600 px-6 py-3">Save</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}