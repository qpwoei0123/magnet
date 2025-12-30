import { MemberStore } from '../store/MemberStore';
import { UpdateMemberParams, GetMemberResponse } from '../types/api';
import db from '../db.json';

// Helper to delay response for realistic feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getMember = async (): Promise<GetMemberResponse> => {
	await delay(300);

	const memberId = sessionStorage.getItem('memberId');
	if (!memberId) {
		throw new Error('User is not logged in.');
	}

	const member = db.members.find(m => m.id === parseInt(memberId, 10));
	if (!member) {
		throw new Error('Member not found');
	}

	const mentorEntry = db.mentors.find(m => m.mentorId === member.id);
	const menteeEntries = db.mentees.filter(m => m.memberId === member.id);

	const roles = ['USER'];
	if (mentorEntry) roles.push('MENTOR');
	if (menteeEntries.length > 0) roles.push('MENTEE');

	// Transform db data to GetMemberResponse type
	const memberData: GetMemberResponse = {
		id: member.id,
		email: member.email,
		nickName: member.nickname,
		username: member.nickname, // Assuming username is same as nickname
		phone: '010-0000-0000', // Mock data
		city: '서울특별시', // Mock data
		street: '강남구', // Mock data
		picture: null,
		memberStatus: 'ACTIVE',
		roles: roles,
		menteeList: menteeEntries.length > 0 ? menteeEntries : null,
		mentorList: mentorEntry ? [mentorEntry] : null,
	};

	// Save to global store
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

	// Note: This won't persist. It just simulates the deletion.
	const userIndex = db.members.findIndex(m => m.id === parseInt(memberId, 10));
	if (userIndex > -1) {
		db.members.splice(userIndex, 1);
		console.log(`Mock: Deleted member with id ${memberId}`);
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

	// Update the in-memory user data
	member.nickname = params.nickName || member.nickname;
	// In a real scenario, you'd update other fields too.
	// For this mock, we just update the nickname.

	console.log('Mock: Updated member:', member);

	// Also update the global store for immediate UI feedback
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
