const checkMovieByQuery = (movie, query) => {
	const queryLowerCase = query.toLowerCase();
	return movie.name.toLowerCase().includes(queryLowerCase) || movie.enName.toLowerCase().includes(queryLowerCase);
};

module.exports = checkMovieByQuery;
