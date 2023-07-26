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

export default function Edit({ user,users, auth }) {
    const [errors, setErrors] = useState({});
    const { data, setData, post } = useForm({
        id: user.id,
        fullname: user.fullname,
        npk: user.npk,
        group: user.group,
        status: user.status,
        roles: user.roles,
        password: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleChangeOption = (selectedOption) => {
        setData((data) => ({
          ...data,
          roles: selectedOption.value,
        }));
      
        if (selectedOption.value === "User") {
          setData((data) => ({
            ...data,
            password: '',
          }));
          setPasswordDisabled(true);
        } else {
          setPasswordDisabled(false);
        }
    };

    const optionEmployee = [
        { value: "User", label: "User" },
        { value: "Admin", label: "Admin" },
        { value: "Leader", label: "Leader" },
    ];
    const optionStatus = [
        { value: "Tetap", label: "Tetap" },
        { value: "PKWT", label: "PKWT" },
        { value: "Outcourcing", label: "Outcourcing" },
        { value: "Magang", label: "Magang" },
    ];
    const optionGroup = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "NS", label: "NS" },
    ];

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        
        if (!data.roles) {
            newErrors.roles = "Role harus diisi";
            isValid = false;
        }
        if (!data.fullname) {
            newErrors.fullname = "Nama karyawan harus diisi";
            isValid = false;
        }

        if (!data.status) {
            newErrors.status = "Status harus diisi";
            isValid = false;
        }
        if (!data.group) {
            newErrors.group = "Group harus diisi";
            isValid = false;
        }
       
       
        if (!data.npk) {
            newErrors.npk = "NPK harus diisi";
            isValid = false;
        }else {
            const npkExist = users.some(item => item.npk === data.npk && data.npk != user.npk);
            if (npkExist) {
                newErrors.npk = 'NPK sudah terdaftar';
                isValid = false;
            }
        }
        
        setErrors(newErrors);
        return isValid;
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
                    router.post(route("admin.employee.update", user.id), {
                        _method: "PUT",
                        ...data,
                    });
                }
            })
        }
    };


    return (
        <>
            <Head title="Edit Operator" />
            <Authenticated>
                <Calendar/>
                <div className="flex justify-center items-center">
                    <div className="xs:w-full w-3/4 lg:max-w-7xl">
                        <div className="p-4 sm:p-8 bg-white shadow-md sm:rounded-lg">
                            <div className="mb-6 font-extrabold">
                                <h1>Edit Employee</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-center gap-3 md:gap-6">
                                    <div className="w-full">
                                        <div className="w-full mb-5">
                                            <InputLabel value="Role" />
                                            <Select
                                                className="my-1 block w-full absolute"
                                                name="roles"
                                                options={optionEmployee}
                                                value={optionEmployee.find(
                                                    (option) =>
                                                        option.value === data.roles
                                                )}
                                                onChange={handleChangeOption}
                                            />
                                            <InputError message={errors.roles} />
                                        </div>

                                        <div className="w-full mb-5">
                                            <InputLabel value="NPK" />
                                            <TextInput
                                                className="my-1 w-full block"
                                                type="text"
                                                name="npk"
                                                value={data.npk ||''}
                                                onChange={(e) => {
                                                    setData('npk', e.target.value.slice(0, 5));
                                                }}
                                            />
                                            <InputError message={errors.npk} />
                                        </div>

                                        <div className="w-full mb-5">
                                            <InputLabel value="Nama" />
                                            <TextInput
                                                className="my-1 w-full block"
                                                type="text"
                                                name="fullname"
                                                value={data.fullname}
                                                onChange={handleChange}
                                            />
                                            <InputError message={errors.fullname} />
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <div className="w-full mb-5">
                                            <InputLabel value="Status" />
                                            <Select
                                                className="my-1 w-full block"
                                                name="status"
                                                isClearable={true}
                                                defaultValue={''}
                                                options={optionStatus}
                                                value={optionStatus.find(
                                                    (option) =>
                                                    option.value === data.status
                                                    )}
                                                onChange={selectedOption => setData('status', selectedOption ? selectedOption.value : null)}
                                            />
                                            <InputError message={errors.status} />
                                        </div>
                                        <div className="w-full mb-5">
                                            <InputLabel value="Group" />
                                            <Select
                                                className="my-1 w-full block"
                                                name="group"
                                                isClearable={true}
                                                defaultValue={''}
                                                options={optionGroup}
                                                value={optionGroup.find(
                                                    (option) =>
                                                    option.value === data.group
                                                    )}
                                                onChange={selectedOption => setData('group', selectedOption ? selectedOption.value : null)}
                                            />
                                            <InputError message={errors.group} />
                                        </div>                                        

                                    </div>
                                </div>
                                <div className="flex justify-end mt-6 gap-3">
                                    <Link
                                        href={route(
                                            "admin.employee.index"
                                        )}
                                        className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-800"
                                    >
                                        Cancel
                                    </Link>
                                    <PrimaryButton
                                        type="submit"
                                        className="bg-red-600"
                                    >Save
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
