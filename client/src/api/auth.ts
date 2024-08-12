import {AxiosResponse} from 'axios';
import {saveAuthTokens} from '../utils/auth/saveAuthTokens';
import {axiosInstance} from './axiosInstance';
import {SignupParams, LoginParams} from '../types/api';

export const signup = async (data: SignupParams) => {
	await axiosInstance.post('/member/signup', data);
};

export const login = async (body: LoginParams) => {
	try {
		const res = await axiosInstance.post('/auth/login', createLoginPayload(body));
		handleLoginResponseToken(res);
	} catch (error) {
		console.error(`login 함수에서 문제 발생`);
		throw error;
	}
};
// 백엔드에서 수정할 떄 까지 임시로.
const createLoginPayload = (body: LoginParams) => ({
	username: body.email,
	password: body.password,
});
// 응답에 대한 토큰 조작
const handleLoginResponseToken = (response: AxiosResponse) => {
	const authHeader = response.headers.authorization;
	const refreshTokenHeader = response.headers.refreshtoken;

	if (!authHeader) {
		throw new Error('Authorization 헤더가 누락되었습니다.');
	}
	if (!refreshTokenHeader) {
		throw new Error('RefreshToken 헤더가 누락되었습니다.');
	}

	saveAuthTokens({
		Authorization: authHeader,
		RefreshToken: refreshTokenHeader,
	});
};

// export const logout = async () => {};
