import { Mentor } from '../types';
import { CreateMentorParams, GetMentorListResponse, GetMentorListParams } from '../types/api';
import { db } from './mockData';

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

	const allMentors = db.mentors;

	const content = allMentors.map(m => {
		const mentoring = db.mentorings.find(mentoring => mentoring.mentorId === m.mentorId);
		return {
			mentorId: m.mentorId,
			mentorName: m.nickname,
			aboutMe: '자기소개입니다.',
			company: mentoring?.company || '',
			career: (mentoring?.career || 0).toString(),
			field: (mentoring?.field || []).join(', '),
			task: (mentoring?.task || []).join(', '),
			pay: mentoring?.amount || 0,
			period: '3개월',
			mentoringCount: 1,
			menteeCount: 1,
			email: m.email,
			phone: m.phone,
			github: '',
			mentoringId: mentoring?.mentoringId || 0,
			mentoringTitle: mentoring?.title || '멘토링 없음',
			mentoringContent: mentoring?.content || '',
			mentoringPay: (mentoring?.amount || 0).toString(),
			mentoringPeriod: '3개월',
			mentoringParticipants: mentoring?.numberOfPeople || 0,
			mentoringCategory: mentoring?.category || '',
		};
	});

	const totalElements = allMentors.length;
	const { offset, size } = params;
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
