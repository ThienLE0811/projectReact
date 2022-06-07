import React from 'react';
import { useFormik } from 'formik';

const SignUpForm = () => {
    const formik = useFormik()

    return (
        <div className='p-10 w-full max-w-[500px] mx-auto'>
            <div className='flex flex-col gap-2'>
                <label htmlFor='firstName' className='cursor-pointer'>FirstName</label>
                <input 
                    type="text" 
                    id="firstName" 
                    name='firstName'
                    placeholder='Enter your first name'
                    className='p-4 rounded-sm border border-gray-100 outline-lime-400' 
                    />
            </div>
        </div>
    );
};

export default SignUpForm;