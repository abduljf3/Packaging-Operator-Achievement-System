import PrimaryButton from "@/Components/ButtonGray";
import ButtonRed from "@/Components/ButtonRed";
import Calendar from "@/Components/Calendar";
import FlashMessage from "@/Components/FlashMessage";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import LeaderLayout from "@/Layouts/LeaderLayout";
import { Transition } from "@headlessui/react";
import { router, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";

export default function index({ user,users,flashMessage }) {
    const [profileErrors, setProfileErrors] = useState({});
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const {data,setData,reset,recentlySuccessful,processing,errors,put,post} = useForm({
        fullname: user.fullname,
        npk: user.npk,
        status: user.status,
        group: user.group,
        current_password: "",
        password: "",
        password_confirmation: "",
    })

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

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        
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
            const npkExist = users.some(item => item.npk === data.npk && item.npk != user.npk);
            if (npkExist) {
                newErrors.npk = 'NPK sudah terdaftar';
                isValid = false;
            }
        }
        
        setProfileErrors(newErrors);
        return isValid;
    };

    const handleSubmitProfile = async (e) => {
        e.preventDefault();
        if (validateForm()){
            Swal.fire({
                text: 'Simpan data profile?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then((result) => {
                if (result.isConfirmed) {
                    router.post(route("leader.profile.update", user.id), {
                        _method: "PUT",
                        ...data,
                    });
                }
            })
        }
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        Swal.fire({
            text: 'Update data password?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                put(route("password.update"), {
                    preserveScroll: true,
                    onSuccess: () => reset(),
                    onError: () => {
                        if (errors.password) {
                            reset("password", "password_confirmation");
                            passwordInput.current.focus();
                        }
        
                        if (errors.current_password) {
                            reset("current_password");
                            currentPasswordInput.current.focus();
                        }
                    },
                });
            }
        })
        
        
    };
    
    return (
        <>
            <LeaderLayout className="bg-gray-200">
                {flashMessage?.message &&(
                    <FlashMessage message={flashMessage.message} type={flashMessage.type}/>
                )}
                <Calendar/>
                <div className="container mx-auto w-full flex gap-6 px-3 md:px-0">
                    <form onSubmit={handleSubmitProfile} className="w-full h-fit md:w-3/5 bg-white rounded-md shadow p-5">
                        <h1 className="font-semibold text-gray-800 mb-6 text-xl">Update Profile</h1>
                        <div className="flex gap-5 mb-5">
                            <div className="w-full md:w-1/2">
                                <InputLabel value="NPK" />
                                <TextInput
                                    className="w-full block my-1"
                                    type="text"
                                    placeholder="NPK"
                                    name="npk"
                                    value={data.npk}
                                    onChange={(e) => setData('npk', e.target.value)}
                                />
                                <InputError message={profileErrors.npk}/>
                            </div>

                            <div className="w-full md:w-1/2">
                                <InputLabel value="Nama Lengkap" />
                                <TextInput
                                    className="w-full block my-1"
                                    type="text"
                                    placeholder="Nama Lengkap"
                                    name="fullname"
                                    value={data.fullname}
                                    onChange={(e) => setData('fullname', e.target.value)}
                                />
                                <InputError message={profileErrors.fullname}/>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div className="">
                                <InputLabel value="Status" />
                                <Select
                                    className="my-1 w-full block"
                                    name="status"
                                    isClearable={true}
                                    defaultValue={''}
                                    options={optionStatus}
                                    value={optionStatus.find((option) =>option.value === data.status)}
                                    onChange={selectedOption => setData('status', selectedOption ? selectedOption.value : null)}
                                />
                                <InputError message={profileErrors.status} />
                            </div>

                            <div className="">
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
                                <InputError message={profileErrors.group} />
                            </div>
                        </div>

                        <div className="flex w-full justify-end gap-5">
                            <PrimaryButton type="submit" className="bg-red-600">Save</PrimaryButton>
                        </div>
                       
                    </form>

                    <form onSubmit={handleSubmitPassword} className="w-full md:w-2/5 bg-white rounded-md shadow p-5">
                        <h1 className="font-semibold text-gray-800 mb-6 text-xl">Update Password</h1>
                            <div className="w-full mb-5">
                                <InputLabel value="Password Lama" />
                                <TextInput
                                    id="current_password"
                                    className="w-full block my-1"
                                    type="password"
                                    ref={currentPasswordInput}
                                    value={data.current_password}
                                    placeholder="Password lama"
                                    name="Password lama"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('current_password', e.target.value)}
                                />
                                <InputError message={errors.current_password}/>
                            </div>

                            <div className="w-full mb-5">
                                <InputLabel value="Password Baru" />
                                <TextInput
                                    id="password"
                                    className="w-full block my-1"
                                    type="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    placeholder="Password baru"
                                    name="password"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password}/>
                            </div>

                            <div className="w-full mb-5">
                                <InputLabel value="Ulangi Password Baru" />
                                <TextInput
                                    id="password_confirmation"
                                    className="w-full block my-1"
                                    type="password"
                                    value={data.password_confirmation}
                                    placeholder="Ulangi password baru"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <InputError message={errors.password_confirmation}/>
                            </div>
                            <div className="flex items-center justify-end">
                                <ButtonRed disabled={processing}>Save</ButtonRed>

                                <Transition
                                    show={recentlySuccessful}
                                    enterFrom="opacity-0"
                                    leaveTo="opacity-0"
                                    className="transition ease-in-out"
                                >
                                    <p className="text-sm text-gray-600">Saved.</p>
                                </Transition>
                            </div>
                       
                    </form>
                </div>
            </LeaderLayout>
        </>
    );
}
