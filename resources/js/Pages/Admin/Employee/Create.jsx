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

export default function Create({ auth,users }) {
    console.log(users)
    const [errors, setErrors] = useState({});
    const [passwordDisabled, setPasswordDisabled] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const { data, setData, post } = useForm({
        fullname: "",
        npk: "",
        group: "",
        status: "",
        password: "",
        roles: "User",
    });

    const optionEmployee = [
        { value: "User", label: "User" },
        { value: "Admin", label: "Admin" },
        { value: "Leader", label: "Leader" },
    ];
    const optionStatus = [
        { value: "Tetap", label: "Tetap" },
        { value: "PKWT", label: "PKWT" },
        { value: "Outsource", label: "Outsource" },
        { value: "Magang", label: "Magang" },
    ];
    const optionGroup = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "NS", label: "NS" },
    ];

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData((data) => ({ ...data, [key]: value }));
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
        if (data.roles !='User' && !data.password) {
            newErrors.password = "Password harus diisi";
            isValid = false;
        }
       
        if (!data.npk) {
            newErrors.npk = "NPK harus diisi";
            isValid = false;
        }else {
            const npkExist = users.some(item => item.npk === data.npk);
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
                    post(route('admin.employee.store'))
                }
            })
        }
    };

    
    return (
        <>
            <Head title="Add Operator" />
            <Authenticated>
                <Calendar/>
                <div className="flex justify-center items-center">
                    <div className="xs:w-full w-3/4 lg:max-w-7xl">
                        <div className="p-4 sm:p-8 bg-white shadow-md sm:rounded-lg">
                            <div className="mb-6 font-extrabold">
                                <h1>Add Employee</h1>
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
                                                    setData('npk', e.target.value);
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
                                       
                                       <div className="w-full mb-5">
                                            <InputLabel value="Password" />
                                            <TextInput
                                                className={`my-1 w-full block ${passwordDisabled && 'bg-gray-100'}`}
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                onChange={handleChange}
                                                disabled={passwordDisabled}
                                            />
                                            <InputError message={errors.password} />
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
                                                disabled={submitting}
                                                className="bg-red-600"
                                            >
                                                {submitting
                                                    ? "Adding..."
                                                    : "Add Operator"}
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
