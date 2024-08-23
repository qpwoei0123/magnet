import {getRandomQuote} from '../../utils/common/getRandomQuote';

export const LoadingContainer = () => {
	const index = getRandomQuote();
	return (
		<section className="flexCenterCol min-h-40 animate-fadeIn text-secondary">
			<i className="ri-loader-line ri-3x animate-spin" />
			<p className="textSmall animate-fadeIn font-semibold">{index}</p>
		</section>
	);
};
