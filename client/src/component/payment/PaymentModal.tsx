import PaymentButton from './PaymentButton';
import {useEffect, useState} from 'react';
import {PageOne} from './PageOne';
import {PageTwo} from './PageTwo';
import {PageThree} from './PageThree';
import {getMentoring} from '../../api/mentoring';
import {useLocation} from 'react-router-dom';
import {MentoringStore} from '../../store/MentoringStore';

type PaymentModalProps = {
	mentoringData?: any;
};

const PaymentModal = ({ mentoringData: propsMentoringData }: PaymentModalProps = {}) => {
	// page는 urlparameter로 받아온다.
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(!propsMentoringData);
	const [loadingMessage, setLoadingMessage] = useState<string>('멘토링 정보를 불러오는 중...');
	const location = useLocation();
	const {setMentoringData, mentoringData} = MentoringStore();

	// 로딩 메시지 목록
	const loadingMessages = [
		'멘토링 정보를 불러오는 중...',
		'멘토 프로필을 확인하는 중...',
		'최적의 멘토링을 준비하는 중...',
		'커리큘럼을 분석하는 중...',
		'맞춤형 멘토링을 설정하는 중...',
		'멘토와의 매칭을 확인하는 중...'
	];

	// props로 전달된 데이터를 랜덤 로딩 시간 후 설정
	useEffect(() => {
		if (propsMentoringData && !mentoringData) {
			const transformedData = {
				mentoringId: propsMentoringData.mentoringId,
				title: propsMentoringData.title,
				content: propsMentoringData.content,
				pay: propsMentoringData.pay,
				period: propsMentoringData.period,
				participants: propsMentoringData.participants,
				category: propsMentoringData.category,
				mentorId: propsMentoringData.mentorId || 1,
				career: propsMentoringData.career || '시니어',
				field: propsMentoringData.field || propsMentoringData.category,
				task: propsMentoringData.task || '',
				email: 'demo@example.com',
				phone: '010-0000-0000',
				aboutMe: propsMentoringData.aboutMe || '멘토링 전문가입니다.',
				github: 'https://github.com/demo'
			};
			
			// 0~2초 랜덤 로딩 시간
			const randomDelay = Math.random() * 2000; // 0-2000ms
			const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
			setLoadingMessage(randomMessage);
			
			setTimeout(() => {
				setMentoringData(transformedData);
				setIsLoading(false);
			}, randomDelay);
		}
	}, [propsMentoringData, mentoringData, setMentoringData]);

	// 멘토링 정보를 불러온다.
	useEffect(() => {
		const fetchMentoringData = async () => {
			try {
				// props로 전달된 데이터가 있으면 그것을 우선 사용
				if (propsMentoringData && !mentoringData) {
					// Content 타입을 GetMentoringResponse 타입으로 변환
					const transformedData = {
						mentoringId: propsMentoringData.mentoringId,
						title: propsMentoringData.title,
						content: propsMentoringData.content,
						pay: propsMentoringData.pay,
						period: propsMentoringData.period,
						participants: propsMentoringData.participants,
						category: propsMentoringData.category,
						mentorId: propsMentoringData.mentorId || 1,
						career: propsMentoringData.career || '시니어',
						field: propsMentoringData.field || propsMentoringData.category,
						task: propsMentoringData.task || '',
						email: 'demo@example.com',
						phone: '010-0000-0000',
						aboutMe: propsMentoringData.aboutMe || '멘토링 전문가입니다.',
						github: 'https://github.com/demo'
					};
					setMentoringData(transformedData);
					return;
				}

				// props로 데이터가 없고 아직 데이터가 없으면 URL에서 mentoringId를 찾아서 API 호출
				if (!propsMentoringData && !mentoringData) {
					const searchParams = new URLSearchParams(location.search);
					const mentoringId = searchParams.get('mentoringid');
					if (mentoringId) {
						const data = await getMentoring(Number(mentoringId));
						setMentoringData(data);
					}
				}
			} catch (error) {
				console.error('멘토링 정보를 불러오는 동안 오류가 발생했습니다:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchMentoringData();
	}, [location.search, setMentoringData, propsMentoringData, mentoringData]);

	if (isLoading || !mentoringData) {
		return (
			<div className="flexCenter w-full h-96 animate-fadeIn">
				<div className="flexCol items-center gap-6">
					{/* 개선된 로딩 애니메이션 */}
					<div className="relative">
						<div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200"></div>
						<div className="animate-spin rounded-full h-12 w-12 border-4 border-additional3 border-t-transparent absolute top-0 left-0"></div>
					</div>
					
					{/* 로딩 도트 애니메이션 */}
					<div className="flex space-x-2">
						<div className="w-2 h-2 bg-additional3 rounded-full animate-bounce"></div>
						<div className="w-2 h-2 bg-additional3 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
						<div className="w-2 h-2 bg-additional3 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
					</div>
					
					<p className="text-secondary animate-pulse text-center px-4">{loadingMessage}</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="flexCol w-full flex-grow animate-fadeIn gap-5 overflow-y-auto">
				<>
					{pageNumber === 1 ? (
						<PageOne />
					) : pageNumber === 2 ? (
						<PageTwo />
					) : pageNumber === 3 ? (
						<PageThree />
					) : (
						<>oops! 404</>
					)}
				</>
			</div>

			<div className="flex w-full justify-end">
				{pageNumber === 1 && mentoringData ? (
					<div className="flexCenter w-full justify-between ">
						<MentoringDetails />
						<PaymentButton setPage={setPageNumber} type="next" />
					</div>
				) : pageNumber === 2 ? (
					<>
						<PaymentButton setPage={setPageNumber} type="previous" />
						<PaymentButton setPage={setPageNumber} type="next" />
					</>
				) : pageNumber === 3 ? (
					<>
						<PaymentButton setPage={setPageNumber} type="previous" />
						<PaymentButton setPage={setPageNumber} type="payment" />
					</>
				) : (
					<></>
				)}
			</div>
		</>
	);
};

const MentoringDetails = () => {
	const {mentoringData} = MentoringStore();

	return mentoringData ? (
		<div className="flexCol textSmall gap-1 rounded-3xl bg-slate-100 px-5 py-2">
			<div className=" flex items-center gap-1">
				<i className="ri-money-dollar-circle-line" />
				<p> 1회 : {mentoringData.pay}원</p>
			</div>
			<div className=" flex items-center gap-1">
				<i className="ri-calendar-event-line" />
				<p> 기간 : {mentoringData.period}</p>
			</div>
		</div>
	) : null;
};

export default PaymentModal;