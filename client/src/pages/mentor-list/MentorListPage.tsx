import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import MentorCard from '../../component/MentorCard';
import {LoadingContainer} from '../../component/common/LoadingContainer';
import {getMentoringList} from '../../api/mentoring';
import {Content} from '../../types/api/mentoring';
import {categories} from '../../asset/categories';
import Pagination from './Pagination';

const MentoringListPage = () => {
	const [loading, setLoading] = useState(true);
	const [category, setCategory] = useState('ALL');
	const [mentoringList, setMentoringList] = useState<Content[]>([]);
	const [totalPages, setTotalPages] = useState(0);
	const [size] = useState(10);

	const location = useLocation();

	// 현재 페이지를 URL 파라미터로부터 가져옴
	const currentPage = Number(new URLSearchParams(location.search).get('page') || 1);

	const newCategories = [{id: 'ALL', title: '전체', icon: 'menu-line'}].concat(categories);
	const filteredMentoringList = mentoringList.filter(
		el => el.category === category || category === 'ALL',
	);

	useEffect(() => {
		const fetchMentoringList = async () => {
			try {
				const data = await getMentoringList({offset: currentPage, size});
				setMentoringList(data.content);
				setTotalPages(data.totalPages);
				console.log(data);
			} catch (error) {
				console.error('멘토 리스트를 불러오는 동안 오류가 발생했습니다:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchMentoringList();
	}, [currentPage, size]);

	return (
		<section className="flexCol rootPageSection items-center gap-10 py-10 sm:px-10">
			<div className="flexCenter animate-fadeInMoveDown flex-wrap">
				{newCategories.map((el, index) => (
					<button
						key={index}
						onClick={() => setCategory(el.id)}
						className={`${
							category === el.id && 'text-additional3'
						}   activeStyle flexCenter h-16 min-w-24 flex-col hover:text-additional3 `}
					>
						<i className={`ri-${el.icon} ri-2x ${category === el.id && 'animate-jelly'}`} />
						<p className="text-2xs">{el.title}</p>
					</button>
				))}
			</div>
			{loading ? (
				<LoadingContainer />
			) : filteredMentoringList.length === 0 ? (
				<div className="flexCol mt-20  items-center gap-2 text-secondary">
					<i className="ri-ghost-line ri-2x animate-pulse "></i>
					<p className="textBase animate-fadeIn transition-opacity delay-300">
						앗! 여기는 빈 공간이에요...
					</p>
				</div>
			) : (
				<>
					<div className="flexCenter w-full flex-wrap gap-10">
						{filteredMentoringList.map((el, index) => (
							<MentorCard key={index} mentoring={el} />
						))}
					</div>
					<Pagination currentPage={Number(currentPage)} totalPages={totalPages} />
				</>
			)}
		</section>
	);
};

export default MentoringListPage;
