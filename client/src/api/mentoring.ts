import axiosInstance, {axiosInstanceWithAuth} from './axiosInstance';
import {
	CreateMentoringParams,
	GetMentoringResponse,
	GetMentoringListParams,
	GetMentoringListResponse,
} from '../types/api/mentoring';

export const createMentoring = async (params: CreateMentoringParams) => {
	try {
		await axiosInstanceWithAuth.post(`/mentoring/create`, params);
	} catch (error) {
		console.error('멘토링 생성 실페', error);
	}
};

export const getMentoring = async (mentoringId: number): Promise<GetMentoringResponse> => {
	try {
		const {data} = await axiosInstance.get(`/mentoring/get/${mentoringId}`);
		// 세션 스토리지 저장방식 (임시)
		sessionStorage.setItem('mentoringId', data.mentoringId.toString());
		sessionStorage.setItem('schedule', data.period);
		sessionStorage.setItem('amount', data.pay);
		return data;
	} catch (error) {
		console.error('멘토링 가져오기 실페', error);
		throw error;
	}
};

export const getMentoringList = async (
	params: GetMentoringListParams,
): Promise<GetMentoringListResponse> => {
	try {
		const url = getMentoringListURLGenerator(params);
		const {data} = await axiosInstance.get(url);
		return data;
	} catch (err) {
		console.error('멘토링리스트 가져오기 실페', err);
		throw err;
	}
};
const getMentoringListURLGenerator = ({offset, size}: GetMentoringListParams) => {
	return `/mentoring/list?page=${offset}&size=${size}`;
};
