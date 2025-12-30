import { Mentor } from '../types';
import { CreateMentorParams, GetMentorListResponse, GetMentorListParams } from '../types/api';
import db from '../db.json';

// Helper to delay response for realistic feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createMentor = async (params: CreateMentorParams) => {
	await delay(500);
	const memberId = sessionStorage.getItem('memberId');
	if (!memberId) {
		throw new Error('User is not logged in.');
	}

	const newMentor = {
		mentorId: db.mentors.length + 1,
		memberId: parseInt(memberId, 10),
		...params,
		mentoringDtoList: [], // Start with no mentoring sessions
	};

	// Note: This won't persist.
	db.mentors.push(newMentor as any);
	console.log('Mock Create Mentor:', newMentor);
	return;
};

export const getMentor = async (): Promise<Mentor> => {
	await delay(300);
	const memberId = sessionStorage.getItem('memberId');

	// Try to find a mentor profile linked to the current user
	// Note: db.json doesn't link mentors to members, so we'll simulate it.
	// For this demo, let's just return a specific mentor, e.g., the first one.
	let mentor = db.mentors.find(m => m.mentorId === (memberId ? parseInt(memberId, 10) : -1));

	if (!mentor) {
		// If no mentor is associated, return the first as a default for demo purposes.
		mentor = db.mentors[0];
	}

	if (!mentor) {
		throw new Error('No mentors found in the database.');
	}

	// The 'Mentor' type from '../types/index.ts' includes `mentoringDtoList`
	return mentor as unknown as Mentor;
};

export const getMentorList = async (
	params: GetMentorListParams,
): Promise<GetMentorListResponse> => {
	await delay(500);
	const { offset, size } = params;
	const allMentors = db.mentors;

	// Flatten the mentor data with their first mentoring session for the list view
	const content = allMentors.map(m => {
		const firstMentoring =
			m.mentoringDtoList && m.mentoringDtoList.length > 0 ? m.mentoringDtoList[0] : null;
		return {
			mentorId: m.mentorId,
			mentorName: m.mentorName,
			career: m.career,
			field: m.field,
			task: m.task,
			email: m.email,
			phone: m.phone,
			aboutMe: m.aboutMe,
			github: m.github,
			// Flattened mentoring fields for the list card
			mentoringId: firstMentoring?.id || 0,
			mentoringTitle: firstMentoring?.title || '멘토링 없음',
			mentoringContent: firstMentoring?.content || '',
			mentoringPay: firstMentoring?.pay || '',
			mentoringPeriod: firstMentoring?.period || '',
			mentoringParticipants: firstMentoring?.participants || 0,
			mentoringCategory: firstMentoring?.category || '',
		};
	});

	const totalElements = content.length;
	const totalPages = Math.ceil(totalElements / size);
	const startIndex = offset * size;
	const endIndex = startIndex + size;
	const pageData = content.slice(startIndex, endIndex);

	const mockResponse: GetMentorListResponse = {
		content: pageData,
		pageable: {
			pageNumber: offset,
			pageSize: size,
			sort: { empty: true, sorted: false, unsorted: true },
			offset: startIndex,
			unpaged: false,
			paged: true,
		},
		last: offset >= totalPages - 1,
		totalPages: totalPages,
		totalElements: totalElements,
		size: size,
		number: offset,
		sort: { empty: true, sorted: false, unsorted: true },
		first: offset === 0,
		numberOfElements: pageData.length,
		empty: pageData.length === 0,
	};

	return mockResponse;
};
