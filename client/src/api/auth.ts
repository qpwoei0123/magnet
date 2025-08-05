import {AxiosResponse} from 'axios';
import {saveAuthTokens} from '../utils/auth/saveAuthTokens';
import {axiosInstance} from './axiosInstance';
import {SignupParams, LoginParams} from '../types/api';
import {registerUser, loginUser, logoutUser, initializeDemoUser} from '../utils/auth/localStorageAuth';

export const signup = async (data: SignupParams) => {
	try {
		// localStorage 기반 회원가입
		const result = registerUser({
			email: data.email,
			password: data.password,
			nickname: data.nickName || data.email.split('@')[0],
			username: data.username,
			phone: data.phone,
			addressDto: data.addressDto && data.addressDto.city && data.addressDto.street ? {
			city: data.addressDto.city,
			street: data.addressDto.street
		} : undefined
		});

		if (!result.success) {
			throw new Error(result.message);
		}

		console.log('회원가입 성공:', result.user);
		return result;
	} catch (error) {
		console.error('회원가입 실패', error);
		throw error;
	}
};

export const login = async (body: LoginParams) => {
	try {
		// 데모 사용자 초기화
		initializeDemoUser();

		// localStorage 기반 로그인
		const result = loginUser(body.email, body.password);

		if (!result.success) {
			throw new Error(result.message);
		}

		console.log('로그인 성공:', result.user);
		return result;
	} catch (error) {
		console.error(`로그인 실패`, error);
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

export const logout = async () => {
	try {
		// localStorage 기반 로그아웃
		logoutUser();
		console.log('로그아웃 완료');
	} catch (error) {
		console.error('로그아웃 실패', error);
		throw error;
	}
};
