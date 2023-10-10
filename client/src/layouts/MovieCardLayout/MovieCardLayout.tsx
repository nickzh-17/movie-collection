import clsx from "clsx";
import Typography from "components/UI/Typography/Typography";
import React from "react";
import s from "./MovieCardLayout.module.css";

interface MovieCardLayoutProps {
	poster: React.ReactNode;
	rate?: {
		current: number | null;
		max: number;
	};
	names: React.ReactNode[];
	stats: React.ReactNode[];
	controls: React.ReactNode[];
	className?: string;
}

export const MovieCardLayout: React.FC<MovieCardLayoutProps> = ({
	poster,
	rate,
	names,
	stats,
	controls,
	className,
}) => {
	return (
		<div className={clsx(s.card, className)}>
			{poster}

			<div className={s.info}>
				{rate && (
					<div className={s.rate}>
						<Typography variant="h3">{rate.current ? `${rate.current}/${rate.max}` : "?"}</Typography>
					</div>
				)}
				<div className={s.names}>{names.map(node => node)}</div>
				<div className={s.stats}>{stats}</div>
			</div>
			<div className={s.controls}>{controls}</div>
		</div>
	);
};
