import { Input } from "components/UI/Input/Input";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "store";
import { setQuery } from "store/movie/movie.reducer";
import { getMovieSlice } from "store/movie/movie.selector";

interface SearchProps {}

export const Search: React.FC<SearchProps> = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [inputQuery, setInputQuery] = useState<string>("");
	const { query } = useSelector(getMovieSlice);

	useEffect(() => {
		if (inputQuery === query) return;

		const timeoutId = setTimeout(() => {
			dispatch(setQuery(inputQuery));
		}, 700);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [inputQuery]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setInputQuery(e.target.value);
	};

	return (
		<div>
			<Input label="Search" onChange={handleChange} value={inputQuery} />
		</div>
	);
};
