import clsx from "clsx";
import { Button } from "components/UI/Button/Button";
import Typography from "components/UI/Typography/Typography";
import React from "react";
import s from "./ErrorPopup.module.css";

interface ErrorPopupProps {
	type: string;
	message: string;
	closeHandler: React.MouseEventHandler<HTMLButtonElement>;
	controls?: React.ReactNode[];
}

export const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, type, closeHandler }) => {
	return (
		<div className={clsx(s.popup, s.error)}>
			<Typography color="error">{type}</Typography>
			<Typography color="primary">{message}</Typography>
			<Button className={s.button} onClick={closeHandler}>
				Закрыть
			</Button>
		</div>
	);
};
