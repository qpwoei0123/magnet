import { Mentor } from '../types';
import { CreateMentorParams, GetMentorListResponse, GetMentorListParams } from '../types/api';
import { db } from './mockData';

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
	if (!memberId) {
		throw new Error('User is not logged in.');
	}

	const parsedMemberId = parseInt(memberId, 10);
	const mentor = db.mentors.find(m => m.memberId === parsedMemberId);

	if (!mentor) {
		throw new Error('Mentor profile not found for the current user.');
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

	// Join mentor data with their corresponding mentoring sessions
	const content = db.mentorings.map(mentoring => {
		const mentor = db.mentors.find(m => m.mentorId === mentoring.mentorId);
		return {
			mentorId: mentor?.mentorId || 0,
			mentorName: mentor?.mentorName || 'Unknown Mentor',
			career: mentor?.career || '',
			field: mentor?.field || '',
			task: mentor?.task || '',
			email: mentor?.email || '',
			phone: mentor?.phone || '',
			aboutMe: mentor?.aboutMe || '',
			github: mentor?.github || '',
			mentoringId: mentoring.mentoringId,
			mentoringTitle: mentoring.title,
			mentoringContent: mentoring.content,
			mentoringPay: mentoring.pay,
			mentoringPeriod: mentoring.period,
			mentoringParticipants: mentoring.participants,
			mentoringCategory: mentoring.category,
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
