import { SignupParams, LoginParams } from '../types/api';
import { db } from './mockData';

// Helper to delay response for realistic feel
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
		password: data.password, // In a real app, hash this!
		nickname: data.nickName || data.email.split('@')[0],
		isLogin: false,
		createdAt: new Date().toISOString(),
	};

	// Note: This only adds to the in-memory db, it won't persist.
	db.members.push(newUser);

	console.log('Mock Signup Success:', newUser);

	return {
		success: true,
		user: newUser,
	};
};

export const login = async (body: LoginParams) => {
	await delay(500);
	const user = db.members.find(u => u.email === body.email && u.password === body.password);

	if (user) {
		// Simulate token-based auth by setting sessionStorage
		const mockToken = `Bearer mock_token_${user.id}_${Date.now()}`;
		const mockRefreshToken = `refresh_mock_token_${user.id}_${Date.now()}`;

		sessionStorage.setItem('Authorization', mockToken);
		sessionStorage.setItem('RefreshToken', mockRefreshToken);
		sessionStorage.setItem('memberId', user.id.toString());

		console.log('Mock Login Success:', user);

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
	// Clear session storage to simulate logout
	sessionStorage.removeItem('Authorization');
	sessionStorage.removeItem('RefreshToken');
	sessionStorage.removeItem('memberId');
	console.log('Mock Logout Success');
};
