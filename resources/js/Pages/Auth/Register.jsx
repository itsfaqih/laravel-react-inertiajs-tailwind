import React, { useState } from 'react';
import TextInput from '@/Components/TextInput';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import AuthLayout from '@/Layouts/Auth';
import { Inertia } from '@inertiajs/inertia';

export default function Register() {
  const { errors } = usePage();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleChange = (e) => {
    const key = e.target.name;
    const val = e.target.value;

    setValues(values => ({
      ...values,
      [key]: val
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    Inertia.post(
      route('register'),
      values
    );
  }

  return (
    <AuthLayout>
      <div>
        <InertiaLink href={route('welcome')}>
          <h1 className="text-4xl font-semibold text-center">LaraReactia</h1>
        </InertiaLink>
        <h2 className="mt-2 text-xl text-center text-indigo-500">
          Start create a new account
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="rounded-md shadow-sm">
          <TextInput
            aria-label="Name"
            name="name"
            type="text"
            value={values.name}
            error={errors?.name}
            onChange={handleChange}
            placeholder="Name"
            inputClass="rounded-t-md"
            required
          />
          <TextInput
            aria-label="Email address"
            name="email"
            type="email"
            value={values.email}
            error={errors?.email}
            onChange={handleChange}
            placeholder="Email address"
            containerClass="-mt-px"
            required
          />
          <TextInput
            aria-label="Password"
            name="password"
            type="password"
            value={values.password}
            error={errors?.password}
            onChange={handleChange}
            placeholder="Password"
            containerClass="-mt-px"
            required
          />
          <TextInput
            aria-label="Password Confirmation"
            name="password_confirmation"
            type="password"
            value={values.password_confirm}
            onChange={handleChange}
            placeholder="Confirm Password"
            containerClass="-mt-px"
            inputClass="rounded-b-md"
            required
          />
        </div>
        {Object.keys(errors).length > 0 &&
          <div className="px-3 pt-3 pb-2 mt-3 text-sm bg-red-200 rounded-md">
            <h3 className="mb-2 font-semibold text-red-800">There's something wrong with your input:</h3>
            <ul className="px-5 text-red-700 list-disc">
            {
              Object.entries(errors).map((error, index) => error[1].map((msg, i) => <li key={`${index}-${i}`} className="mb-1 leading-normal">{msg}</li>))
            }
            </ul>
          </div>
        }
        <div className="mt-6">
          <button type="submit" className="relative flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-indigo-500 transition duration-150 ease-in-out group-hover:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
              Sign up
            </button>
        </div>
      </form>
    </AuthLayout>
  );
}