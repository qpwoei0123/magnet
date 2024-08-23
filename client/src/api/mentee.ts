import {CreateMenteeParams} from '../types/api';
import {axiosInstanceWithAuth} from './axiosInstance';

export const createMentee = async (params: CreateMenteeParams) => {
	try {
		const {data} = await axiosInstanceWithAuth.post(`/mentee/create`, params);
		return data;
	} catch (error) {
		console.error('멘티 생성 실패', error);
	}
};

export const getMenteeList = async (mentoringId: number) => {
	try {
		const {data} = await axiosInstanceWithAuth.get(`/mentee/list/${mentoringId}`);
		return data;
	} catch (error) {
		console.error('멘티 리스트 불러오기 실패', error);
	}
};
