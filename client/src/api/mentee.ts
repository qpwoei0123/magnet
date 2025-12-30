import {CreateMenteeParams} from '../types/api';
// import {axiosInstanceWithAuth} from './axiosInstance';

export const createMentee = async (params: CreateMenteeParams) => {
	try {
		// Mock: 멘티 생성
		const memberId = sessionStorage.getItem('memberId');
		if (!memberId) throw new Error('로그인이 필요합니다.');
		
		console.log('Mock Create Mentee:', params);
		// In a real static demo, just return success
		return { success: true };
	} catch (error) {
		console.error('멘티 생성 실패', error);
	}
};

export const getMenteeList = async (mentoringId: number) => {
	try {
		// Mock: mentoringId로 멘티 리스트 조회
		console.log(`Mock Get Mentee List for mentoringId: ${mentoringId}`);
		return [];
	} catch (error) {
		console.error('멘티 리스트 불러오기 실패', error);
	}
};
