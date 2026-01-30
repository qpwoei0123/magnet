import { Mentor } from '../types';
import { CreateMentorParams, GetMentorListResponse, GetMentorListParams } from '../types/api';
import { db } from './mockData';
import { MentoringDto } from '../types/mentoring';

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
		mentoringDtoList: [], // This is dynamically generated in getMentor, so it's fine to keep here for the shape
	};

	// Note: This won't persist.
	(db.mentors as any[]).push(newMentor);
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
	const mentorProfile = db.mentors.find(m => m.memberId === parsedMemberId);

	if (!mentorProfile) {
		throw new Error('Mentor profile not found for the current user.');
	}

	// Dynamically find all mentorings for this mentor from the single source of truth
	const mentoringsForMentor = db.mentorings.filter(m => m.mentorId === mentorProfile.mentorId);

	const result: Mentor = {
		...mentorProfile,
		mentoringDtoList: mentoringsForMentor.map(
			m =>
				({
					id: m.mentoringId,
					title: m.title,
					content: m.content,
					pay: m.pay,
					period: m.period,
					participants: m.participants,
					category: m.category,
				} as MentoringDto),
		),
	};

	return result;
};

export const getMentorList = async (
	params: GetMentorListParams,
): Promise<GetMentorListResponse> => {
	await delay(500);
	const { offset, size } = params;
	const allMentors = db.mentors;

	// Flatten the mentor data with their first mentoring session for the list view
	const content = allMentors.map(m => {
		// Find the first mentoring session from the single source of truth
		const firstMentoring = db.mentorings.find(mentoring => mentoring.mentorId === m.mentorId);

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
			mentoringId: firstMentoring?.mentoringId || 0,
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
