import clsx from "clsx";
import { Button } from "components/UI/Button/Button";
import Typography from "components/UI/Typography/Typography";
import { useOutsideAlerter } from "hooks/useOutsideClick";
import React, { useRef, useState } from "react";
import s from "./Rate.module.css";

interface RateProps {
	maxRate: number;
	onRateClick: (rate: number) => void;
	className?: string;
}

export const Rate: React.FC<RateProps> = ({ maxRate, onRateClick, className }) => {
	const [isRateEdit, setIsRateEdit] = useState<boolean>(false);

	const wrapperRef = useRef(null);
	useOutsideAlerter(
		wrapperRef,
		() => {
			setIsRateEdit(false);
		},
		isRateEdit
	);

	const handleRateClick = (number: number) => {
		onRateClick(number);
		setIsRateEdit(false);
	};

	const rateNumbers = Array.from({ length: maxRate }, (_, i) => i + 1);

	return (
		<div ref={wrapperRef} className={clsx(s.rate, className)}>
			<Button
				onClick={() => {
					setIsRateEdit(prev => !prev);
				}}
			>
				Оценить
			</Button>
			<div className={s.scale}>
				{isRateEdit &&
					rateNumbers.map(number => (
						<div onClick={() => handleRateClick(number)} className={s.item} key={number}>
							<Typography color="primary">{number}</Typography>
						</div>
					))}
			</div>
		</div>
	);
};
