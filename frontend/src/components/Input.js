import React from 'react';

const Input = ({ label, type, value, onChange, placeholder }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">{label}</label>
            <input
                type={type}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;
