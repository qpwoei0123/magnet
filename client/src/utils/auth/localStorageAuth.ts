// localStorage 기반 회원 인증 관리

export type LocalStorageUser = {
	id: string;
	email: string;
	password: string;
	nickname: string;
	username?: string;
	phone?: string;
	addressDto?: {
		city: string;
		street: string;
	};
	isLogin: boolean;
	createdAt: string;
};

const USERS_STORAGE_KEY = 'magnet_users';
const CURRENT_USER_KEY = 'magnet_current_user';

// 모든 사용자 데이터 가져오기
export const getAllUsers = (): LocalStorageUser[] => {
	try {
		const users = localStorage.getItem(USERS_STORAGE_KEY);
		return users ? JSON.parse(users) : [];
	} catch (error) {
		console.error('사용자 데이터 로드 실패:', error);
		return [];
	}
};

// 사용자 데이터 저장
const saveUsers = (users: LocalStorageUser[]): void => {
	try {
		localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
	} catch (error) {
		console.error('사용자 데이터 저장 실패:', error);
	}
};

// 고유 ID 생성
const generateUniqueId = (): string => {
	return Math.random().toString(36).substr(2, 9);
};

// 이메일로 사용자 찾기
export const findUserByEmail = (email: string): LocalStorageUser | null => {
	const users = getAllUsers();
	return users.find(user => user.email === email) || null;
};

// 회원가입
export const registerUser = (userData: Omit<LocalStorageUser, 'id' | 'isLogin' | 'createdAt'>): { success: boolean; message: string; user?: LocalStorageUser } => {
	try {
		// 이메일 중복 체크
		const existingUser = findUserByEmail(userData.email);
		if (existingUser) {
			return { success: false, message: '이미 존재하는 이메일입니다.' };
		}

		// 새 사용자 생성
		const newUser: LocalStorageUser = {
			...userData,
			id: generateUniqueId(),
			isLogin: false,
			createdAt: new Date().toISOString()
		};

		// 기존 사용자 목록에 추가
		const users = getAllUsers();
		users.push(newUser);
		saveUsers(users);

		console.log('회원가입 성공:', newUser);
		return { success: true, message: '회원가입이 완료되었습니다.', user: newUser };
	} catch (error) {
		console.error('회원가입 실패:', error);
		return { success: false, message: '회원가입 중 오류가 발생했습니다.' };
	}
};

// 로그인
export const loginUser = (email: string, password: string): { success: boolean; message: string; user?: LocalStorageUser } => {
	try {
		const user = findUserByEmail(email);
		
		if (!user) {
			return { success: false, message: '존재하지 않는 이메일입니다.' };
		}

		if (user.password !== password) {
			return { success: false, message: '비밀번호가 일치하지 않습니다.' };
		}

		// 로그인 상태 업데이트
		const users = getAllUsers();
		const userIndex = users.findIndex(u => u.id === user.id);
		if (userIndex !== -1) {
			users[userIndex].isLogin = true;
			saveUsers(users);
		}

		// 현재 사용자 정보 저장
		localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

		// 세션 스토리지에 토큰 정보 저장 (기존 시스템과 호환)
		const mockToken = `Bearer mock_token_${user.id}`;
		const mockRefreshToken = `refresh_mock_token_${user.id}`;
		sessionStorage.setItem('Authorization', mockToken);
		sessionStorage.setItem('RefreshToken', mockRefreshToken);
		sessionStorage.setItem('memberId', user.id);

		console.log('로그인 성공:', user);
		return { success: true, message: '로그인 되었습니다.', user };
	} catch (error) {
		console.error('로그인 실패:', error);
		return { success: false, message: '로그인 중 오류가 발생했습니다.' };
	}
};

// 로그아웃
export const logoutUser = (): void => {
	try {
		// 현재 사용자 정보 가져오기
		const currentUserData = localStorage.getItem(CURRENT_USER_KEY);
		if (currentUserData) {
			const currentUser = JSON.parse(currentUserData);
			
			// 사용자 목록에서 로그인 상태 업데이트
			const users = getAllUsers();
			const userIndex = users.findIndex(u => u.id === currentUser.id);
			if (userIndex !== -1) {
				users[userIndex].isLogin = false;
				saveUsers(users);
			}
		}

		// 현재 사용자 정보 삭제
		localStorage.removeItem(CURRENT_USER_KEY);
		
		// 세션 스토리지 정리
		sessionStorage.removeItem('Authorization');
		sessionStorage.removeItem('RefreshToken');
		sessionStorage.removeItem('memberId');

		console.log('로그아웃 완료');
	} catch (error) {
		console.error('로그아웃 실패:', error);
	}
};

// 현재 로그인한 사용자 정보 가져오기
export const getCurrentUser = (): LocalStorageUser | null => {
	try {
		const userData = localStorage.getItem(CURRENT_USER_KEY);
		return userData ? JSON.parse(userData) : null;
	} catch (error) {
		console.error('현재 사용자 정보 로드 실패:', error);
		return null;
	}
};

// 사용자 정보 업데이트
export const updateUser = (userId: string, updateData: Partial<LocalStorageUser>): { success: boolean; message: string; user?: LocalStorageUser } => {
	try {
		const users = getAllUsers();
		const userIndex = users.findIndex(u => u.id === userId);
		
		if (userIndex === -1) {
			return { success: false, message: '사용자를 찾을 수 없습니다.' };
		}

		// 사용자 정보 업데이트
		users[userIndex] = { ...users[userIndex], ...updateData };
		saveUsers(users);

		// 현재 사용자 정보도 업데이트
		const currentUser = getCurrentUser();
		if (currentUser && currentUser.id === userId) {
			localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[userIndex]));
		}

		return { success: true, message: '사용자 정보가 업데이트되었습니다.', user: users[userIndex] };
	} catch (error) {
		console.error('사용자 정보 업데이트 실패:', error);
		return { success: false, message: '사용자 정보 업데이트 중 오류가 발생했습니다.' };
	}
};

// 초기 데모 사용자 설정
export const initializeDemoUser = (): void => {
	const existingUsers = getAllUsers();
	
	// 데모 사용자가 없으면 생성
	if (!findUserByEmail('demo@example.com')) {
		const demoUser: LocalStorageUser = {
			id: 'demo_user_1',
			email: 'demo@example.com',
			password: 'password123',
			nickname: '데모유저',
			username: '데모유저',
			isLogin: false,
			createdAt: '2024-01-01T00:00:00Z'
		};
		
		existingUsers.push(demoUser);
		saveUsers(existingUsers);
		console.log('데모 사용자 초기화 완료');
	}
};