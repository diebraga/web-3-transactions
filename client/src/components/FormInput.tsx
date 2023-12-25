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
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-gray-800 border-none text-sm white-glassmorphism"
  />
);
