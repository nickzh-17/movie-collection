import React, { useEffect } from "react";

export function useOutsideAlerter(ref: React.RefObject<HTMLElement>, callback: () => void, disabled = false) {
	useEffect(() => {
		function handleClickOutside({ target }: MouseEvent) {
			function assertIsNode(e: EventTarget | null): asserts e is Node {
				if (!e || !("nodeType" in e)) {
					throw new Error(`Node expected`);
				}
			}
			assertIsNode(target);

			if (ref.current && !ref.current.contains(target)) {
				callback();
			}
		}
		// Bind the event listener
		if (disabled) document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, disabled]);
}
