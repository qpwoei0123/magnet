import {CategoryButtons} from '../../component/category-button/CategoryButtons';
import MentorCard from '../../component/MentorCard';
import Pagination from '../../component/pagenation/Pagenation';
import {useMentoringList} from './useMentoringList';
import {LoadingErrorWrapper} from '../../component/loading-error/loadingErrorWrapper';

const MentoringListPage = () => {
	const {pageInfo, categoryInfo, mentoringList, status, refetch} = useMentoringList();

	return (
		<section className="flexCol rootPageSection items-center gap-10 py-10 sm:px-10">
			<CategoryButtons {...categoryInfo} />
			<LoadingErrorWrapper {...status} refetch={refetch}>
				{mentoringList.length === 0 ? (
					<EmptySpace />
				) : (
					<>
						<div className="flexCenter w-full flex-wrap gap-10">
							{mentoringList.map((el, index) => (
								<MentorCard key={index} mentoring={el} />
							))}
						</div>

						<Pagination {...pageInfo} />
					</>
				)}
			</LoadingErrorWrapper>
		</section>
	);
};

export default MentoringListPage;

const EmptySpace = () => {
	return (
		<div className="flexCol mt-20 items-center gap-2 text-secondary">
			<i className="ri-ghost-line ri-2x animate-pulse "></i>
			<p className="textBase animate-fadeIn transition-opacity delay-300">
				앗! 여기는 빈 공간이에요...
			</p>
		</div>
	);
};
