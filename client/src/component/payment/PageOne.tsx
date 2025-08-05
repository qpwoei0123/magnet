import {LoadingContainer} from '../loading-error/LoadingContainer';
import {MentoringStore} from '../../store/MentoringStore';

export const PageOne = () => {
	// MentoringStore에서 데이터 가져오기 (중복 API 호출 방지)
	const {mentoringData} = MentoringStore();

	return mentoringData ? (
		<>
			<div className="textSmall flexCol gap-1 text-secondary *:flex *:gap-1">
				<div>
					<i className="ri-building-line" />
					<p className="truncate text-additional3">{`${mentoringData.task}`}</p>
				</div>
				<div>
					<i className="ri-bar-chart-2-line" />
					<p className="runcate">{`${mentoringData.career}`}</p>
				</div>
				<div>
					<i className="ri-walk-line " />
					<p className="truncate">{`${mentoringData.field}`} 직무</p>
				</div>
			</div>
			<div className="h-[1px] w-full border" />
			<p className="textLarge font-bold">{mentoringData.title}</p>
			<div
				className="textBase min-h-40 text-pretty"
				dangerouslySetInnerHTML={{__html: mentoringData.content}}
			/>
		</>
	) : (
		<LoadingContainer />
	);
};
