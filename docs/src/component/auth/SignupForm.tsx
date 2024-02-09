import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {signup} from '../../api/auth';

const SignupForm = () => {
	const [form, setForm] = useState({
		email: '',
		username: '',
		password: '',
		nickName: '',
		phone: '',
		addressDto: {city: 'city', street: 'street'},
		confirmPassword: '',
	});
	// 유효성 검사
	const [checkForm, setCheckForm] = useState({
		email: {focused: false, validated: false},
		username: {focused: false, validated: false},
		password: {focused: false, validated: false},
		confirmPassword: {focused: false, validated: false},
		nickName: {focused: false, validated: false},
		phone: {focused: false, validated: false},
	});

	const navigate = useNavigate();

	const handleSignup = async () => {
		const fetchSignup = async () => {
			try {
				const {confirmPassword, ...newForm} = form;
				await signup(newForm);
				navigate('/loginemail');
			} catch (e) {
				console.error('회원가입에 실패했습니다.', e);
			}
		};
		fetchSignup();
	};
	// 이하 검증 함수.
	const validateEmail = (vlaue: string) => {
		setForm({...form, email: vlaue});
		if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(vlaue)) {
			setCheckForm({...checkForm, email: {...checkForm.email, validated: true}});
		} else {
			setCheckForm({...checkForm, email: {...checkForm.email, validated: false}});
		}
	};

	const validateusername = (value: string) => {
		setForm({...form, username: value});
		if (/^[가-힣]{2,}$/.test(value)) {
			setCheckForm({...checkForm, username: {...checkForm.username, validated: true}});
		} else {
			setCheckForm({...checkForm, username: {...checkForm.username, validated: false}});
		}
	};

	const validateNickName = (value: string) => {
		setForm({...form, nickName: value});
		if (/^[A-Za-z0-9-가-힣]{3,}$/.test(value)) {
			setCheckForm({...checkForm, nickName: {...checkForm.nickName, validated: true}});
		} else {
			setCheckForm({...checkForm, nickName: {...checkForm.nickName, validated: false}});
		}
	};
	const validatePhone = (value: string) => {
		setForm({...form, phone: value});
		// 숫자와 하이픈 허용하고 10자리 이상
		if (/^([0-9]{2}|[0-9]{3})-([0-9]{3,4})-([0-9]{4})$/.test(value)) {
			setCheckForm({...checkForm, phone: {...checkForm.phone, validated: true}});
		} else {
			setCheckForm({...checkForm, phone: {...checkForm.phone, validated: false}});
		}
	};

	const validatePassword = (value: string) => {
		setCheckForm(prevState => {
			if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
				return {...prevState, password: {...prevState.password, validated: true}};
			} else {
				return {...prevState, password: {...prevState.password, validated: false}};
			}
		});
	};

	const validateConfirmPassword = (value: string) => {
		setCheckForm(prevState => {
			if (value === form.password) {
				return {
					...prevState,
					confirmPassword: {...prevState.confirmPassword, validated: true},
				};
			} else {
				return {
					...prevState,
					confirmPassword: {...prevState.confirmPassword, validated: false},
				};
			}
		});
	};

	// 패스워드는 입력이 서로 다를 때마다 검증을 해야 한다.
	useEffect(() => {
		const validateAndSetPassword = () => {
			validatePassword(form.password);
			validateConfirmPassword(form.confirmPassword);
		};

		validateAndSetPassword();
	}, [form.password, form.confirmPassword]);

	return (
		<section className="inputStyle flexCol items-center gap-5">
			<div>
				<p>이메일</p>
				<input
					placeholder="이메일을 입력하세요."
					value={form.email}
					onChange={e => validateEmail(e.target.value)}
					onFocus={() => setCheckForm({...checkForm, email: {...checkForm.email, focused: true}})}
				/>
				{!checkForm.email.validated && checkForm.email.focused && (
					<p className="warning">이메일 형식이 올바르지 않습니다.</p>
				)}
			</div>

			<div>
				<p>이름</p>
				<input
					placeholder="이름을 입력하세요."
					value={form.username}
					onChange={e => validateusername(e.target.value)}
					onFocus={() =>
						setCheckForm({...checkForm, username: {...checkForm.username, focused: true}})
					}
				/>
				{!checkForm.username.validated && checkForm.username.focused && (
					<p className="warning">2자리 이상의 한글이여야 합니다.</p>
				)}
			</div>

			<div>
				<p>닉네임</p>
				<input
					placeholder="닉네임을 입력하세요."
					value={form.nickName}
					onChange={e => validateNickName(e.target.value)}
					onFocus={() =>
						setCheckForm({...checkForm, nickName: {...checkForm.nickName, focused: true}})
					}
				/>
				{!checkForm.nickName.validated && checkForm.nickName.focused && (
					<p className="warning">특수문자 제외 3자리 이상이여야 합니다.</p>
				)}
			</div>

			<div>
				<p>전화번호</p>
				<input
					placeholder="전화번호를 입력하세요."
					value={form.phone}
					onChange={e => validatePhone(e.target.value)}
					onFocus={() => setCheckForm({...checkForm, phone: {...checkForm.phone, focused: true}})}
				/>
				{!checkForm.phone.validated && checkForm.phone.focused && (
					<p className="warning">하이픈(-)을 포함한 9자리 이상 정수여야 합니다.</p>
				)}
			</div>
			<div>
				<div>
					<p>비밀번호</p>
					<input
						type="password"
						placeholder="비밀번호를 입력하세요."
						value={form.password}
						onChange={e => setForm({...form, password: e.target.value})}
						onFocus={() =>
							setCheckForm({...checkForm, password: {...checkForm.password, focused: true}})
						}
					/>
					{!checkForm.password.validated && checkForm.password.focused && (
						<p className="warning">최소 8자 이상, 영문과 숫자를 모두 포함해야 합니다.</p>
					)}
				</div>
				<input
					className="mt-2"
					type="password"
					placeholder="비밀번호를 다시 입력하세요."
					value={form.confirmPassword}
					onChange={e => setForm({...form, confirmPassword: e.target.value})}
				/>
				{checkForm.password.validated && (
					<p className={`${checkForm.confirmPassword.validated ? 'success' : 'warning'}`}>
						{checkForm.confirmPassword.validated
							? '비밀번호가 일치합니다.'
							: '비밀번호가 일치하지 않습니다.'}
					</p>
				)}
			</div>

			{/* 모든 validated가 참인가? */}
			<button
				onClick={handleSignup}
				className={`text-white bg-primary ${
					!Object.values(checkForm).every(field => field.validated) && 'bg-opacity-20'
				}`}
				disabled={!Object.values(checkForm).every(field => field.validated)}
			>
				회원가입
			</button>
			<Link to="/loginemail">
				<p className="text-sm text-slate-400">로그인으로 돌아가기</p>
			</Link>
		</section>
	);
};

export default SignupForm;
