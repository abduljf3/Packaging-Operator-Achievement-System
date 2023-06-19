import React from "react";
import ButtonGreen from "@/Components/ButtonGreen";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import Swal from "sweetalert2";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const [passwordDisabled, setPasswordDisabled] = useState('false');
    const { data, setData, post, errors } = useForm({
        fullname: "",
        npk: "",
        group: "",
        status: "",
        password: "",
        roles: "",
    });

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData((data) => ({ ...data, [key]: value }));
    };

    const roleChange =(e) => {
        setData({
            ...data,
            roles : e.target.value
        });
        if(data.roles === 'User'){
            setPasswordDisabled(true)
        }else{
            setPasswordDisabled(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            data.fullname == "" ||
            data.npk == "" ||
            data.group == "" ||
            data.status == "" ||
            data.password == "" ||
            data.roles == ""
        ) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Isi semua kolom terlebih dahulu!",
                showConfirmButton: false,
                timer: 2000,
            });
        } else {
            setSubmitting(true);
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Data berhasil ditambahkan!",
                showConfirmButton: false,
            });
            await post("/admin/employee", {
                data,
                preserveScroll: true,
            });
            setSubmitting(false);
        }
    };

    return (
        <>
            <Head title="Add Operator" />
            <Authenticated className="bg-white">
                <div className="py-5 mx-20">
                    <div className="mmax-w-7xl mx-20 sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 mx-20 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div className="mb-6 font-extrabold">
                                <h1>Create Operator</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-center gap-3 md:gap-6">
                                    <div className="w-full md:w-1/2">
                                    <InputLabel value="Roles" />
                                        <InputError message={errors.npk} />
                                        <select onChange={roleChange}>
                                            <option>Pilih</option>
                                            <option value='User'>User</option>
                                            <option>Admin</option>
                                            <option>Leader</option>
                                        </select>
                                        <InputLabel value="NPK" />
                                        <InputError message={errors.npk} />
                                        <TextInput
                                            className="mb-5 w-full block"
                                            type="text"
                                            name="npk"
                                            value={data.npk}
                                            onChange={handleChange}
                                        />

                                        <InputLabel value="Nama" />
                                        <InputError message={errors.fullname} />
                                        <TextInput
                                            className="mb-5 w-full block"
                                            type="text"
                                            name="fullname"
                                            value={data.fullname}
                                            onChange={handleChange}
                                        />

                                        <InputLabel value="Group" />
                                        <InputError message={errors.group} />
                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="group"
                                            value={data.group}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <InputLabel value="Status" />
                                        <InputError message={errors.status} />
                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="status"
                                            value={data.status}
                                            onChange={handleChange}
                                        />

                                        <InputLabel value="Password" />
                                        <InputError message={errors.password} />
                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            onChange={handleChange}
                                            disabled={!passwordDisabled}
                                        />

                                        <InputLabel value="Roles" />
                                        <InputError message={errors.roles} />
                                        <TextInput
                                            className="mb-5 block w-full "
                                            type="text"
                                            name="roles"
                                            value={data.roles}
                                            onChange={handleChange}
                                        />
                                        <div className="flex justify-center mt-6 gap-3">
                                            <Link href={route('admin.employee.index')} className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-800">Cancel</Link>
                                            <ButtonGreen
                                                type="submit"
                                                disabled={submitting}
                                                className=""
                                            >
                                                {submitting
                                                    ? "Adding..."
                                                    : "Add Operator"}
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