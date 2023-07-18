import PrimaryButton from "@/Components/ButtonGray";
import Calendar from "@/Components/Calendar";
import FlashMessage from "@/Components/FlashMessage";
import Footer from "@/Components/Footer";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Navbar from "@/Components/Navbar";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react"
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";

export default function AchievementCreate({users,products,flashMessage}) {
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
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
        customer_name: "",
        spring_lot: "",
        product_lot: "",
        total_lot: "",
        qty: "",
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
        label: `${product.drw_no} | ${product.customer.customer_code}`,
    }));

    const handleChangeProduct = (selectedOption) => {
        const product = products.find((item) => item.id === selectedOption?.value);
        setData((data) => ({
          ...data,
          product_id: selectedOption?.value || "",
          product_name: product?.product_name || "",
          product_type: product?.product_type || "",
          customer_name: product?.customer?.customer_name || "",
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
        if (!data.customer_name) {
            newErrors.customer_name = "Cust. name harus diisi";
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
        if (!data.spring_lot) {
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
            customer_name: '',
            spring_lot: '',
            product_lot: '',
            total_lot: '',
            qty: '',
            remarks: '',
          });
          setIsSubmitted(false);
        }
      }, [isSubmitted]);
      

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
            {flashMessage?.message &&(
                <FlashMessage message={flashMessage.message} type={flashMessage.type}/>
            )}
            <div className="w-full min-h-screen flex flex-col bg-gray-200">
                <Navbar />
                <Calendar/>
                <div className="grow">
                    <div className="w-full container flex justify-center mx-auto">
                        <div className="w-full md:w-3/4 bg-white rounded-md shadow-md">
                            <h1 className="font-semibold text-gray-800 text-2xl p-5">Create Achievement</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 pb-5">
                                    <div className="col-span-3 md:col-span-1">
                                        <div className="mb-5">
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
                                    <div className="col-span-3 md:col-span-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                            <div className="w-full">
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
                                            <div className="w-full">
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
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                            <div className="w-full">
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
                                            <div className="w-full">
                                                <InputLabel value="Customer Name" className="after:content-['*'] after:ml-0.5 after:text-red-500"/>
                                                <TextInput
                                                    className="w-full block bg-gray-200 my-1"
                                                    type="text"
                                                    name="customer_name"
                                                    value={data.customer_name || ''}
                                                    readOnly={true}
                                                />
                                                <InputError message={errors.customer_name}/>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                            <div className="w-full">
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
                                            <div className="w-full">
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
                                        </div>
                                        <div className="w-full">
                                            <InputLabel value="Remarks" />
                                            <textarea
                                                className="w-full block my-1 border-gray-300"
                                                type="number"
                                                name="remarks"
                                                value={data.remarks}
                                                onChange={(e) => setData('remarks', e.target.value)}
                                            ></textarea>
                                            <InputError message={errors.remarks}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full justify-end bg-gray-200 p-5">
                                    <PrimaryButton className="bg-red-600 px-6 py-3">Save</PrimaryButton>
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