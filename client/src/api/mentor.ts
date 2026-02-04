import { Mentor } from '../types';
import { CreateMentorParams, GetMentorListResponse, GetMentorListParams } from '../types/api';
import { db } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createMentor = async (params: CreateMentorParams) => {
	await delay(500);
	const memberId = sessionStorage.getItem('memberId');
	if (!memberId) throw new Error('User is not logged in.');

	const newMentor = {
		mentorId: db.mentors.length + 1,
		memberId: parseInt(memberId, 10),
		...params,
		mentoringDtoList: [],
	};

	db.mentors.push(newMentor as any);
	return;
};

export const getMentor = async (): Promise<Mentor> => {
	await delay(300);
	const memberId = sessionStorage.getItem('memberId');
	if (!memberId) throw new Error('User is not logged in.');

	const mentor = db.mentors.find(m => m.memberId === parseInt(memberId, 10));
	if (!mentor) throw new Error('Mentor profile not found.');

	return mentor as unknown as Mentor;
};

export const getMentorList = async (
	params: GetMentorListParams,
): Promise<GetMentorListResponse> => {
	await delay(500);
	const { offset, size } = params;
	const allMentors = db.mentors;

	const content = allMentors.map(m => {
		const firstMentoring = m.mentoringDtoList && m.mentoringDtoList.length > 0 ? m.mentoringDtoList[0] : null;
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
			mentoringId: firstMentoring?.id || 0,
			mentoringTitle: firstMentoring?.title || '멘토링 없음',
			mentoringContent: firstMentoring?.content || '',
			mentoringPay: firstMentoring?.pay || '',
			mentoringPeriod: firstMentoring?.period || '',
			mentoringParticipants: firstMentoring?.participants || 0,
			mentoringCategory: firstMentoring?.category || '',
		};
	});

	const pageData = content.slice(offset * size, (offset + 1) * size);

	return {
		content: pageData,
		pageable: {
			pageNumber: offset,
			pageSize: size,
			sort: { empty: true, sorted: false, unsorted: true },
			offset: offset * size,
			unpaged: false,
			paged: true,
		},
		last: (offset + 1) * size >= content.length,
		totalPages: Math.ceil(content.length / size),
		totalElements: content.length,
		size: size,
		number: offset,
		sort: { empty: true, sorted: false, unsorted: true },
		first: offset === 0,
		numberOfElements: pageData.length,
		empty: pageData.length === 0,
	};
};
