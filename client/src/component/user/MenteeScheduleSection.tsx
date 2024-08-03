import {AppliedMentoringBox} from './AppliedMentoringBox';
import {Mentee} from '../../types';

export const MenteeScheduleSection = ({MenteeList}: {MenteeList: Mentee[]}) => {
	return (
		<section className="userPageSection flexCol gap-10">
			<div className="flexCol items-start gap-1">
				<div className="flexCenter textTitle gap-2 text-additional2">
					<i className="ri-calendar-schedule-line" />
					<p className="">내가 신청한 멘토링</p>
				</div>
				<p className="textSmall">신청한 멘토링 일정을 확인해요.</p>
			</div>

			{MenteeList.length === 0 ? (
				<p className="flexCenter textLarge h-40">신청한 멘토링이 없어요.</p>
			) : (
				<div className="flexCol w-full gap-2 rounded-xl bg-white">
					{MenteeList.map((el, index) => (
						<AppliedMentoringBox Mentee={el} key={index} />
					))}
				</div>
			)}
		</section>
	);
};

export default MenteeScheduleSection;
