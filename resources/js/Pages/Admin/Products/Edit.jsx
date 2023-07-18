import PrimaryButton from "@/Components/ButtonGray";
import Calendar from "@/Components/Calendar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";

export default function Edit({ product, customers,products, auth }) {
    const [errors, setErrors] = useState({});
    const { data, setData } = useForm({
        customer_id: product.customer_id,
        customer_name: product.customer.customer_name,
        drw_no: product.drw_no,
        product_name: product.product_name,
        target: product.target,
        product_type: product.product_type,
    });
    const [selectedCustomer, setSelectedCustomer] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

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

    const handleChangeCustomer = (selectedOption) => {
        setSelectedCustomer(selectedOption);
        const customer = customers.find((item) => item.id === selectedOption.value);
        setData((prevState) => ({
            ...prevState,
            customer_id: selectedOption.value,
            customer_name: customer.customer_name,
        }));
    };

    const handleChangeOption = (selectedOption) => {
        setData((data) => ({
            ...data,
            product_type: selectedOption.value,
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        
        if (!data.customer_id) {
            newErrors.customer_id = "Kode customer harus dipilih";
            isValid = false;
        }
		if (!data.customer_name) {
            newErrors.customer_name = "Nama customer harus diisi";
            isValid = false;
        }
        if (!data.drw_no) {
            newErrors.drw_no = "Drawing number harus diisi";
            isValid = false;
        }else {
            const drwExist = products.some(item => item.drw_no === data.drw_no && data.drw_no != product.drw_no);
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
                   router.post(route('admin.products.update',product.id),{
                        _method: 'PUT',
                        ...data,
                   })
                }
            })
        }
    };

    return (
        <>
            <Head title="Edit Product" />
            <Authenticated className="bg-gray-200">
                <Calendar/>
                <div className="py-20 mx-20">
                    <div className="mmax-w-7xl mx-20 sm:px-6 lg:px-8 space-y-6">
                        <div className="p-8 mx-20  bg-white shadow sm:rounded-lg">
                        <div className="mb-5 font-extrabold ">
                                <h1>Update Product</h1>
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
									<Link href={route("admin.products.index")} className="px-6 text-xs font-semibold py-2 bg-gray-600 text-white rounded hover:bg-gray-800 uppercase">
										Cancel 
									</Link>
									<PrimaryButton type="submit" className="bg-red-600">
										Update
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
