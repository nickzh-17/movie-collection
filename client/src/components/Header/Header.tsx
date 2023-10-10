import { Search } from "components/Search/Search";
import Typography from "components/UI/Typography/Typography";
import React from "react";
import s from "./Header.module.css";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
	return (
		<div className={s.header}>
			<Typography variant="h1">Accelerator</Typography>
			<Search />
		</div>
	);
};
