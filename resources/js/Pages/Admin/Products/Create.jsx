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

export default function Create({products,parcels }) {
    const defaultTarget = { parcel_id: null, quantity: "" };
    const { data, setData, post } = useForm({
        drw_no: "",
        product_name: "",
        product_type: "",
        targets: [defaultTarget],
    });
    const [errors, setErrors] = useState({});
    const optionProductType = [
        { value: "Joint Carburator", label: "Joint Carburator" },
        { value: "Oil Level Gauge", label: "Oil Level Gauge" },
        { value: "O-Ring", label: "O-Ring" },
        { value: "Oil Seals", label: "Oil Seals" },
        { value: "Rubber Part", label: "Rubber Part" },
        { value: "VSS", label: "VSS" },
    ];

    const optionParcels = parcels.map((parcel) => ({
        value: parcel.id,
        label: parcel.quantity.toLocaleString(),
    }));
    

    const handleParcelChange = (selectedOption, index) => {
        const updatedTargets = [...data.targets];
        updatedTargets[index].parcel_id = selectedOption?.value || null;
    
        // Remove the selected parcel option from other targets
        if (selectedOption) {
            updatedTargets.forEach((target, i) => {
                if (i !== index && target.parcel_id === selectedOption.value) {
                    updatedTargets[i].parcel_id = null;
                }
            });
        }
    
        setData({ ...data, targets: updatedTargets });
    };

    const handleChange = (e, index) => {
        const key = e.target.name;
        const value = e.target.value;
        const updatedTargets = [...data.targets];
        updatedTargets[index][key] = value;
        setData({ ...data, targets: updatedTargets });
      };

    const handleChangeOption = (selectedOption) => {
    setData((prevData) => ({
        ...prevData,
        product_type: selectedOption.value,
    }));
    };

    const addTarget = () => {
        setData((prevData) => ({
          ...prevData,
          targets: [...prevData.targets, { ...defaultTarget }],
        }));
      };
    
    const removeTarget = (index) => {
        if (index > 0) {
          setData((prev) => ({
            ...prev,
            targets: prev.targets.filter((_, i) => i !== index),
          }));
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
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
        if (data.targets.length === 0) {
            newErrors.targets = [{ quantity: "Setidaknya satu target harus diisi" }];
            isValid = false;
          } else {
            const targetErrors = data.targets.map((target, i) => {
              const targetErrors = {};
              if (!target.parcel_id) {
                targetErrors.parcel_id = "Pilih parcel";
                isValid = false;
              }
              if (!target.quantity) {
                targetErrors.quantity = "Jumlah target harus diisi";
                isValid = false;
              }
              return targetErrors;
            });
            newErrors.targets = targetErrors;
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
            <Authenticated>
                <Calendar/>
                <div className="flex justify-center items-center">
                    <div className="xs:w-full w-1/2">
                        <div className="p-5 bg-white shadow sm:rounded-lg">
                            <div className="mb-6 font-extrabold">
                                <h1>Add Product</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="w-full">
                                    <div className="mb-5">
                                        <InputLabel value="Drawing Number" />
                                        <TextInput
                                            className="block w-full"
                                            type="text"
                                            name="drw_no"
                                            value={data.drw_no}
                                            onChange={(e) => setData('drw_no',e.target.value)}
                                        />
                                        <InputError message={errors.drw_no} />
                                    </div>
                                    <div className="mb-5">
                                        <InputLabel value="Product Name" />
                                        <TextInput
                                            className="block w-full"
                                            type="text"
                                            name="product_name"
                                            value={data.product_name}
                                            onChange={(e) => setData('product_name',e.target.value)}
                                        />
                                        <InputError message={errors.product_name}/>
                                    </div>
                                    <div className="mb-5 border-b pb-6">
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
                                    <div className="">
                                        <h1 className="text-gray-800 font-semibold mb-3">Target :</h1>
                                        {data.targets.map((target, i) => {
                                            const updatedOptionParcels = optionParcels.filter(optionParcel =>
                                                data.targets.every((prevTarget, prevIndex) => prevIndex >= i || prevTarget.parcel_id !== optionParcel.value)
                                            );
                                            return (
                                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mb-3" key={i}>
                                                <div className="w-full">
                                                    <InputLabel value="Qty. Parcel (Pcs)" />
                                                    <Select
                                                        className="block w-full absolute"
                                                        options={updatedOptionParcels}
                                                        isClearable={true}
                                                        onChange={(selectedOption) => handleParcelChange(selectedOption, i)}
                                                        value={optionParcels.find((optionParcel) => optionParcel.value === target.parcel_id) || null}
                                                    />
                                                    <InputError message={errors.targets && errors.targets[i]?.parcel_id} />
                                                </div>
                                                <div className="w-full">
                                                    <InputLabel value="Target / Shift (pcs)" />
                                                    <div className="flex gap-2 items-center w-full">
                                                        <input
                                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full block h-9 grow"
                                                            type="number"
                                                            name="quantity"
                                                            value={target.quantity || ""}
                                                            onChange={(e) => handleChange(e, i)}
                                                        />
                                                        {i!=0 && (
                                                            <button onClick={() => removeTarget(i)} className="px-2 py-1 rounded w-fit bg-yellow-500 hover:bg-yellow-600 text-white">X</button>
                                                        )}
                                                    </div>
                                                    <InputError message={errors.targets && errors.targets[i]?.quantity} />
                                                </div>
                                            </div>
                                            )
                                        })}
                                    </div>
                                </div>   
                                
                                <div className="flex justify-end mt-6 gap-3">
                                    <div className="px-6 py-2 rounded bg-emerald-500 text-white hover:bg-emerald-600" onClick={addTarget} role="button">Add Target</div>
									<Link href={route("admin.products.index")} className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-800 uppercase">
										Cancel 
									</Link>
									<PrimaryButton type="submit" className="bg-red-600">
										Save
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