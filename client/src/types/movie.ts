export type ViewMode = "all" | "watched" | "progress";

export type Movie = {
	id: string;
	name: string;
	enName: string;
	genre: string;
	year: number;
	rating: number;
	movieLength: number;
	image: string;
	status: ViewMode;
};
