import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';

// 기본 인스턴스 (토큰 없이 사용할 수 있는 요청)
export const axiosInstance = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
	},
});

// 토큰 전용 인스턴스 (토큰이 필요한 요청 전용)
export const axiosInstanceWithAuth = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstanceWithAuth.interceptors.request.use(
	// 요청 인터셉터를 통해 토큰 추가
	config => {
		const authorToken = sessionStorage.getItem('Authorization');
		const refreshToken = sessionStorage.getItem('RefreshToken');

		if (!authorToken && !refreshToken) {
			return Promise.reject(
				new Error('Authorization 토큰과 RefreshToken 토큰이 모두 존재하지 않습니다.'),
			);
		}

		config.headers['Authorization'] = authorToken;
		config.headers['RefreshToken'] = refreshToken;

		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

export default axiosInstance;
