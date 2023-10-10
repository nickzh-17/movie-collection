import { MovieCard } from "components/MovieCard/MovieCard";
import { NewMovieCard } from "components/NewMovieCard/NewMovieCard";
import React from "react";
import { Movie } from "types/movie";
import s from "./MoviesGridLayout.module.css";

interface MoviesGridLayoutProps {
	movies: Movie[];
	canEdit: boolean;
}

export const MoviesGridLayout: React.FC<MoviesGridLayoutProps> = ({ movies, canEdit }) => {
	return (
		<div className={s.grid}>
			{canEdit && <NewMovieCard className={s.card} />}
			<>
				{movies.map(movieObj => (
					<MovieCard key={movieObj.id} movie={movieObj} className={s.card} />
				))}
			</>
		</div>
	);
};
