import {useState, useEffect, useCallback, useMemo} from 'react';
import {getMentoringList} from '../../api/mentoring';
import {Content} from '../../types/api/mentoring';

export const useMentoringList = () => {
	const [selectedCategory, setSelectedCategory] = useState('ALL');
	const [allMentoringList, setAllMentoringList] = useState<Content[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [size] = useState(6); // 페이지당 6개로 설정
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	// 카테고리 필터링된 데이터
	const filteredMentoringList = useMemo(
		() =>
			selectedCategory === 'ALL'
				? allMentoringList
				: allMentoringList.filter(el => el.category === selectedCategory),
		[allMentoringList, selectedCategory],
	);

	// 페이지네이션된 데이터
	const paginatedMentoringList = useMemo(() => {
		const startIndex = (currentPage - 1) * size;
		const endIndex = startIndex + size;
		return filteredMentoringList.slice(startIndex, endIndex);
	}, [filteredMentoringList, currentPage, size]);

	// 페이지 수 계산
	const calculatedTotalPages = useMemo(() => {
		return Math.ceil(filteredMentoringList.length / size);
	}, [filteredMentoringList.length, size]);

	const fetchMentoringList = useCallback(async () => {
		setIsLoading(true);
		setIsError(false);
		try {
			// 모든 데이터를 가져옴 (클라이언트 사이드에서 필터링/페이지네이션)
			const data = await getMentoringList({offset: 0, size: 1000}); // 대량 데이터 가져오기
			
			// 0.5~1.5초 랜덤 로딩 시간 (리스트 로딩용)
			const randomDelay = Math.random() * 1000 + 500; // 500-1500ms
			
			setTimeout(() => {
				// 안전하게 데이터 처리
				setAllMentoringList(data?.content || []);
				setIsLoading(false);
			}, randomDelay);
			
		} catch (error) {
			console.error('멘토링 리스트 로드 실패:', error);
			setIsError(true);
			setIsLoading(false);
			// 에러 시 빈 배열로 초기화
			setAllMentoringList([]);
		}
	}, []);

	// 카테고리 변경 시 페이지를 1로 리셋
	useEffect(() => {
		setCurrentPage(1);
	}, [selectedCategory]);

	// 필터링된 데이터 길이 변경 시 페이지 수 업데이트
	useEffect(() => {
		setTotalPages(calculatedTotalPages);
		// 현재 페이지가 총 페이지를 초과하면 마지막 페이지로 이동
		if (currentPage > calculatedTotalPages && calculatedTotalPages > 0) {
			setCurrentPage(calculatedTotalPages);
		}
	}, [calculatedTotalPages, currentPage]);

	useEffect(() => {
		fetchMentoringList();
	}, [fetchMentoringList]);

	return {
		categoryInfo: {
			selectedCategory,
			setSelectedCategory,
		},
		pageInfo: {
			currentPage,
			setCurrentPage,
			totalPages,
		},
		status: {
			isLoading,
			isError,
		},
		refetch: fetchMentoringList,
		mentoringList: paginatedMentoringList,
		totalCount: filteredMentoringList.length,
	};
};
