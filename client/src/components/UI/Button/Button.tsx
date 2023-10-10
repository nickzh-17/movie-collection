import clsx from "clsx";
import React from "react";
import s from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	color?: "primary" | "secondary" | "transparent" | "error" | "success";
	variant?: "simple" | "clear";
	active?: boolean;
	children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
	onClick,
	children,
	color = "transparent",
	variant = "simple",
	className,
	active,
	type,
	...buttonProps
}) => {
	return (
		<button
			className={clsx(s.button, s[color], s[variant], { [s.active]: active }, className)}
			onClick={onClick}
			type={type}
			{...buttonProps}
		>
			{children}
		</button>
	);
};
