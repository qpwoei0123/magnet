import {CreateMenteeParams} from '../types/api';
import {axiosInstanceWithAuth} from './axiosInstance';

export const createMentee = async (params: CreateMenteeParams) => {
	try {
		// Mock: 멘티 생성
		const memberId = sessionStorage.getItem('memberId');
		if (!memberId) throw new Error('로그인이 필요합니다.');
		
		const newMentee = {
			...params,
			memberId: parseInt(memberId)
		};
		const {data} = await axiosInstanceWithAuth.post(`/mentees`, newMentee);
		return data;
	} catch (error) {
		console.error('멘티 생성 실패', error);
	}
};

export const getMenteeList = async (mentoringId: number) => {
	try {
		// Mock: mentoringId로 멘티 리스트 조회
		const {data} = await axiosInstanceWithAuth.get(`/mentees?mentoringId=${mentoringId}`);
		return data;
	} catch (error) {
		console.error('멘티 리스트 불러오기 실패', error);
	}
};
