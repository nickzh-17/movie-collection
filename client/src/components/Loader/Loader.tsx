import clsx from "clsx";
import React, { useLayoutEffect, useState } from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
	isTransparent: boolean;
}

function enableScroll() {
	document.body.classList.remove("noScroll");
}
function disableScroll() {
	document.body.classList.add("noScroll");
}
function getPageHeight() {
	const body = document.body;
	const html = document.documentElement;

	const height = Math.max(
		body.scrollHeight,
		body.offsetHeight,
		html.clientHeight,
		html.scrollHeight,
		html.offsetHeight
	);

	return `${height}px`;
}

export const Loader: React.FC<LoaderProps> = ({ isTransparent = true }) => {
	const [height, setHeight] = useState("100vh");

	useLayoutEffect(() => {
		setHeight(getPageHeight());
		disableScroll();

		return () => {
			enableScroll();
		};
	}, []);

	return (
		<div className={clsx(styles.loaderWrapper, { [styles.nonTransparent]: !isTransparent })} style={{ height: height }}>
			{/* <img className={styles.loader} src={l1} alt="loader" /> */}
			<svg className={styles.loader} width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
						<stop stop-color="#fff" stop-opacity="0" offset="0%" />
						<stop stop-color="#fff" stop-opacity=".631" offset="63.146%" />
						<stop stop-color="#fff" offset="100%" />
					</linearGradient>
				</defs>
				<g fill="none" fill-rule="evenodd">
					<g transform="translate(1 1)">
						<path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
							<animateTransform
								attributeName="transform"
								type="rotate"
								from="0 18 18"
								to="360 18 18"
								dur="0.9s"
								repeatCount="indefinite"
							/>
						</path>
						<circle fill="#fff" cx="36" cy="18" r="1">
							<animateTransform
								attributeName="transform"
								type="rotate"
								from="0 18 18"
								to="360 18 18"
								dur="0.9s"
								repeatCount="indefinite"
							/>
						</circle>
					</g>
				</g>
			</svg>
		</div>
	);
};
