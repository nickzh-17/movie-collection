import React from "react";
import s from "./PageLayout.module.css";

interface PageLayout {
	header: React.ReactNode;
	content: React.ReactNode;
	footer?: React.ReactNode;
}

export const PageLayout: React.FC<PageLayout> = ({ header, content, footer }) => {
	return (
		<section className={s.layout}>
			<header className={s.header}>{header}</header>
			<main className={s.content}>{content}</main>
			{footer && <footer className={s.footer}>{footer}</footer>}
		</section>
	);
};
