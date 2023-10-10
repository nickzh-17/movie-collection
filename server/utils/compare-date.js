const SORT_VARIANT = {
	ASC: "asc",
	DESC: "desc",
};

const compareDates = (dateA, dateB, sort) => {
	if (dateA > dateB) return sort === SORT_VARIANT.ASC ? 1 : -1;
	if (dateA < dateB) return sort === SORT_VARIANT.ASC ? -1 : 1;
	return 0;
};

module.exports = { compareDates };
