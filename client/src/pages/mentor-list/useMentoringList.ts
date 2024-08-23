import {useState, useEffect, useCallback, useMemo} from 'react';
import {getMentoringList} from '../../api/mentoring';
import {Content} from '../../types/api/mentoring';

export const useMentoringList = () => {
	const [selectedCategory, setSelectedCategory] = useState('ALL');
	const [mentoringList, setMentoringList] = useState<Content[]>([]);
	const [currentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [size] = useState(10);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const filteredMentoringList = useMemo(
		() =>
			selectedCategory === 'ALL'
				? mentoringList
				: mentoringList.filter(el => el.category === selectedCategory),
		[mentoringList, selectedCategory],
	);

	const fetchMentoringList = useCallback(async () => {
		setIsLoading(true);
		setIsError(false);
		try {
			const data = await getMentoringList({offset: currentPage, size});
			setMentoringList(data.content);
			setTotalPages(data.totalPages);
		} catch {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}, [currentPage, size]);

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
			totalPages,
		},
		status: {
			isLoading,
			isError,
		},
		refetch: fetchMentoringList,
		mentoringList: filteredMentoringList,
	};
};
