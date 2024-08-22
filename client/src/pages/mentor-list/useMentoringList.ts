import {useState, useEffect} from 'react';
import {getMentoringList} from '../../api/mentoring';
import {categories} from '../../asset/categories';
import {Content} from '../../types/api/mentoring';

export const useMentoringList = () => {
	const [category, setCategory] = useState('ALL');
	const [mentoringList, setMentoringList] = useState<Content[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [size] = useState(10);

	const newCategories = [{id: 'ALL', title: '전체', icon: 'menu-line'}].concat(categories);

	useEffect(() => {
		const fetchMentoringList = async () => {
			const data = await getMentoringList({offset: currentPage, size});
			setMentoringList(data.content);
			setTotalPages(data.totalPages);
		};
		fetchMentoringList();
	}, [currentPage, size, category]);

	const filteredMentoringList = mentoringList.filter(
		el => el.category === category || category === 'ALL',
	);

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
		setCurrentPage,
		filteredMentoringList,
	};
};
