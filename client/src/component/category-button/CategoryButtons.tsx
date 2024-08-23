import {categories} from '../../asset/categories';

type CategoryButtonParams = {
	setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
	selectedCategory: string;
};

export const CategoryButtons = ({setSelectedCategory, selectedCategory}: CategoryButtonParams) => {
	return (
		<div className="flexCenter animate-fadeInMoveDown flex-wrap">
			{categories.map(el => (
				<button
					key={el.id}
					onClick={() => setSelectedCategory(el.id)}
					className={`${
						selectedCategory === el.id && 'text-additional3'
					}   activeStyle flexCenterCol h-16 min-w-24  hover:text-additional3 `}
				>
					<i className={`ri-${el.icon} ri-2x ${selectedCategory === el.id && 'animate-jelly'}`} />
					<p className="text-2xs">{el.title}</p>
				</button>
			))}
		</div>
	);
};
