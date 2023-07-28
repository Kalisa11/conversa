"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  type?: string;
  required: boolean;
  placeholder?: string;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

const MessageInput = ({
  id,
  register,
  errors,
  type,
  required,
  placeholder,
}: MessageInputProps) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, {
          required: required,
          pattern: /^(?!\s+$).+/, // Prevent whitespaces only
        })}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-neutral-100"
      />
    </div>
  );
};

export default MessageInput;
