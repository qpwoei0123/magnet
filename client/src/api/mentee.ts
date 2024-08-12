import {CreateMenteeParams} from '../types/api';
import {axiosInstanceWithAuth} from './axiosInstance';

export const createMentee = async (params: CreateMenteeParams) => {
	const {data} = await axiosInstanceWithAuth.post(`/mentee/create`, params);
	return data;
};

export const getMenteeList = async (mentoringId: number) => {
	const {data} = await axiosInstanceWithAuth.get(`/mentee/list/${mentoringId}`);
	return data;
};
