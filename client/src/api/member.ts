import {axiosInstanceWithAuth} from './axiosInstance';
import {MemberStore} from '../store/MemberStore';
import {UpdateMemberParams, GetMemberResponse} from '../types/api';
import {getCurrentUser, updateUser, getAllUsers} from '../utils/auth/localStorageAuth';

export const getMember = async (): Promise<GetMemberResponse> => {
	try {
		// localStorage에서 현재 사용자 정보 가져오기
		const currentUser = getCurrentUser();
		if (!currentUser) {
			throw new Error('로그인이 필요합니다.');
		}

		// GetMemberResponse 형태로 변환
		const memberData: GetMemberResponse = {
			id: parseInt(currentUser.id) || 0,
			email: currentUser.email,
			nickName: currentUser.nickname,
			username: currentUser.username || '',
			phone: currentUser.phone || '',
			city: currentUser.addressDto?.city || '',
			street: currentUser.addressDto?.street || '',
			picture: null,
			memberStatus: 'ACTIVE',
			roles: ['USER'],
			menteeList: null,
			mentorList: null
		};

		// 글로버 스토어에 저장
		const setGlobalMember = MemberStore.getState().setGlobalMember;
		setGlobalMember(memberData);
		
		return memberData;
	} catch (error) {
		console.error('멤버 불러오기 실패', error);
		throw error;
	}
};

export const deleteMember = async () => {
	try {
		// localStorage에서 현재 사용자 삭제
		const currentUser = getCurrentUser();
		if (!currentUser) {
			throw new Error('로그인이 필요합니다.');
		}

		// 사용자 목록에서 제거
		const users = getAllUsers();
		const filteredUsers = users.filter(user => user.id !== currentUser.id);
		localStorage.setItem('magnet_users', JSON.stringify(filteredUsers));
		
		// 현재 사용자 정보 삭제
		localStorage.removeItem('magnet_current_user');
		sessionStorage.clear();
		
		console.log('회원 탈퇴 완료');
	} catch (error) {
		console.error('멤버 삭제 실패', error);
	}
};

export const updateMember = async (params: UpdateMemberParams) => {
	try {
		// localStorage에서 현재 사용자 업데이트
		const currentUser = getCurrentUser();
		if (!currentUser) {
			throw new Error('로그인이 필요합니다.');
		}

		// 사용자 정보 업데이트
		const updateResult = updateUser(currentUser.id, {
			nickname: params.nickName,
			phone: params.phone,
			addressDto: params.addressDto
		});

		if (!updateResult.success) {
			throw new Error(updateResult.message);
		}
		
		console.log('사용자 정보 업데이트 성공:', updateResult.user);
	} catch (error) {
		console.error('멤버 업데이트 실패', error);
		throw error;
	}
};
