import { Header } from "components/Header/Header";
import { MovieList } from "components/MovieList/MovieList";
import { PageLayout } from "layouts/PageLayout/PageLayout";
import React from "react";

export const MovieListPage: React.FC = () => {
	return (
		<>
			<PageLayout header={<Header />} content={<MovieList />} />
		</>
	);
};
