import { ErrorPopup } from "components/ErrorPopup/ErrorPopup";
import { Loader } from "components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "store";
import { clearError } from "store/error/error.reducer";
import { getErrorSlice } from "store/error/error.selector";
import { getMovieSlice } from "store/movie/movie.selector";
import styles from "./OverlayContainer.module.css";

export const OverlayContainer = () => {
	const error = useSelector(getErrorSlice);
	const { isLoading } = useSelector(getMovieSlice);

	const dispatch = useDispatch<AppDispatch>();

	return (
		<div className={styles.container}>
			{isLoading && <Loader isTransparent={true} />}
			{error.type && (
				<ErrorPopup closeHandler={() => dispatch(clearError())} type={error.type} message={error.message} />
			)}
		</div>
	);
};
