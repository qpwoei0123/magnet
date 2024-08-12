import {GetMemberResponse} from '../types/api';
import {create} from 'zustand';

type useStoreProps = {
	globalMember: GetMemberResponse | null;
	setGlobalMember: (member: GetMemberResponse) => void;
	resetGlobalMember: () => void;
};

export const MemberStore = create<useStoreProps>()(set => ({
	globalMember: null,
	setGlobalMember: globalMember => set({globalMember}),
	resetGlobalMember: () =>
		set({
			globalMember: null,
		}),
}));
