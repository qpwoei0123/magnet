import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';

export const axiosInstance = axios.create({
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

export default axiosInstance;
