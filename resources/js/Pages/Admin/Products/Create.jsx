import PrimaryButton from "@/Components/ButtonGray";
import Calendar from "@/Components/Calendar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";

export default function Create({ customers,products }) {
    const { data, setData, post } = useForm({
        customer_id: "",
        customer_name: "",
        drw_no: "",
        product_name: "",
        target: "",
        product_type: "",
    });
    const [errors, setErrors] = useState({});
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const optionProductType = [
        { value: "Joint Carburator", label: "Joint Carburator" },
        { value: "Oil Level Gauge", label: "Oil Level Gauge" },
        { value: "O-Ring", label: "O-Ring" },
        { value: "Oil Seals", label: "Oil Seals" },
        { value: "Rubber Part", label: "Rubber Part" },
    ];

    const OptionCustomers = customers.map((customer) => ({
        value: customer.id,
        label: customer.customer_code,
    }));

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    };

    const handleChangeOption = (selectedOption) => {
        setData((data) => ({
            ...data,
            product_type: selectedOption.value,
        }));
    };

    const handleChangeCustomer = (selectedOption) => {
        setSelectedCustomer(selectedOption);
        const customer = customers.find((item) => item.id === selectedOption.value);
        setData((data) => ({
            ...data,
            customer_id:selectedOption.value,
            customer_name:customer.customer_name
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        
		if (!data.customer_id) {
            newErrors.customer_id = "Kode customer harus diisi";
            isValid = false;
        }
		if (!data.customer_name) {
            newErrors.customer_name = "Nama customer harus dipilih";
            isValid = false;
        }
        if (!data.drw_no) {
            newErrors.drw_no = "Drawing number harus diisi";
            isValid = false;
        }else {
            const drwExist = products.some(item => item.drw_no === data.drw_no);
            if (drwExist) {
                newErrors.drw_no = 'Drawing number sudah terdaftar';
                isValid = false;
            }
        }
        if (!data.product_name) {
            newErrors.product_name = "Nama produk harus diisi";
            isValid = false;
        }
        if (!data.product_type) {
            newErrors.product_type = "Tipe produk harus diisi";
            isValid = false;
        }
        if (!data.target) {
            newErrors.target = "Target harus diisi";
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
                    post(route('admin.products.store'))
                }
            })
        }
    };

    return (
        <>
            <Head title="Add Product" />
            <Authenticated className="bg-gray-200">
                <Calendar/>
                <div className="flex justify-center items-center">
                    <div className="w-full md:max-w-7xl py-10">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div className="mb-6 font-extrabold">
                                <h1>Add Product</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="w-full">
                                        <div className="mb-5">
                                            <InputLabel value="Customer Code" />
                                            <Select
                                                className="block w-full absolute"
                                                options={OptionCustomers}
                                                onChange={handleChangeCustomer}
                                                value={OptionCustomers.find(OptionCustomer => OptionCustomer.value === data.customer_id)}
                                            />
                                            <InputError message={errors.customer_id}/>
                                        </div>
                                        <div className="mb-5">
											<InputLabel value="Customer Name" />
											<TextInput
												className="w-full block bg-gray-200"
												type="text"
												name="customer_name"
												value={data.customer_name}
												readOnly={true}
											/>
											<InputError message={errors.customer_name}/>
										</div>
                                        <div className="mb-5">
                                            <InputLabel value="Drawing Number" />
                                            <TextInput
                                                className="block w-full"
                                                type="text"
                                                name="drw_no"
                                                value={data.drw_no}
                                                onChange={handleChange}
                                            />
                                            <InputError message={errors.drw_no} />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="mb-5">
                                            <InputLabel value="Product Name" />
                                            <TextInput
                                                className="block w-full"
                                                type="text"
                                                name="product_name"
                                                value={data.product_name}
                                                onChange={handleChange}
                                            />
                                            <InputError message={errors.product_name}/>
                                        </div>
                                        <div className="mb-5">
                                            <InputLabel value="Product Type" />
                                            <Select
                                                className="block w-full absolute"
                                                name="product_type"
                                                options={optionProductType}
                                                value={optionProductType.find(
                                                    (option) =>
                                                        option.value ===
                                                        data.product_type
                                                )}
                                                onChange={handleChangeOption}
                                            />
                                             <InputError
                                                message={errors.product_type}
                                            />
                                        </div>
                                        
                                        <div className="mb-5">
                                            <InputLabel value="Target" />
                                            <TextInput
                                                className="block w-full"
                                                type="number"
                                                name="target"
                                                value={data.target}
                                                onChange={handleChange}
                                            />
                                             <InputError
                                                message={errors.target}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6 gap-3">
									<Link href={route("admin.products.index")} className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-800 uppercase">
										Cancel 
									</Link>
									<PrimaryButton type="submit" className="bg-red-600">
										Add
									</PrimaryButton>
								</div>
                            </form>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}