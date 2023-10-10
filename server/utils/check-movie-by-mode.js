const { MOVIE_VIEW_MODE } = require("../data/constants");

const checkMovieByMode = (movie, mode) => {
	switch (mode) {
		case MOVIE_VIEW_MODE.ALL:
			return true;
			break;
		case MOVIE_VIEW_MODE.WATCHED:
			return movie.status === MOVIE_VIEW_MODE.WATCHED;
			break;
		case MOVIE_VIEW_MODE.PROGRESS:
			return movie.status === MOVIE_VIEW_MODE.PROGRESS;
			break;
	}
};

module.exports = checkMovieByMode;
