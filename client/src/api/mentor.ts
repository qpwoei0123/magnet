import {Mentor} from '../types';
import {CreateMentorParams, GetMentorListResponse, GetMentorListParams} from '../types/api';
import {axiosInstanceWithAuth, axiosInstance} from './axiosInstance';

export const createMentor = async (params: CreateMentorParams) => {
	await axiosInstanceWithAuth.post(`/mentor/create`, params);
};

export const getMentor = async (): Promise<Mentor> => {
	const {data} = await axiosInstanceWithAuth.get(`/mentor/get`);
	return data;
};

const getMentorListURLGenerator = ({offset, size}: GetMentorListParams) => {
	return `/mentor/list?offset=${offset}&size=${size}`;
};

export const getMentorList = async (prams: GetMentorListParams): Promise<GetMentorListResponse> => {
	const url = getMentorListURLGenerator(prams);
	const {data} = await axiosInstance.get(url);
	return data;
};
