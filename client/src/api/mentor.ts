import {Mentor} from '../types';
import {CreateMentorParams, GetMentorListResponse, GetMentorListParams} from '../types/api';
import {axiosInstanceWithAuth, axiosInstance} from './axiosInstance';

export const createMentor = async (params: CreateMentorParams) => {
	await axiosInstanceWithAuth.post(`/mentor/create`, params);
	try {
	} catch (error) {
		console.error('멘토 생성 실패', error);
	}
};

export const getMentor = async (): Promise<Mentor> => {
	try {
		const {data} = await axiosInstanceWithAuth.get(`/mentor/get`);
		return data;
	} catch (error) {
		console.error('멘토 불러오기 실패', error);
		throw error;
	}
};

const getMentorListURLGenerator = ({offset, size}: GetMentorListParams) => {
	return `/mentor/list?offset=${offset}&size=${size}`;
};

export const getMentorList = async (prams: GetMentorListParams): Promise<GetMentorListResponse> => {
	try {
		const url = getMentorListURLGenerator(prams);
		const {data} = await axiosInstance.get(url);
		return data;
	} catch (error) {
		console.error('멘토 리스트 불러오기 실패', error);
		throw error;
	}
};
