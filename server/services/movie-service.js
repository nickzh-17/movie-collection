const FileService = require("./file-service");

const Movie = require("../models/movie.js");
const { MOVIES_FILE_PATH, MOVIE_VIEW_MODE } = require("../data/constants");
const ImageService = require("./image-service");
const checkMovieByMode = require("../utils/check-movie-by-mode");
const checkMovieByQuery = require("../utils/check-movie-by-query");

class MovieSevice {
	async #getMoviesArray() {
		const movies = await FileService.readFile(MOVIES_FILE_PATH);
		return movies;
	}

	async getMovies(limit = 9, offset = 0, viewMode = MOVIE_VIEW_MODE.ALL, searchQuery = "") {
		console.log(limit, offset, viewMode, searchQuery);
		const movies = await this.#getMoviesArray();

		const filteredMovies = movies
			.filter(movie => checkMovieByMode(movie, viewMode))
			.filter(movie => checkMovieByQuery(movie, searchQuery));

		const moviesByPage = filteredMovies.slice(offset, offset + limit);
		return { records: moviesByPage, total: filteredMovies.length };
	}

	async addMovie(movieObj, file) {
		const movies = await this.#getMoviesArray();
		const imageLink = await ImageService.uploadFile(file);

		const newMovie = new Movie({ obj: movieObj, imagePath: imageLink });

		movies.push(newMovie);
		await FileService.writeToFile(MOVIES_FILE_PATH, movies);

		return newMovie;
	}

	async updateMovie(movieObj) {
		const movies = await this.#getMoviesArray();

		const movieFromBase = movies.find(movie => movie.id === movieObj.id);
		if (!movieFromBase) throw new Error("Object does not exist");

		Object.keys(movieObj).forEach(key => {
			movieFromBase[key] = movieObj[key];
		});

		await FileService.writeToFile(MOVIES_FILE_PATH, movies);

		return movieFromBase;
	}

	async deleteMovie(movieObj) {
		const movies = await this.#getMoviesArray();

		const objToDelete = movies.find(movie => movie.id === movieObj.id);
		if (!objToDelete) throw new Error("Object does not exist");

		const newMovies = movies.filter(movie => movie.id !== objToDelete.id);
		await FileService.writeToFile(MOVIES_FILE_PATH, newMovies);

		return objToDelete;
	}
}

module.exports = new MovieSevice();
