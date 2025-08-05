import axios, {AxiosError} from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';

// 기본 인스턴스 (토큰 없이 사용할 수 있는 요청)
export const axiosInstance = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 1000 * 10, // 10초 타임아웃 설정
});

// 토큰 전용 인스턴스 (토큰이 필요한 요청 전용)
export const axiosInstanceWithAuth = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 1000 * 10, // 10초 타임아웃 설정
});

axiosInstanceWithAuth.interceptors.request.use(
	// 요청 인터셉터를 통해 토큰 추가 (모킹 환경)
	config => {
		// 모킹 환경에서는 토큰 체크를 완화
		const authorToken = sessionStorage.getItem('Authorization');
		const refreshToken = sessionStorage.getItem('RefreshToken');

		// 토큰이 없으면 기본 모킹 토큰 사용
		if (!authorToken && !refreshToken) {
			const mockToken = 'Bearer mock_token_demo';
			const mockRefreshToken = 'refresh_mock_token_demo';
			sessionStorage.setItem('Authorization', mockToken);
			sessionStorage.setItem('RefreshToken', mockRefreshToken);
			sessionStorage.setItem('memberId', '1');
			config.headers['Authorization'] = mockToken;
			config.headers['RefreshToken'] = mockRefreshToken;
		} else {
			config.headers['Authorization'] = authorToken;
			config.headers['RefreshToken'] = refreshToken;
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

// 응답 인터셉터를 통해 에러 핸들링 추가 (모킹 환경)
axiosInstanceWithAuth.interceptors.response.use(
	response => {
		return response;
	},
	(error: AxiosError) => {
		// 모킹 환경에서는 404 에러를 더 관대하게 처리
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 404) {
				// 404 에러는 빈 데이터 반환
				console.warn('Mock API: Resource not found, returning empty data');
				return Promise.resolve({ data: null, status: 200, statusText: 'OK', headers: {}, config: error.config });
			}
			throw new Error(
				`${error.message}: ${error.response ? error.response.statusText + error.response.status : '응답없음'}`,
			);
		} else {
			throw error;
		}
	},
);

axiosInstance.interceptors.response.use(
	response => {
		return response;
	},
	(error: AxiosError) => {
		// 모킹 환경에서는 404 에러를 더 관대하게 처리
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 404) {
				// 404 에러는 빈 데이터 반환
				console.warn('Mock API: Resource not found, returning empty data');
				return Promise.resolve({ data: [], status: 200, statusText: 'OK', headers: {}, config: error.config });
			}
			throw new Error(
				`${error.message}: ${error.response ? error.response.statusText + error.response.status : '응답없음'}`,
			);
		} else {
			throw error;
		}
	},
);

export default axiosInstance;
