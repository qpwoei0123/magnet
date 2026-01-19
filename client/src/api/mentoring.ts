import {
	CreateMentoringParams,
	GetMentoringResponse,
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
	if (!mentoring) {
		throw new Error('Mentoring not found');
	}

	const mentor = db.mentors.find(m => m.mentorId === mentoring.mentorId);

	const result: GetMentoringResponse = {
		...(mentoring as any),
		career: (mentor?.career || 0).toString(),
		field: (mentor?.field || []).join(', '),
		task: (mentor?.task || []).join(', '),
		email: mentor?.email || 'demo@example.com',
		phone: mentor?.phone || '010-0000-0000',
		aboutMe: '자기소개가 없습니다.',
		github: '',
		mentorName: mentor?.nickname || '알 수 없음',
		pay: mentoring.amount.toString(),
		period: '3개월',
		participants: mentoring.numberOfPeople,
	};

	sessionStorage.setItem('mentoringId', result.mentoringId.toString());
	sessionStorage.setItem('amount', result.pay.toString());

	return result;
};

export const getMentoringList = async (params: any): Promise<GetMentoringListResponse> => {
	await delay(300);
	const { size = 10 } = params;

	let filteredMentorings = db.mentorings.filter(mentoring => {
		if (params.category && params.category !== 'ALL' && mentoring.category !== params.category) {
			return false;
		}
		if (params.keyword) {
			const keyword = params.keyword.toLowerCase();
			const inTitle = mentoring.title.toLowerCase().includes(keyword);
			const inContent = mentoring.content.toLowerCase().includes(keyword);
			if (!inTitle && !inContent) {
				return false;
			}
		}
		return true;
	});

	const content: Content[] = filteredMentorings.map(mentoring => {
		const mentor = db.mentors.find(m => m.mentorId === mentoring.mentorId);
		return {
			mentoringId: mentoring.mentoringId,
			title: mentoring.title,
			content: mentoring.content,
			pay: mentoring.amount.toString(),
			period: '3개월', // Mock data
			participants: mentoring.numberOfPeople,
			category: mentoring.category,
			mentorId: mentoring.mentorId,
			aboutMe: '자기소개가 없습니다.', // Mock data
			field: (mentor?.field || []).join(', '),
			task: (mentor?.task || []).join(', '),
			mentorName: mentor?.nickname || 'Unknown Mentor',
			career: (mentor?.career || 0).toString(),
		};
	});

	const offset = (params.page || 1) - 1;
	const totalElements = content.length;
	const totalPages = Math.ceil(totalElements / size);
	const startIndex = offset * size;
	const endIndex = startIndex + size;
	const pageData = content.slice(startIndex, endIndex);

	const mockResponse: GetMentoringListResponse = {
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
