import clsx from "clsx";
import React from "react";

import styles from "./Typography.module.css";

interface TypographyProps {
	variant?: "h1" | "h2" | "h3" | "p" | "span";
	className?: string;
	children: React.ReactNode;
	color?: "primary" | "second" | "accent" | "error" | "success";
}

const Typography: React.FC<TypographyProps> = ({ variant = "p", color = "primary", className, children }) => {
	const Tag = variant;

	return <Tag className={clsx(styles[variant], styles[color], className)}>{children}</Tag>;
};

export default Typography;
