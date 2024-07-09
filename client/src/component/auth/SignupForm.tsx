import {useState, useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {signup, login} from '../../api/auth';
import {WarningMessage} from '../common/WarningMessage';
import {CommonInput} from '../input/CommonInput';
import {useOpenToastPopup} from '../../hooks/useOpenToastPopup';
import {getMember} from '../../api/member';

const SignupForm = () => {
	const navigate = useNavigate();
	const openToast = useOpenToastPopup();

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [nickName, setNickName] = useState('');
	const [phone, setPhone] = useState('');
	const [address] = useState({city: 'city', street: 'street'});

	const [validatedForm, setValidatedForm] = useState({
		email: false,
		username: false,
		password: false,
		nickName: false,
		phone: false,
	});

	const validators: {[key: string]: RegExp} = useMemo(
		() => ({
			email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
			username: /^[가-힣]{2,}$/,
			nickName: /^[A-Za-z0-9-가-힣]{3,}$/,
			phone: /^([0-9]{2}|[0-9]{3})-([0-9]{3,4})-([0-9]{4})$/,
			password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
		}),
		[],
	);

	const handleSignup = async () => {
		try {
			await signup({email, username, password, nickName, phone, addressDto: address});
			await login({email, password});
			await getMember();
			navigate('/');
			openToast({message: `${nickName}님 가입을 축하드려요!`, type: 'success'});
		} catch (e) {
			openToast({message: '회원가입에 실패했어요.', type: 'error'});
			console.error('회원가입에 실패했어요.', e);
		}
	};

	const validateField = useCallback(
		(field: string | number, value: string) => {
			const isValid = validators[field].test(value);
			setValidatedForm(prev => ({...prev, [field]: isValid}));

			switch (field) {
				case 'email':
					setEmail(value);
					break;
				case 'username':
					setUsername(value);
					break;
				case 'nickName':
					setNickName(value);
					break;
				case 'phone':
					setPhone(value);
					break;
				case 'password':
					setPassword(value);
					break;
				default:
					break;
			}
		},
		[validators],
	);

	const isFormValid = useMemo(
		() => Object.values(validatedForm).every(validated => validated),
		[validatedForm],
	);

	return (
		<section className="flexCol w-full items-center gap-10 *:w-10/12 *:md:w-96">
			<div className="flexCol gap-2">
				<CommonInput
					placeholder="이메일"
					icon="mail-line"
					value={email}
					onChange={useCallback(val => validateField('email', val), [validateField])}
				/>
				<WarningMessage
					message="이메일 형식이어야 합니다."
					isSuccess={validatedForm.email || email.length === 0}
				/>

				<CommonInput
					type="password"
					placeholder="비밀번호"
					icon="key-2-line"
					value={password}
					onChange={useCallback(val => validateField('password', val), [validateField])}
				/>
				<WarningMessage
					message="최소 8자 이상, 영문과 숫자를 모두 포함해야 합니다."
					isSuccess={validatedForm.password || password.length === 0}
				/>
			</div>

			<div className="flexCol gap-2">
				<CommonInput
					placeholder="실명"
					icon="user-line"
					value={username}
					onChange={useCallback(val => validateField('username', val), [validateField])}
				/>
				<WarningMessage
					message="한글 2자리 이상이여야 합니다."
					isSuccess={validatedForm.username || username.length === 0}
				/>

				<CommonInput
					placeholder="전화번호"
					icon="phone-line"
					value={phone}
					onChange={useCallback(val => validateField('phone', val), [validateField])}
				/>
				<WarningMessage
					message="하이픈(-)을 포함한 9자리 이상 정수여야 합니다."
					isSuccess={validatedForm.phone || phone.length === 0}
				/>
			</div>

			<div className="flexCol">
				<CommonInput
					placeholder="닉네임"
					icon="aliens-line"
					value={nickName}
					onChange={useCallback(val => validateField('nickName', val), [validateField])}
				/>
				<WarningMessage
					message="특수문자 제외 3자리 이상이여야 합니다."
					isSuccess={validatedForm.nickName || nickName.length === 0}
				/>
			</div>

			<button onClick={handleSignup} className="buttonStylePrimary" disabled={!isFormValid}>
				회원가입
			</button>
		</section>
	);
};

export default SignupForm;
