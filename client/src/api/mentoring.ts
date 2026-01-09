import {
	CreateMentoringParams,
	GetMentoringResponse,
	GetMentoringListParams,
	GetMentoringListResponse,
	Content,
} from '../types/api/mentoring';
import { mockData } from './mockData';

// Helper to delay response for realistic feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createMentoring = async (params: CreateMentoringParams) => {
	await delay(500);
	console.log('Mock Create Mentoring:', params);
	// In a real static demo, we can't persist this permanently,
	// but we could theoretically update a local state or just return success.
	return;
};

export const getMentoring = async (mentoringId: number): Promise<GetMentoringResponse> => {
	await delay(300);

	const mentoring = mockData.mentorings.find(m => m.mentoringId === mentoringId);
	if (!mentoring) {
		throw new Error('Mentoring not found');
	}

	// Join with Mentor data to get missing fields
	const mentor = mockData.mentors.find(m => m.mentorId === mentoring.mentorId);

	// Construct the full response merging mentoring and mentor data
	const result: GetMentoringResponse = {
		...mentoring,
		// Ensure fields from mentor are present if missing in mentoring
		career: mentoring.career || mentor?.career || '시니어',
		field: mentoring.field || mentor?.field || mentoring.category,
		task: mentoring.task || mentor?.task || '',
		email: mentor?.email || 'demo@example.com',
		phone: mentor?.phone || '010-0000-0000',
		aboutMe: mentoring.aboutMe || mentor?.aboutMe || '자기소개가 없습니다.',
		github: mentor?.github || '',
		mentorName: mentor?.mentorName || mentoring.mentorName || '알 수 없음',
	};

	// Side effects from original code
	sessionStorage.setItem('mentoringId', result.mentoringId.toString());
	sessionStorage.setItem('schedule', result.period);
	sessionStorage.setItem('amount', result.pay);

	return result;
};

export const getMentoringList = async (
	params: GetMentoringListParams,
): Promise<GetMentoringListResponse> => {
	await delay(500);

	// Join all mentorings with their mentor names for the list view
	// The `Content` type in `GetMentoringListResponse` needs `mentorName`
	const allData: Content[] = mockData.mentorings.map(mentoring => {
		const mentor = mockData.mentors.find(m => m.mentorId === mentoring.mentorId);
		return {
			...mentoring,
			mentorName: mentor?.mentorName || mentoring.mentorName || 'Unknown',
			aboutMe: mentoring.aboutMe || mentor?.aboutMe || '',
			field: mentoring.field || mentor?.field || '',
			task: mentoring.task || mentor?.task || '',
			career: mentoring.career || mentor?.career || '',
		};
	});

	const totalElements = allData.length;

	const mockResponse: GetMentoringListResponse = {
		content: allData, // Return all data
		pageable: {
			pageNumber: 0,
			pageSize: totalElements,
			sort: { empty: true, sorted: false, unsorted: true },
			offset: 0,
			unpaged: true,
			paged: false
		},
		last: true,
		totalPages: 1,
		totalElements: totalElements,
		size: totalElements,
		number: 0,
		sort: { empty: true, sorted: false, unsorted: true },
		first: true,
		numberOfElements: totalElements,
		empty: totalElements === 0
	};

	return mockResponse;
};
