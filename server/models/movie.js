const uuid = require("uuid");
const { MOVIE_STATUS } = require("../data/constants");

module.exports = class Movie {
	id;
	name;
	enName;
	genre;
	year;
	rating;
	movieLength;
	image;
	status;

	constructor({ obj, imagePath }) {
		this.id = uuid.v4();
		this.name = obj.name;
		this.enName = obj.enName;
		this.genre = obj.genre;
		this.year = obj.year;
		this.rating = null;
		this.movieLength = obj.movieLength;
		this.image = imagePath;
		this.status = MOVIE_STATUS.PROGRESS;
	}
};
