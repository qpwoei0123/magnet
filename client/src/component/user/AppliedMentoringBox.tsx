import {useState} from 'react';
import {Mentee} from '../../types';

export const AppliedMentoringBox = ({Mentee}: {Mentee: Mentee}) => {
	const [isClicked, setIsClicked] = useState(false);
	const {category, title, mentorName, schedule, pay, email, message} = Mentee;
	// 버튼 클릭 시 mentoring 데이터 가져오기
	const handleClick = async () => {
		setIsClicked(!isClicked); // isClicked 상태 토글
	};

	return (
		<div className="interactionPushDown flexCol w-full rounded-lg border">
			<button className={` textSmall flexCenter w-full justify-between p-5`} onClick={handleClick}>
				<div className="flexCol items-start gap-3">
					<span className="font-PartialSansKR_Regular">{category}</span>
					<span>{title}</span>
				</div>
				<i className={`ri-arrow-drop-${isClicked ? 'down' : 'right'}-line ri-3x`} />
				{/* 버튼 아이콘 변경 */}
			</button>

			{isClicked && schedule && (
				<div className={`textSmall flexCol animate-fadeIn gap-3 p-5 pt-0 `}>
					<div>
						<p className="textBase font-black">멘토</p>
						<span className="text-secondary">{mentorName}</span>
					</div>
					<div>
						<p className="textBase font-black">멘토링 일정</p>
						<span className="text-secondary">{schedule}</span>
					</div>
					<div>
						<p className="textBase font-black">결제 금액</p>
						<span className="text-secondary">{pay}원</span>
					</div>
					<div>
						<p className="textBase font-black">연락가능한 이메일</p>
						<span className="text-secondary">{email}</span>
					</div>
					<div>
						<p className="textBase font-black">연락가능한 전화번호</p>
						<span className="text-secondary">데이터 준비중입니다!{/* 데이터 필요함 */}</span>
					</div>
					<div>
						<p className="textBase font-black">멘토에게 전달사항</p>
						<span className="text-secondary">{message}</span>
					</div>
				</div>
			)}
		</div>
	);
};
