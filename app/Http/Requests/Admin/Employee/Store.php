<?php

namespace App\Http\Requests\Admin\Employee;

use Illuminate\Foundation\Http\FormRequest;

class Store extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'fullname' => 'required|max:40|string', 
            'npk' => 'required|integer', 
            'group' => 'required|integer', 
            'status' => 'required|max:20|string',
             'password' => 'required|min:8',
             'roles' => 'required|min:4|max:6|string ',
        ];
    }
}
