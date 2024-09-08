import {MyQuillComponent} from '../../component/input/MyQuillComponent';
import {CommonInput} from '../../component/input/CommonInput';
import {SelectInput} from '../../component/input/SelectInput';
import {WarningMessage} from '../../component/common/WarningMessage';
import {useCreateMentoring} from './useCreateMentoring';

const categories = [
	{value: 'WEB_DESIGN', label: '웹 디자인'},
	{value: 'UI_UX', label: 'UI/UX'},
	{value: 'PRODUCT_MANAGER', label: '프로덕트 매니저'},
	{value: 'BACKEND', label: '백엔드'},
	{value: 'FRONTEND', label: '프론트엔드'},
	{value: 'DEVOPS', label: '데브옵스'},
	{value: 'DATA_ENGINEER', label: '데이터 엔지니어'},
	{value: 'SERVER_ENGINEER', label: '서버 엔지니어'},
	{value: 'AI', label: 'AI'},
]

export const CreateMentoringPage = () => {
	const {handleSubmit, isFormValid, category, content, participants, pay, period, title} =
		useCreateMentoring();
	return (
		<div className="flexCenter">
			<section className="flexCol gap-3 py-10">
				<div className="flexCenter">
					<p className="text-3xl font-semibold">멘토링 정보 입력</p>
				</div>
				<SelectInput
					placeholder="멘토링 분야"
					icon="chat-smile-3-line"
					{...category}
					options={categories}
				/>
				<CommonInput
					placeholder="멘토링 제목"
					icon="edit-box-line"
					{...title}
				/>

				<MyQuillComponent value={content.value} setValue={content.onChange} />

				<CommonInput
					placeholder="멘토링 진행 월"
					{...period}
					type="month"
					icon="calendar-line"
				/>
				<WarningMessage
					message="과거의 시간은 선택할 수 없습니다."
					isSuccess={period.value.length === 0 || new Date(period.value).getMonth() >= new Date().getMonth()}
				/>

				<CommonInput
					type="number"
					placeholder="결제 비용"
					icon="money-dollar-circle-line"
					value={pay.value.toString()}
					onChange={pay.onChange}
				/>
				<WarningMessage
					message="결제 금액은 1,000원부터 100,000원까지 가능해요."
					isSuccess={pay.value.length === 0 || (Number(pay.value) >= 1000 && Number(pay.value) <= 100000)}
				/>

				<CommonInput
					type="number"
					placeholder="모집 인원"
					icon="group-line"
					value={participants.value.toString()}
					onChange={participants.onChange}
				/>
				<WarningMessage
					message="모집 인원은 1명부터 30명까지 가능해요."
					isSuccess={
						participants.value.length === 0 || (Number(participants.value) >= 1 && Number(participants.value) <= 30)
					}
				/>
				<button className={`buttonStylePrimary`} onClick={handleSubmit} disabled={!isFormValid}>
					개설하기
				</button>
			</section>
		</div>
	);
};

export default CreateMentoringPage;
