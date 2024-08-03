import {CreatedMentoringBox} from './CreatedMentoringBox';
import {Mentor} from '../../types';

export const MentorScheduleSection = ({mentorList}: {mentorList: Mentor[]}) => {
	const mentoringList = mentorList[0].mentoringDtoList;
	return (
		<section className="userPageSection flexCol gap-10">
			<div className="flexCol items-start gap-1">
				<div className="flexCenter textTitle gap-2 text-additional3">
					<i className="ri-calendar-check-line" />
					<p className="">내가 개설한 멘토링</p>
				</div>
				<p className="textSmall">개설한 멘토링의 신청여부를 확인해요.</p>
			</div>

			{mentoringList.length === 0 ? (
				<p className="flexCenter textLarge h-40">개설한 멘토링이 없어요.</p>
			) : (
				<div className="w-full rounded-xl bg-white">
					{mentoringList.map((el, index) => (
						<CreatedMentoringBox mentoringDto={el} key={index} />
					))}
				</div>
			)}
		</section>
	);
};

export default MentorScheduleSection;
