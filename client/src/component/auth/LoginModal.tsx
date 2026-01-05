import LoginForm from './LoginForm';
import LoginButton from './OAuthButton';
import {useNavigate} from 'react-router-dom';
import ModalStore from '../../store/ModalStore';
import {login} from '../../api/auth';
import {getMember} from '../../api/member';
import {useOpenToastPopup} from '../../hooks/useOpenToastPopup';

export const LoginModal = () => {
	const navigate = useNavigate();
	const {closeModal} = ModalStore();
	const openToast = useOpenToastPopup();

	const handleSignupLink = () => {
		closeModal();
		navigate('/signup');
	};

	const handleDemoLogin = async () => {
		try {
			await login({email: 'demo@example.com', password: 'password123'});
			await getMember();
			closeModal();
			openToast({message: '데모 계정으로 로그인 성공!', type: 'success'});
			navigate('/mentorlist');
		} catch (e) {
			openToast({
				message: '로그인에 실패했습니다.',
				type: 'error',
			});
		}
	};

	return (
		<div className="flexCenter h-fit w-full flex-col gap-5">
			<LoginForm />

			<div className="flexCenter gap-5">
				<button onClick={() => handleSignupLink()} className="activeStyle text-sm">
					이메일로 회원가입
				</button>
				<button onClick={handleDemoLogin} className="activeStyle text-sm text-blue-500 font-bold">
					데모 로그인
				</button>
			</div>

			<div className="h-[0.1px] w-full border " />

			<div className="flexCenter gap-3">
				<div className="size-12  ">
					<LoginButton type="Google" />
				</div>
				<div className="size-12 ">
					<LoginButton type="Kakao" />
				</div>
				<div className="size-12 ">
					<LoginButton type="Naver" />
				</div>
			</div>
		</div>
	);
};
