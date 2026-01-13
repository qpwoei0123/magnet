import { CreateMenteeParams } from '../types/api';
import { MenteeData } from '../types/mentee';
import { mockData } from './mockData';

// Helper to delay response for realistic feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createMentee = async (params: CreateMenteeParams) => {
	await delay(500);
	const memberId = sessionStorage.getItem('memberId');
	if (!memberId) {
		throw new Error('User is not logged in.');
	}

	const newMentee = {
		menteeId: mockData.mentees.length + 1,
		memberId: parseInt(memberId, 10),
		mentoringId: params.mentoringId,
		message: params.message,
		schedule: params.schedule,
		paymentKey: `test_payment_key_${Date.now()}`,
		// Add other details from the mentoring session for context
		...mockData.mentorings.find(m => m.mentoringId === params.mentoringId),
	};

	// Note: This won't persist.
	mockData.mentees.push(newMentee as any);

	console.log('Mock Create Mentee:', newMentee);

	return { success: true, mentee: newMentee };
};

export const getMenteeList = async (mentoringId: number): Promise<MenteeData[]> => {
	await delay(300);

	const mentees = mockData.mentees.filter(mentee => mentee.mentoringId === mentoringId);

	// Join with member data to get mentee name (nickname) and other details
	const populatedMentees = mentees.map(mentee => {
		const member = mockData.members.find(m => m.id === mentee.memberId);
		return {
			...mentee,
			menteeNickName: member?.nickname || `User ${mentee.memberId}`,
			phone: '010-0000-0000', // Mock phone number
		};
	});

	return populatedMentees as unknown as MenteeData[];
};
