import PrimaryButton from "@/Components/ButtonGray";
import Calendar from "@/Components/Calendar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Create({ customers,customer }) {
    const [errors, setErrors] = useState({});
    const { data, setData,put } = useForm({
        customer_code: customer.customer_code,
        customer_name: customer.customer_name,
    });

    const [submitting, setSubmitting] = useState(false);
    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        if (!data.customer_code) {
            newErrors.customer_code = "Kode customer harus diisi";
            isValid = false;
        }else {
            const customerCode = data.customer_code.trim();
            const codeExists = customers.some(item => item.customer_code === customerCode  && item.customer_code !== customer.customer_code);
            if (codeExists) {
                newErrors.customer_code = 'Kode customer sudah terdaftar';
                isValid = false;
            }
        }
        if (!data.customer_name) {
            newErrors.customer_name = "Nama customer harus diisi";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            Swal.fire({
                text: 'Simpan?',
                icon: 'question',
                showCancelButton:true,
                confirmButtonText: 'Save',
            }).then((result) => {
                if (result.isConfirmed) {
                    put(route('admin.customers.update',customer.id),{
                        _method: 'PUT',
                        ...data,
                    });    
                }
            });        
        }   
    };

    return (
        <>
            <Head title="Add Customer" />
            <Authenticated>
                <Calendar/>
                <div className="container mx-auto py-20">
                    <div className="flex justify-center">
                        <div className="w-full md:w-1/2 bg-white shadow sm:rounded-lg p-3 md:p-5">
                            <div className="font-semibold text-xl">
                                <h1>Edit Customer : {customer.customer_name}</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-center gap-20">
                                    <div className="mt-5 w-full">
                                        <div className="block mb-5">
                                            <InputLabel value="Customer Code" className="mb-1"/>
                                            <TextInput
                                                className="block mb-1 w-full"
                                                type="text"
                                                name="customer_code"
                                                value={data.customer_code}
                                                onChange={handleChange}
                                                placeholder="customer Code"
                                            />
                                            <InputError message={errors.customer_code}/>
                                        </div>
                                        <div className="block mb-5">
                                            <InputLabel value="Customer Name" className="mb-1"/>
                                            <TextInput
                                                className="block mb-1 w-full"
                                                type="text"
                                                name="customer_name"
                                                value={data.customer_name}
                                                onChange={handleChange}
                                                placeholder="Customer Name"
                                            />
                                            <InputError message={errors.customer_name}/>
                                        </div>
                                    
                                        <div className="flex justify-end gap-3">
                                            <Link href={route("admin.customers.index")} className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-opacity-75 duration-500 ">
                                                    CANCEL
                                            </Link>

                                            <PrimaryButton
                                                type="submit"
                                                disabled={submitting}
                                                className="bg-red-600"
                                            >
                                                {submitting
                                                    ? "SAVING..."
                                                    : "SAVE"}
                                            </PrimaryButton>
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
