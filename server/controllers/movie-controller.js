const { MOVIE_VIEW_MODE } = require("../data/constants");
const MovieSevice = require("../services/movie-service");
const handleError = require("../utils/handle-error");

class MovieController {
	async getMovies(req, res) {
		try {
			const offset = Number(req.query._offset) ? Number(req.query._offset) : undefined;
			const limit = Number(req.query._limit) ? Number(req.query._limit) : undefined;
			const viewMode = Object.values(MOVIE_VIEW_MODE).includes(req.query._mode) ? req.query._mode : undefined;
			const searchQuery = req.query._query ? req.query._query : undefined;

			const moviesData = await MovieSevice.getMovies(limit, offset, viewMode, searchQuery);
			res.status(200).json({ data: moviesData.records, total: moviesData.total });
		} catch (e) {
			console.log(e);
			handleError(res, e);
		}
	}

	async addMovie(req, res) {
		try {
			const movieObj = req.body;
			const file = req.file;

			const movie = await MovieSevice.addMovie(movieObj, file);
			res.status(201).json({ data: movie });
		} catch (e) {
			handleError(res, e);
		}
	}

	async updateMovie(req, res) {
		try {
			const movieObj = req.body;
			const movie = await MovieSevice.updateMovie(movieObj);
			res.status(200).json({ data: movie });
		} catch (e) {
			handleError(res, e);
		}
	}

	async deleteMovie(req, res) {
		try {
			const movieObj = req.body;
			const movie = await MovieSevice.deleteMovie(movieObj);
			res.status(200).json({ data: movie });
		} catch (e) {
			handleError(res, e);
		}
	}
}

module.exports = new MovieController();
