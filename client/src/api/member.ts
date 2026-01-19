import { MemberStore } from '../store/MemberStore';
import { UpdateMemberParams, GetMemberResponse } from '../types/api';
import { db } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getMember = async (): Promise<GetMemberResponse> => {
	await delay(300);

	const memberId = sessionStorage.getItem('memberId');
	if (!memberId) {
		throw new Error('User is not logged in.');
	}

	const parsedMemberId = parseInt(memberId, 10);
	const member = db.members.find(m => m.id === parsedMemberId);
	if (!member) {
		throw new Error('Member not found');
	}

	const mentorProfile = db.mentors.find(m => m.memberId === parsedMemberId);
	const menteeEnrollments = db.mentees.filter(m => m.memberId === parsedMemberId);

	const roles = ['USER'];
	if (mentorProfile) {
		roles.push('MENTOR');
	}
	if (menteeEnrollments.length > 0) {
		roles.push('MENTEE');
	}

	const memberData: GetMemberResponse = {
		id: member.id,
		email: member.email,
		nickName: member.nickname,
		username: member.nickname,
		phone: '010-0000-0000',
		city: '서울특별시',
		street: '강남구',
		picture: null,
		memberStatus: 'ACTIVE',
		roles: roles,
		mentorList: mentorProfile ? ([mentorProfile] as any) : [],
		menteeList: menteeEnrollments as any,
	};

	const setGlobalMember = MemberStore.getState().setGlobalMember;
	setGlobalMember(memberData);

	return memberData;
};

export const deleteMember = async () => {
	await delay(500);
	const memberId = sessionStorage.getItem('memberId');
	if (!memberId) {
		throw new Error('User is not logged in.');
	}

	const userIndex = db.members.findIndex(m => m.id === parseInt(memberId, 10));
	if (userIndex > -1) {
		db.members.splice(userIndex, 1);
	}

	sessionStorage.clear();
};

export const updateMember = async (params: UpdateMemberParams) => {
	await delay(500);
	const memberId = sessionStorage.getItem('memberId');
	if (!memberId) {
		throw new Error('User is not logged in.');
	}

	const member = db.members.find(m => m.id === parseInt(memberId, 10));
	if (!member) {
		throw new Error('Member not found');
	}

	member.nickname = params.nickName || member.nickname;

	const updatedMemberData: GetMemberResponse = {
		id: member.id,
		email: member.email,
		nickName: member.nickname,
		username: member.nickname,
		phone: params.phone || '010-0000-0000',
		city: params.addressDto?.city || '서울특별시',
		street: params.addressDto?.street || '강남구',
		picture: null,
		memberStatus: 'ACTIVE',
		roles: ['USER'],
		menteeList: null,
		mentorList: null,
	};

	const setGlobalMember = MemberStore.getState().setGlobalMember;
	setGlobalMember(updatedMemberData);
};
