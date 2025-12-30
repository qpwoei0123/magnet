import {Mentor} from '../types';
import {CreateMentorParams, GetMentorListResponse, GetMentorListParams} from '../types/api';
// import {axiosInstanceWithAuth, axiosInstance} from './axiosInstance';
import db from '../../db.json';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createMentor = async (params: CreateMentorParams) => {
	await delay(500);
	try {
		// Mock: 멘토 생성
		const memberId = sessionStorage.getItem('memberId');
		if (!memberId) throw new Error('로그인이 필요합니다.');
		
		console.log('Mock Create Mentor:', params);
		return;
	} catch (error) {
		console.error('멘토 생성 실패', error);
	}
};

export const getMentor = async (): Promise<Mentor> => {
	await delay(300);
	try {
		// Mock: 현재 로그인한 사용자의 멘토 정보 조회
		const memberId = sessionStorage.getItem('memberId');
		// if (!memberId) throw new Error('로그인이 필요합니다.');
		
		// Always return the first mentor as demo
		const mentor = db.mentors[0];
		if (!mentor) throw new Error('Mentor not found');

		// Ensure types match
		// Mentor type requires mentoringDtoList
		return mentor as unknown as Mentor;
	} catch (error) {
		console.error('멘토 불러오기 실패', error);
		throw error;
	}
};

export const getMentorList = async (params: GetMentorListParams): Promise<GetMentorListResponse> => {
	await delay(500);
	try {
		const data = db.mentors;

        // Transform Mentor to Content (flattened structure expected by GetMentorListResponse)
        // The type definition expects `mentoringId`, `mentoringTitle` etc. in the list item
        // which implies the list view might show mentors *with* a representative mentoring, or just flattened fields?
        // Let's assume we take the first mentoring from the list
        const content = data.map(m => {
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
                mentoringTitle: firstMentoring?.title || '',
                mentoringContent: firstMentoring?.content || '',
                mentoringPay: firstMentoring?.pay || '',
                mentoringPeriod: firstMentoring?.period || '',
                mentoringParticipants: firstMentoring?.participants || 0,
                mentoringCategory: firstMentoring?.category || ''
            };
        });
		
		// Mock: JSON Server 응답을 백엔드 API 형태로 변환
		const mockResponse: GetMentorListResponse = {
			content: content,
			pageable: {
				pageNumber: params.offset,
				pageSize: params.size,
				sort: { empty: true, sorted: false, unsorted: true },
				offset: params.offset * params.size,
				unpaged: false,
				paged: true
			},
			last: data.length < params.size,
			totalPages: Math.ceil((data?.length || 0) / params.size) || 1,
			totalElements: data?.length || 0,
			size: params.size,
			number: params.offset,
			sort: { empty: true, sorted: false, unsorted: true },
			first: params.offset === 0,
			numberOfElements: data?.length || 0,
			empty: !data || data.length === 0
		};
		
		return mockResponse;
	} catch (error) {
		console.error('멘토 리스트 불러오기 실패', error);
		throw error;
	}
};
