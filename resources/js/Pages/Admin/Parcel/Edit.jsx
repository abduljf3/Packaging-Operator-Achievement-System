import PrimaryButton from "@/Components/ButtonGray";
import Calendar from "@/Components/Calendar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Edit({ parcels,parcel }) {
    const [errors, setErrors] = useState({});
    const { data, setData, post } = useForm({
        quantity: parcel.quantity,
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
        if (!data.quantity) {
            newErrors.quantity = "Quantity harus diisi";
            isValid = false;
        }else {
            const qtyExists = parcels.some((parcel) => parcel.quantity.toString() === data.quantity);
            if (qtyExists) {
                newErrors.quantity = 'Quantity sudah terdaftar';
                isValid = false;
            }
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
                    router.post(route("admin.parcel.update", parcel.id), {
                        _method: "PUT",
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
                                <h1>Edit Quantity Parcel : {parcel.quantity.toLocaleString()}</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-center gap-20">
                                    <div className="mt-5 w-full">
                                        <div className="block mb-5">
                                            <InputLabel value="Quantity (Pcs)" className="mb-1"/>
                                            <TextInput
                                                className="block mb-1 w-full"
                                                type="number"
                                                name="quantity"
                                                value={data.quantity}
                                                onChange={handleChange}
                                                placeholder="Quantity (Pcs)"
                                                isFocused={true}
                                            />
                                            <InputError message={errors.quantity}/>
                                        </div>
                                    
                                        <div className="flex justify-end gap-3">
                                            <Link href={route("admin.parcel.index")} className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-opacity-75 duration-500 ">
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
