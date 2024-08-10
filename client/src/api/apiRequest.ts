import axios from 'axios';
import {saveAuthTokens} from '../utils/auth/saveAuthTokens';

const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';

const axiosInstance = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
	},
});

// 요청 인터셉터를 통해 토큰이 존재하면 추가
axiosInstance.interceptors.request.use(
	config => {
		const authorToken = sessionStorage.getItem('Authorization');
		const refreshToken = sessionStorage.getItem('RefreshToken');

		if (authorToken) {
			config.headers['Authorization'] = authorToken;
		}
		if (refreshToken) {
			config.headers['RefreshToken'] = refreshToken;
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	response => {
		// 로그인 요청에 대한 응답일 경우 토큰 저장
		if (response.config.url?.includes('/auth/login')) {
			saveAuthTokens({
				Authorization: response.headers.authorization,
				RefreshToken: response.headers.refreshtoken,
			});
		}
		return response;
	},
	error => {
		console.error('API 요청 실패:', error.response?.status, error.message);
		return Promise.reject(error);
	},
);

export const apiRequest = {
	async get<T>(url: string, config?: object): Promise<T> {
		try {
			const response = await axiosInstance.get<T>(url, config);
			return response.data;
		} catch (error) {
			console.error('GET 요청 실패');
			throw error;
		}
	},

	async post<T>(url: string, data?: object, config?: object): Promise<T> {
		try {
			const response = await axiosInstance.post<T>(url, data, config);
			return response.data;
		} catch (error) {
			console.error('POST 요청 실패');
			throw error;
		}
	},

	async put<T>(url: string, data?: object, config?: object): Promise<T> {
		try {
			const response = await axiosInstance.put<T>(url, data, config);
			return response.data;
		} catch (error) {
			console.error('PUT 요청 실패');
			throw error;
		}
	},

	async delete<T>(url: string, config?: object): Promise<T> {
		try {
			const response = await axiosInstance.delete<T>(url, config);
			return response.data;
		} catch (error) {
			console.error('DELETE 요청 실패');
			throw error;
		}
	},

	async patch<T>(url: string, data?: object, config?: object): Promise<T> {
		try {
			const response = await axiosInstance.patch<T>(url, data, config);
			return response.data;
		} catch (error) {
			console.error('PATCH 요청 실패');
			throw error;
		}
	},
};

export default axiosInstance;
