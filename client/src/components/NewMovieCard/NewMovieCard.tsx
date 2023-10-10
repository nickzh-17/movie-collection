import { ReactComponent as AddIcon } from "assets/icon/add.svg";
import clsx from "clsx";
import { useOutsideAlerter } from "hooks/useOutsideClick";
import React, { useRef, useState } from "react";
import { NewCardForm } from "./NewCardForm/NewCardForm";
import s from "./NewMovieCard.module.css";

interface NewMovieCardProps {
	className: string;
}

export const NewMovieCard: React.FC<NewMovieCardProps> = ({ className }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const wrapperRef = useRef(null);
	useOutsideAlerter(
		wrapperRef,
		() => {
			setIsEditing(false);
		},
		isEditing
	);

	return (
		<div
			ref={wrapperRef}
			className={clsx(s.card, { [s.isEditing]: isEditing }, className)}
			onClick={() => {
				if (!isEditing) setIsEditing(prev => !prev);
			}}
		>
			{!isEditing ? <AddIcon className={s.addIcon} /> : <NewCardForm />}
		</div>
	);
};
