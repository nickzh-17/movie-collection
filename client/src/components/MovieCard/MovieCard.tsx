import { Button } from "components/UI/Button/Button";
import Typography from "components/UI/Typography/Typography";
import { MovieCardLayout } from "layouts/MovieCardLayout/MovieCardLayout";
import React from "react";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "store";
import { deleteMovieThunk, getMoviesThunk, updateMovieThunk } from "store/movie/movie.action";
import { Movie } from "types/movie";
import { Rate } from "./Rate/Rate";

const MAX_RATE = 5;

interface MovieCardProps {
	movie: Movie;
	className?: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, className }) => {
	const dispatch = useDispatch<AppDispatch>();

	const handleDeleteMovie = (movieToDelete: Movie) => {
		dispatch(deleteMovieThunk(movieToDelete)).then(() => {
			dispatch(getMoviesThunk(null));
		});
	};

	const handleSetWatchedMovie = (movieToWatch: Movie) => {
		const newMovie: Movie = { ...movieToWatch, status: "watched" };
		dispatch(updateMovieThunk(newMovie));
	};

	const handleRateClick = (rate: number) => {
		const newMovie: Movie = { ...movie, rating: rate };
		dispatch(updateMovieThunk(newMovie));
	};

	return (
		<MovieCardLayout
			className={className}
			poster={<img src={movie.image} />}
			rate={{ current: movie.rating, max: MAX_RATE }}
			names={[
				<Typography key={`${movie.id}_name`} variant="h3" color="second">
					{movie.name}
				</Typography>,
				<Typography key={`${movie.id}_enName`} variant="p">
					{movie.enName}
				</Typography>,
			]}
			stats={[
				<Typography key={`${movie.id}_name`} variant="p" color="second">
					{movie.genre}
				</Typography>,
				<Typography key={`${movie.id}_movieLength`} variant="p">
					{movie.movieLength} мин
				</Typography>,
				<Typography key={`${movie.id}_year`} variant="p">
					{movie.year}
				</Typography>,
			]}
			controls={[
				<Button
					key={`${movie.id}_watch`}
					color={movie.status === "progress" ? "secondary" : "success"}
					disabled={movie.status === "watched"}
					onClick={() => handleSetWatchedMovie(movie)}
				>
					{movie.status === "progress" ? "Добавить в Просмотрено" : "Просмотрено"}
				</Button>,
				<Rate key={`${movie.id}_rate`} maxRate={MAX_RATE} onRateClick={handleRateClick} />,
				<Button key={`${movie.id}_delete`} color="error" onClick={() => handleDeleteMovie(movie)}>
					Удалить из списка
				</Button>,
			]}
		/>
	);
};
