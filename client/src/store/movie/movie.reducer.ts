import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, ViewMode } from "types/movie";
import { addMovieThunk, deleteMovieThunk, getMoviesThunk, updateMovieThunk } from "./movie.action";

const VIEW_MODES_FOR_EDIT: ViewMode[] = ["all", "progress"];

interface MovieState {
	movies: Movie[];
	totalRecords: number;
	recordsPerPage: number;
	currentPage: number;
	viewMode: ViewMode;
	query: string;
	isLoading: boolean;
}

const initialState: MovieState = {
	movies: [],
	totalRecords: 0,
	recordsPerPage: 9,
	currentPage: 1,
	viewMode: "all",
	query: "",
	isLoading: false,
};

export const movieSlice = createSlice({
	name: "movie",
	initialState,
	reducers: {
		setMovies: (state, action: PayloadAction<Movie[]>) => {
			state.movies = action.payload;
		},
		clearMovies: state => {
			state.movies = [];
			state.totalRecords = 0;
		},
		setViewMode: (state, action: PayloadAction<ViewMode>) => {
			if (VIEW_MODES_FOR_EDIT.includes(action.payload)) {
				state.recordsPerPage = 9;
			} else {
				state.recordsPerPage = 10;
			}

			state.viewMode = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setQuery: (state, action: PayloadAction<MovieState["query"]>) => {
			state.query = action.payload;
			state.currentPage = 1;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getMoviesThunk.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getMoviesThunk.fulfilled, (state, action) => {
				state.movies = action.payload.data;
				state.totalRecords = action.payload.total;
				state.isLoading = false;
			})
			.addCase(deleteMovieThunk.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(deleteMovieThunk.fulfilled, (state, action) => {
				const deletedMovieObj = action.payload.data;

				const updatedMovies = state.movies.filter(m => m.id !== deletedMovieObj.id);
				state.movies = updatedMovies;

				state.isLoading = false;
			})
			.addCase(updateMovieThunk.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(updateMovieThunk.fulfilled, (state, action) => {
				const updatedMovieObj = action.payload.data;
				if (!state.movies.length) return;

				const movieToUpdate = state.movies.find(m => m.id === updatedMovieObj.id);
				if (!movieToUpdate) return;

				Object.assign(movieToUpdate, updatedMovieObj);
				state.isLoading = false;
			})
			.addCase(addMovieThunk.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(addMovieThunk.fulfilled, (state, action) => {
				if (
					typeof action.payload === "object" &&
					action.payload !== null &&
					"data" in action.payload &&
					typeof action.payload === "object"
				) {
					const updatedMovieObj = action.payload.data;
					state.movies.push(updatedMovieObj);
					state.isLoading = false;
				}
			});
	},
});

export const { setMovies, setViewMode, setCurrentPage, setQuery, clearMovies } = movieSlice.actions;

export default movieSlice.reducer;
