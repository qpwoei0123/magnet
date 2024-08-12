import {axiosInstanceWithAuth} from './axiosInstance';
import {MemberStore} from '../store/MemberStore';
import {UpdateMemberParams, GetMemberResponse} from '../types/api';

export const getMember = async (): Promise<GetMemberResponse> => {
	const {data} = await axiosInstanceWithAuth.get('/member/get');
	const setGlobalMember = MemberStore.getState().setGlobalMember;

	setGlobalMember(data);

	return data;
};

export const deleteMember = async () => {
	await axiosInstanceWithAuth.delete('/member/delete');
};

export const updateMember = async (params: UpdateMemberParams) => {
	await axiosInstanceWithAuth.patch('/member/update', params);
};
