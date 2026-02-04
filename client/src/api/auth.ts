import { SignupParams, LoginParams } from '../types/api';
import { db } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const signup = async (data: SignupParams) => {
	await delay(500);

	const existingUser = db.members.find(user => user.email === data.email);

	if (existingUser) {
		throw new Error('User with this email already exists.');
	}

	const newUser = {
		id: db.members.length + 1,
		email: data.email,
		password: data.password,
		nickname: data.nickName || data.email.split('@')[0],
		isLogin: false,
		createdAt: new Date().toISOString(),
	};

	db.members.push(newUser as any);

	return {
		success: true,
		user: newUser,
	};
};

export const login = async (body: LoginParams) => {
	await delay(500);
	const user = db.members.find(u => u.email === body.email && u.password === body.password);

	if (user) {
		const mockToken = `Bearer mock_token_${user.id}_${Date.now()}`;
		const mockRefreshToken = `refresh_mock_token_${user.id}_${Date.now()}`;

		sessionStorage.setItem('Authorization', mockToken);
		sessionStorage.setItem('RefreshToken', mockRefreshToken);
		sessionStorage.setItem('memberId', user.id.toString());

		return {
			success: true,
			user: { ...user, isLogin: true },
		};
	} else {
		throw new Error('Invalid email or password');
	}
};

export const logout = async () => {
	await delay(300);
	sessionStorage.removeItem('Authorization');
	sessionStorage.removeItem('RefreshToken');
	sessionStorage.removeItem('memberId');
};
