import clsx from "clsx";
import React from "react";
import Typography from "../Typography/Typography";
import s from "./InputFile.module.css";
import { useHooks } from "./useInputFile";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
	handleFile: (file: File) => void;
	error?: boolean;
}

export const InputFile: React.FC<InputFileProps> = ({ error = true, handleFile, ...props }) => {
	const {
		handleDroppedFile,
		handleFileDialog,
		imageContainerRef,
		inputFileRef,
		openDialog,
		selectedFile,
		stopDragEvent,
	} = useHooks();
	return (
		<div className={clsx(s.input, { [s.error]: error })}>
			<input
				className={s.inputFile}
				{...props}
				type="file"
				ref={inputFileRef}
				accept="image/*"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleFileDialog(e);
					const filesUploaded = e.target.files;
					if (!filesUploaded) return;
					handleFile(filesUploaded[0]);
				}}
			/>
			<div
				onClick={openDialog}
				ref={imageContainerRef}
				onDragEnter={stopDragEvent}
				onDragOver={stopDragEvent}
				onDrop={handleDroppedFile}
				className={s.image}
				// style={{ ...styles.imageContainer }}
			>
				{selectedFile ? null : (
					<Typography variant="p" color="accent">
						Выбрать постер
					</Typography>
				)}
			</div>
		</div>
	);
};
