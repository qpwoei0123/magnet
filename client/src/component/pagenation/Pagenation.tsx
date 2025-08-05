import {useNavigate} from 'react-router-dom';

type PaginationParams = {
	currentPage: number;
	totalPages: number;
	setCurrentPage?: (page: number) => void;
};

const Pagenation = ({currentPage, totalPages, setCurrentPage}: PaginationParams) => {
	const history = useNavigate();

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			const newPage = currentPage - 1;
			if (setCurrentPage) {
				setCurrentPage(newPage);
			} else {
				history(`?page=${newPage}`);
			}
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			const newPage = currentPage + 1;
			if (setCurrentPage) {
				setCurrentPage(newPage);
			} else {
				history(`?page=${newPage}`);
			}
		}
	};

	return (
		<div className="flexCenter textSmall mt-4">
			<button
				onClick={handlePreviousPage}
				disabled={currentPage === 1}
				className="activeStyle border font-semibold disabled:hover:text-slate-400"
			>
				이전
			</button>
			<p className="textBase px-4 py-2 font-semibold text-gray-700">
				{currentPage} / {totalPages || 1}
			</p>
			<button
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
				className="activeStyle border font-semibold disabled:hover:text-slate-400"
			>
				다음
			</button>
		</div>
	);
};

export default Pagenation;
