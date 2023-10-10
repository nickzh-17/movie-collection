import clsx from "clsx";
import React, { forwardRef } from "react";
import s from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: boolean;
	description?: string;
	className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, description, className, ...inputProps }, ref) => {
		return (
			<input placeholder={label} ref={ref} {...inputProps} className={clsx(s.input, { [s.error]: error }, className)} />
		);
	}
);
