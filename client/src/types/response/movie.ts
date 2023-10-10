import { Movie } from "types/movie";

export interface GetMoviesResponse {
	data: Movie[];
	total: number;
}

export interface DeleteMovieResponse {
	data: Movie;
}

export interface UpdateMovieResponse {
	data: Movie;
}

export interface AddMovieResponse {
	data: Movie;
}
