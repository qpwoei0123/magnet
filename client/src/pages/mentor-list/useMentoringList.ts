import {useState, useEffect, useCallback} from 'react';
import {getMentoringList} from '../../api/mentoring';
import {categories} from '../../asset/categories';
import {Content} from '../../types/api/mentoring';

export const useMentoringList = () => {
	const [category, setCategory] = useState('ALL');
	const [mentoringList, setMentoringList] = useState<Content[]>([]);
	const [currentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [size] = useState(10);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const newCategories = [{id: 'ALL', title: '전체', icon: 'menu-line'}].concat(categories);
	const filteredMentoringList = mentoringList.filter(
		el => el.category === category || category === 'ALL',
	);

	const fetchMentoringList = useCallback(async () => {
		setIsLoading(true);
		setIsError(false);
		try {
			const data = await getMentoringList({offset: currentPage, size});
			setMentoringList(data.content);
			setTotalPages(data.totalPages);
		} catch (e) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}, [currentPage, size]);

	useEffect(() => {
		fetchMentoringList();

		return () => {};
	}, [fetchMentoringList]);

	return {
		categoryInfo: {
			category,
			setCategory,
			newCategories,
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
