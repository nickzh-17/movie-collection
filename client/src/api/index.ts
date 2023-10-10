import axios, { isAxiosError } from "axios";

export interface ApiError {
	message: string;
	type: "Ошибка сервера" | "Неверный формат данных" | "Что-то пошло не так" | "Ошибка подключения" | "";
}

export const client = axios.create({
	baseURL: `${process.env.REACT_APP_API_BASE}/api/v1`,
});

export const getCustomApiError = (error: unknown): ApiError => {
	const customError: ApiError = {
		message: "",
		type: "",
	};

	if (isAxiosError(error)) {
		if (error.response?.status === 404) {
			customError.message = "Не удается получить доступ к ресурсам. Попробуйте позже";
			customError.type = "Ошибка подключения";
			return customError;
		}
		if (error.response?.status && error.response?.status >= 500) {
			customError.message = "Попробуйте повторить запрос позже";
			customError.type = "Ошибка сервера";
			return customError;
		}
	}

	customError.message = "Неведомая ошибка";
	customError.type = "Что-то пошло не так";
	return customError;
};
