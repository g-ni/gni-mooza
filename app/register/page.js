"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../_utils/store/auth";
import { useDispatch } from "react-redux";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onRegister = () => {
    if (inputs.password === inputs.confirmPassword) {
      dispatch(register(inputs));
      router.push("/login");
    } else {
      console.log("passwords dont match");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            name="email"
            type="text"
            value={inputs.email}
            onChange={onChangeInput}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            value={inputs.password}
            onChange={onChangeInput}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            value={inputs.confirmPassword}
            onChange={onChangeInput}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={onRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
