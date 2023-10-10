import { client, getCustomApiError } from "api";
import { Movie, ViewMode } from "types/movie";
import { AddMovieResponse, DeleteMovieResponse, GetMoviesResponse, UpdateMovieResponse } from "types/response/movie";

export const MOVIES_ROUTE = "/movies";

const getQuery = <T>(name: string, value: T): string | null => (value ? `_${name}=${value}` : null);

class MovieApi {
	async getMovies(offset: number, limit: number, viewMode: ViewMode, searchQuery: string): Promise<GetMoviesResponse> {
		try {
			const offsetQueryTemplate = getQuery<number>("offset", offset);
			const limitQueryTemplate = getQuery<number>("limit", limit);
			const viewModeQueryTemplate = getQuery<ViewMode>("mode", viewMode);
			const searchQueryTemplate = getQuery<string>("query", searchQuery);

			const queriesString = [offsetQueryTemplate, limitQueryTemplate, viewModeQueryTemplate, searchQueryTemplate]
				.filter(q => !!q)
				.join("&");
			console.log(queriesString);

			const res = await client.get(MOVIES_ROUTE + (queriesString ? `?${queriesString}` : ""));
			return res.data;
		} catch (error) {
			const customError = getCustomApiError(error);
			throw customError;
		}
	}

	async deleteMovie(movieToDelete: Movie): Promise<DeleteMovieResponse> {
		const res = await client.delete(MOVIES_ROUTE, { data: movieToDelete }).then(res => res.data);
		return res;
	}

	async updateMovie(movieObj: Movie): Promise<UpdateMovieResponse> {
		try {
			const res = await client.patch(`${MOVIES_ROUTE}/`, movieObj).then(res => res.data);
			return res;
		} catch (error) {
			const customError = getCustomApiError(error);
			throw customError;
		}
	}

	async addMovie(params: FormData): Promise<AddMovieResponse> {
		const res = await client.post(`${MOVIES_ROUTE}/`, params).then(res => res.data);
		return res;
	}
}

export default new MovieApi();
