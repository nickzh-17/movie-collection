import { ErrorPopup } from "components/ErrorPopup/ErrorPopup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "store";
import { clearError } from "store/error/error.reducer";
import { getErrorSlice } from "store/error/error.selector";
import styles from "./OverlayContainer.module.css";

export const OverlayContainer = () => {
	const error = useSelector(getErrorSlice);
	// 	const { isPostLoading, isPostsLoading } = useSelector(getPostSlice);
	// 	const { log } = useSelector(getSlice);
	// 	const { log: logUser } = useSelector(getUserSlice);

	const dispatch = useDispatch<AppDispatch>();

	return (
		<div className={styles.container}>
			{/* {(isPostLoading || isPostsLoading || isUserLoading) && <Loader isTransparent={isUserFetched} />} */}
			{/* {false && <Loader isTransparent={isUserFetched} />} */}
			{error.type && (
				<ErrorPopup closeHandler={() => dispatch(clearError())} type={error.type} message={error.message} />
			)}
		</div>
	);
};
