import { createSlice } from "@reduxjs/toolkit";
import { getMoviesThunk, updateMovieThunk } from "store/movie/movie.action";

interface ErrorsState {
	message: string;
	type: string;
}

const initialState: ErrorsState = {
	message: "",
	type: "",
};

export const errorSlice = createSlice({
	name: "errors",
	initialState,
	reducers: {
		clearError: state => {
			state.message = "";
			state.type = "";
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getMoviesThunk.pending, state => {
				state.message = "";
			})
			.addCase(getMoviesThunk.rejected, (state, action) => {
				if (action.payload?.message) {
					state.message = action.payload.message;
					state.type = action.payload.type;
				}
			})
			.addCase(updateMovieThunk.pending, state => {
				state.message = "";
			})
			.addCase(updateMovieThunk.rejected, (state, action) => {
				if (action.payload?.message) {
					state.message = action.payload.message;
					state.type = action.payload.type;
				}
			});
	},
});

export const { clearError } = errorSlice.actions;

export default errorSlice.reducer;
