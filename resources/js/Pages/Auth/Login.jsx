import ApplicationLogo from "@/Components/ApplicationLogo";
import ButtonRed from "@/Components/ButtonRed";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Login({ status, canResetPassword }) {
    const [formErrors, setFormErrors] = useState({});
    const { data, setData, post, processing, errors, reset } = useForm({
        npk: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        
        if (!/^(?:\d{4}|K\d{4})$/.test(data.npk)) {
            newErrors.npk = "NPK harus terdiri dari 4 digit angka atau 5 digit dengan huruf 'K' di depan";
            isValid = false;
        }
        setFormErrors(newErrors);
        return isValid;
    };

    const submit = (e) => {
        e.preventDefault();
        if(validateForm()){
            post(route("login"));
        }
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            
            <Link href={route('dashboard')} className="flex items-center gap-2 mb-5">
                <ApplicationLogo className=""/>
                <div className="md:flex flex-col font-bold text-black hidden">
                    <div className="">
                        Self Service
                    </div>
                    <div className="">
                        Achievement Packaging
                    </div>
                </div>
            </Link>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="npk" value="NPK" />

                    <TextInput
                        id="npk"
                        type="text"
                        name="npk"
                        value={data.npk}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('npk', e.target.value.slice(0,5))}
                    />
                    <InputError message={formErrors.npk} className="mt-2" />
                    <InputError message={errors.npk} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            value={data.remember}
                            onChange={handleOnChange}
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {/* {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )} */}

                    <ButtonRed className="ml-4" disabled={processing}>
                        Log in
                    </ButtonRed>
                </div>
            </form>
        </GuestLayout>
    );
}
