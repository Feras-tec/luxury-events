import React from "react";

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const FormField = ({
  label,
  type = "text",
  required = false,
  ...props
}: FormFieldProps) => {
  return (
    <label className="form-control w-full">
      <div className="label py-1">
        <span className="label-text font-bold text-xs uppercase tracking-wider opacity-70">
          {label} {required && "*"}
        </span>
      </div>
      <input
        type={type}
        required={required}
        className="input input-bordered w-full bg-base-200/50 focus:input-primary text-base-content"
        {...props}
      />
    </label>
  );
};
