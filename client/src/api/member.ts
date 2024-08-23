import {axiosInstanceWithAuth} from './axiosInstance';
import {MemberStore} from '../store/MemberStore';
import {UpdateMemberParams, GetMemberResponse} from '../types/api';

export const getMember = async (): Promise<GetMemberResponse> => {
	try {
		const {data} = await axiosInstanceWithAuth.get('/member/get');
		const setGlobalMember = MemberStore.getState().setGlobalMember;
		setGlobalMember(data);
		return data;
	} catch (error) {
		console.error('멤버 불러오기 실패', error);
		throw error;
	}
};

export const deleteMember = async () => {
	try {
		await axiosInstanceWithAuth.delete('/member/delete');
	} catch (error) {
		console.error('멤버 삭제 실패', error);
	}
};

export const updateMember = async (params: UpdateMemberParams) => {
	try {
		await axiosInstanceWithAuth.patch('/member/update', params);
	} catch (error) {
		console.error('멤버 업데이트 실패', error);
	}
};
