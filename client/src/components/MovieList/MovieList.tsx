import { Button } from "components/UI/Button/Button";
import { MoviesViewLayout } from "layouts/MoviesViewLayout/MoviesViewLayout";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "store";
import { getMoviesThunk } from "store/movie/movie.action";
import { clearMovies, setCurrentPage, setViewMode } from "store/movie/movie.reducer";
import { getMovieSlice } from "store/movie/movie.selector";
import { ViewMode } from "types/movie";

interface MovieListProps {}

export const MovieList: React.FC<MovieListProps> = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { movies, totalRecords, recordsPerPage, currentPage, viewMode, query } = useSelector(getMovieSlice);
	const isEditMode = viewMode !== "watched";

	const handleChangeViewMode = (newViewMode: ViewMode) => {
		if (viewMode === newViewMode) return;
		dispatch(clearMovies());
		dispatch(setViewMode(newViewMode));
		dispatch(getMoviesThunk(null));
	};

	const handleChangePage = (newPageNum: number) => {
		if (newPageNum === currentPage) return;
		dispatch(setCurrentPage(newPageNum));
		dispatch(getMoviesThunk(null));
	};

	useEffect(() => {
		dispatch(getMoviesThunk(null));
	}, [query]);

	useEffect(() => {
		dispatch(setCurrentPage(1));
	}, [viewMode]);

	return (
		<>
			<MoviesViewLayout
				movies={movies}
				canEdit={isEditMode}
				pagination={{
					totalRecords: totalRecords,
					currentPage: currentPage,
					recordsPerPage: recordsPerPage,
					onChangePage: handleChangePage,
				}}
				controls={[
					<Button
						active={viewMode === "all"}
						onClick={() => {
							handleChangeViewMode("all");
						}}
					>
						Все фильмы
					</Button>,
					<Button
						active={viewMode === "progress"}
						onClick={() => {
							handleChangeViewMode("progress");
						}}
					>
						К просмотру
					</Button>,
					<Button active={viewMode === "watched"} onClick={() => handleChangeViewMode("watched")}>
						Просмотренные
					</Button>,
				]}
			/>
		</>
	);
};
