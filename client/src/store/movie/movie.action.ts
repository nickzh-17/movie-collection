import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiError } from "api";
import MovieApi from "api/movie";
import { RootState } from "store";
import { Movie } from "types/movie";
import { GetMoviesResponse, UpdateMovieResponse } from "types/response/movie";
import { getMovieSlice } from "./movie.selector";

export const getMoviesThunk = createAsyncThunk<GetMoviesResponse, null, { rejectValue: ApiError }>(
	"movie/getMoviesThunk",
	async (_, thunkApi) => {
		try {
			const { currentPage, recordsPerPage, viewMode, query } = getMovieSlice(thunkApi.getState() as RootState);

			const response = await MovieApi.getMovies((currentPage - 1) * recordsPerPage, recordsPerPage, viewMode, query);
			return response;
		} catch (error) {
			return thunkApi.rejectWithValue(error as ApiError);
		}
	}
);

export const deleteMovieThunk = createAsyncThunk("movie/deleteMovieThunk", async (params: Movie) => {
	const response = await MovieApi.deleteMovie(params);
	return response;
});

export const updateMovieThunk = createAsyncThunk<UpdateMovieResponse, Movie, { rejectValue: ApiError }>(
	"movie/updateMovieThunk",
	async (params: Movie, thunkApi) => {
		try {
			const response = await MovieApi.updateMovie(params);
			return response;
		} catch (error) {
			return thunkApi.rejectWithValue(error as ApiError);
		}
	}
);

export const addMovieThunk = createAsyncThunk("movie/addMovieThunk", async (params: FormData) => {
	try {
		const response = await MovieApi.addMovie(params);
		return response;
	} catch (error) {
		let message;

		if (error instanceof Error) {
			message = error.message;
		} else if (error && typeof error === "object" && "message" in error) {
			message = error.message;
		} else if (typeof error === "string") {
			message = error;
		} else {
			message = "Something went wrong...";
		}

		return { message: message };
	}
});
