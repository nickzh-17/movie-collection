import clsx from "clsx";
import { Button } from "components/UI/Button/Button";
import { Input } from "components/UI/Input/Input";
import { InputFile } from "components/UI/InputFile/InputFile";
import { useFormik } from "formik";
import { MovieCardLayout } from "layouts/MovieCardLayout/MovieCardLayout";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { addMovieThunk, getMoviesThunk } from "store/movie/movie.action";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import s from "./NewCardForm.module.css";

interface NewCardFormProps {}

type FormValues = {
	name: string;
	enName: string;
	genre: string;
	duration: string;
	year: string;
	image: File | null;
};

const initialValues: FormValues = {
	name: "",
	enName: "",
	genre: "",
	duration: "",
	year: "",
	image: null,
};

export type CreateMovieValues = Omit<FormValues, "image"> & {
	image: Blob;
	test: Blob;
};

const validationSchema = yup.object<CreateMovieValues>().shape({
	name: yup.string().trim().required("required field"),
	enName: yup.string().trim().required("required field"),
	genre: yup.string().trim().required("required field"),
	duration: yup.number().required("required field"),
	year: yup.number().required("required field"),
	image: yup.mixed<File>().required("required field"),
});

export const NewCardForm: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [fileKey, setFileKey] = useState<string>(uuidv4());

	const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm } = useFormik({
		initialValues: initialValues,
		validationSchema,
		onSubmit: data => {
			console.log(data);

			const formData = new FormData();

			Object.entries(data).forEach(([key, value]: [any, any]) => {
				return formData.append(key, value);
			});

			dispatch(addMovieThunk(formData)).then(() => {
				dispatch(getMoviesThunk(null));
				resetForm();
				setFileKey(uuidv4());
			});
		},
	});

	return (
		<form id="movie" className={s.form} onSubmit={handleSubmit}>
			<MovieCardLayout
				poster={
					<InputFile
						error={!!touched.image && !!errors.image}
						key={fileKey || ""}
						name="image"
						onChange={e => {
							setFieldValue("image", e.target.files?.[0] ? e.target.files?.[0] : null);
						}}
						accept="image/*"
						handleFile={f => setFieldValue("image", f)}
					/>
				}
				names={[
					<Input
						name="name"
						onChange={handleChange}
						value={values.name}
						error={touched.name && !!errors.name}
						className={clsx(s.inputField, s.name)}
						label="Название"
						key="name"
					/>,
					<Input
						name="enName"
						onChange={handleChange}
						value={values.enName}
						error={touched.enName && !!errors.enName}
						className={clsx(s.inputField, s.subname)}
						label="Англ. название"
						key="enName"
					/>,
				]}
				stats={[
					<Input
						name="genre"
						onChange={handleChange}
						value={values.genre}
						error={touched.genre && !!errors.genre}
						className={clsx(s.inputField, s.genre)}
						label="Жанр"
						key="genre"
					/>,
					<Input
						type="number"
						name="duration"
						onChange={handleChange}
						value={values.duration}
						error={touched.duration && !!errors.duration}
						className={clsx(s.inputField, s.duration)}
						label="Время, мин"
						key="duration"
					/>,
					<Input
						name="year"
						type="number"
						onChange={handleChange}
						value={values.year}
						error={touched.year && !!errors.year}
						className={clsx(s.inputField, s.year)}
						label="Год"
						key="year"
					/>,
				]}
				controls={[
					<Button form="movie" type="submit" color="primary" key="add">
						Создать
					</Button>,
				]}
			/>
			{/* {errors.duration} */}
			{/* {errors.enName} */}
			{/* {errors.name} */}
			{/* {errors.genre} */}
			{/* {errors.year} */}
		</form>
	);
};
