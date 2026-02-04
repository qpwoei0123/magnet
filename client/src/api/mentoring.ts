import {
	CreateMentoringParams,
	GetMentoringResponse,
	GetMentoringListParams,
	GetMentoringListResponse,
	Content,
} from '../types/api/mentoring';
import { db } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createMentoring = async (params: CreateMentoringParams) => {
	await delay(500);
	return;
};

export const getMentoring = async (mentoringId: number): Promise<GetMentoringResponse> => {
	await delay(300);

	const mentoring = db.mentorings.find(m => m.mentoringId === mentoringId);
	if (!mentoring) throw new Error('Mentoring not found');

	const mentor = db.mentors.find(m => m.mentorId === mentoring.mentorId);

	const result: GetMentoringResponse = {
		...mentoring,
		career: mentoring.career || mentor?.career || '시니어',
		field: mentoring.field || mentor?.field || mentoring.category,
		task: mentoring.task || mentor?.task || '',
		email: mentor?.email || 'demo@example.com',
		phone: mentor?.phone || '010-0000-0000',
		aboutMe: mentoring.aboutMe || mentor?.aboutMe || '자기소개가 없습니다.',
		github: mentor?.github || '',
		mentorName: mentor?.mentorName || mentoring.mentorName || '알 수 없음',
	};

	sessionStorage.setItem('mentoringId', result.mentoringId.toString());
	sessionStorage.setItem('schedule', result.period);
	sessionStorage.setItem('amount', result.pay);

	return result;
};

export const getMentoringList = async (
	params: GetMentoringListParams,
): Promise<GetMentoringListResponse> => {
	await delay(500);

	const allData: Content[] = db.mentorings.map(mentoring => {
		const mentor = db.mentors.find(m => m.mentorId === mentoring.mentorId);
		return {
			...mentoring,
			mentorName: mentor?.mentorName || mentoring.mentorName || 'Unknown',
			aboutMe: mentoring.aboutMe || mentor?.aboutMe || '',
			field: mentoring.field || mentor?.field || '',
			task: mentoring.task || mentor?.task || '',
			career: mentoring.career || mentor?.career || '',
		};
	});

	return {
		content: allData,
		pageable: {
			pageNumber: 0,
			pageSize: allData.length,
			sort: { empty: true, sorted: false, unsorted: true },
			offset: 0,
			unpaged: true,
			paged: false
		},
		last: true,
		totalPages: 1,
		totalElements: allData.length,
		size: allData.length,
		number: 0,
		sort: { empty: true, sorted: false, unsorted: true },
		first: true,
		numberOfElements: allData.length,
		empty: allData.length === 0
	};
};
