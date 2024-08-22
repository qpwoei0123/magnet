type CategoryButtonParams = {
	newCategories: {
		id: string;
		title: string;
		icon: string;
	}[];
	setCategory: React.Dispatch<React.SetStateAction<string>>;
	category: string;
};

export const CategoryButtons = ({newCategories, setCategory, category}: CategoryButtonParams) => {
	return (
		<div className="flexCenter animate-fadeInMoveDown flex-wrap">
			{newCategories.map(el => (
				<button
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
	);
};
