import axiosInstance, {axiosInstanceWithAuth} from './axiosInstance';
import {
	CreateMentoringParams,
	GetMentoringResponse,
	GetMentoringListParams,
	GetMentoringListResponse,
} from '../types/api/mentoring';

export const createMentoring = async (params: CreateMentoringParams) => {
	try {
		// Mock: 멘토링 생성
		const mentorId = sessionStorage.getItem('mentorId') || '1';
		const newMentoring = {
			...params,
			mentorId: parseInt(mentorId),
			status: 'active'
		};
		await axiosInstanceWithAuth.post(`/mentorings`, newMentoring);
	} catch (error) {
		console.error('멘토링 생성 실페', error);
	}
};

export const getMentoring = async (mentoringId: number): Promise<GetMentoringResponse> => {
	try {
		// Mock: mentoringId로 멘토링 조회
		const {data} = await axiosInstance.get(`/mentorings/${mentoringId}`);
		// 세션 스토리지 저장방식 (임시)
		sessionStorage.setItem('mentoringId', data.mentoringId.toString());
		sessionStorage.setItem('schedule', data.period);
		sessionStorage.setItem('amount', data.pay);
		return data;
	} catch (error) {
		console.error('멘토링 가져오기 실페', error);
		throw error;
	}
};

export const getMentoringList = async (
	params: GetMentoringListParams,
): Promise<GetMentoringListResponse> => {
	try {
		const url = getMentoringListURLGenerator(params);
		const {data} = await axiosInstance.get(url);
		
		// Mock: 클라이언트 사이드에서 페이지네이션 처리
		const allData = data || [];
		const totalElements = allData.length;
		const totalPages = Math.ceil(totalElements / params.size);
		const startIndex = params.offset * params.size;
		const endIndex = startIndex + params.size;
		const pageData = allData.slice(startIndex, endIndex);
		
		const mockResponse: GetMentoringListResponse = {
			content: pageData,
			pageable: {
				pageNumber: params.offset,
				pageSize: params.size,
				sort: { empty: true, sorted: false, unsorted: true },
				offset: startIndex,
				unpaged: false,
				paged: true
			},
			last: params.offset >= totalPages - 1,
			totalPages: totalPages,
			totalElements: totalElements,
			size: params.size,
			number: params.offset,
			sort: { empty: true, sorted: false, unsorted: true },
			first: params.offset === 0,
			numberOfElements: pageData.length,
			empty: pageData.length === 0
		};
		
		return mockResponse;
	} catch (err) {
		console.error('멘토링리스트 가져오기 실패', err);
		throw err;
	}
};
const getMentoringListURLGenerator = ({offset, size}: GetMentoringListParams) => {
	// Mock: JSON Server는 _page와 _limit 사용
	// 모든 데이터를 가져와서 클라이언트에서 페이지네이션 처리
	return `/mentorings`;
};
