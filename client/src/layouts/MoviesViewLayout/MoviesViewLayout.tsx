import { Pagination, PaginationProps } from "components/Pagination/Pagination";
import { MoviesGridLayout } from "layouts/MoviesGridLayout/MoviesGridLayout";
import React from "react";
import { Movie } from "types/movie";
import { v4 as uuidv4 } from "uuid";
import s from "./MoviesViewLayout.module.css";

interface MoviesViewLayoutProps {
	controls: React.ReactNode[];
	movies: Movie[];
	canEdit: boolean;
	pagination: PaginationProps;
}

export const MoviesViewLayout: React.FC<MoviesViewLayoutProps> = ({ canEdit, movies, controls, pagination }) => {
	return (
		<div className={s.view}>
			<div className={s.controls}>
				{controls.map(control => (
					<div className={s.control} key={uuidv4()}>
						{control}
					</div>
				))}
			</div>
			<MoviesGridLayout movies={movies} canEdit={canEdit} />
			<Pagination
				totalRecords={pagination.totalRecords}
				currentPage={pagination.currentPage}
				recordsPerPage={pagination.recordsPerPage}
				onChangePage={pagination.onChangePage}
			/>
		</div>
	);
};
