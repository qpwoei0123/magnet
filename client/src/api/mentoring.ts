import axiosInstance, {axiosInstanceWithAuth} from './axiosInstance';
import {
	CreateMentoringParams,
	GetMentoringResponse,
	GetMentoringListParams,
	GetMentoringListResponse,
} from '../types/api/mentoring';

export const createMentoring = async (params: CreateMentoringParams) => {
	await axiosInstanceWithAuth.post(`/mentoring/create`, params);
};

export const getMentoring = async (mentoringId: number): Promise<GetMentoringResponse> => {
	const {data} = await axiosInstance.get(`/mentoring/get/${mentoringId}`);

	// 세션 스토리지 저장방식 (임시)
	sessionStorage.setItem('mentoringId', data.mentoringId.toString());
	sessionStorage.setItem('schedule', data.period);
	sessionStorage.setItem('amount', data.pay);
	return data;
};

export const getMentoringList = async (
	params: GetMentoringListParams,
): Promise<GetMentoringListResponse> => {
	const url = getMentoringListURLGenerator(params);
	const {data} = await axiosInstance.get(url);
	return data;
};
const getMentoringListURLGenerator = ({offset, size}: GetMentoringListParams) => {
	return `/mentoring/list?page=${offset}&size=${size}`;
};
