const { dirname } = require("path");
const appDir = dirname(require.main.filename);

const MOVIE_STATUS = {
	PROGRESS: "progress",
	WATCHED: "watched",
};

const MOVIE_VIEW_MODE = {
	ALL: "all",
	WATCHED: "watched",
	PROGRESS: "progress",
};

const MOVIES_FILE_PATH = `${appDir}\\data\\movies.json`;

module.exports = { MOVIE_STATUS, MOVIES_FILE_PATH, MOVIE_VIEW_MODE };
