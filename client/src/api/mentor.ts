import {Mentor} from '../types';
import {CreateMentorParams, GetMentorListResponse, GetMentorListParams} from '../types/api';
import {axiosInstanceWithAuth, axiosInstance} from './axiosInstance';

export const createMentor = async (params: CreateMentorParams) => {
	try {
		// Mock: 멘토 생성
		const memberId = sessionStorage.getItem('memberId');
		if (!memberId) throw new Error('로그인이 필요합니다.');
		
		const newMentor = {
			...params,
			mentoringDtoList: []
		};
		await axiosInstanceWithAuth.post(`/mentors`, newMentor);
	} catch (error) {
		console.error('멘토 생성 실패', error);
	}
};

export const getMentor = async (): Promise<Mentor> => {
	try {
		// Mock: 현재 로그인한 사용자의 멘토 정보 조회
		const memberId = sessionStorage.getItem('memberId');
		if (!memberId) throw new Error('로그인이 필요합니다.');
		
		// 모킹 환경에서는 첫 번째 멘토 데이터 반환
		const {data} = await axiosInstanceWithAuth.get(`/mentors/1`);
		return data;
	} catch (error) {
		console.error('멘토 불러오기 실패', error);
		throw error;
	}
};

const getMentorListURLGenerator = ({offset, size}: GetMentorListParams) => {
	// Mock: JSON Server는 _page와 _limit 사용
	// 모든 데이터를 가져와서 클라이언트에서 페이지네이션 처리
	return `/mentors`;
};

export const getMentorList = async (params: GetMentorListParams): Promise<GetMentorListResponse> => {
	try {
		const url = getMentorListURLGenerator(params);
		const {data} = await axiosInstance.get(url);
		
		// Mock: JSON Server 응답을 백엔드 API 형태로 변환
		const mockResponse: GetMentorListResponse = {
			content: data || [],
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
