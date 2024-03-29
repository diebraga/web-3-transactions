import { ChangeEvent, FC } from "react";

type FormInputType = {
  placeholder: string;
  name: string;
  type: string;
  value?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
};

export const FormInput: FC<FormInputType> = ({
  placeholder,
  name,
  type,
  value,
  handleChange,
}) => (
  <div className="flex flex-col w-full text-xs py-2">
    <label htmlFor={name} className="mb-1 text-gray-800 text-sm">
      {placeholder}
    </label>
    <input
      id={name}
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="w-full rounded-sm p-2 outline-none bg-transparent text-gray-800 text-sm white-glassmorphism focus:ring-2 focus:ring-purple-500"
    />
  </div>
);
