import {login} from '../../api/auth';
import {getMember} from '../../api/member';
import {useOpenToastPopup} from '../../hooks/useOpenToastPopup';
import ModalStore from '../../store/ModalStore';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginSchema, LoginFormValues} from '../../schema/login';
import {HookFormInput} from '../input/HookFormInput';

const useLoginForm = () => {
	const openToast = useOpenToastPopup();
	const {closeModal} = ModalStore();

	const {control, formState, handleSubmit} = useForm({
		mode: 'onChange',
		resolver: zodResolver(loginSchema),
		defaultValues: {email: '', password: ''},
	});

	const handleLogin = async (formData: LoginFormValues) => {
		const fetchLogin = async () => {
			try {
				console.log(formData);
				await login(formData);
				await getMember();
				closeModal();
				openToast({message: '로그인 성공!', type: 'success'});
			} catch (e) {
				openToast({
					message: '이메일 또는 비밀번호를 확인하세요.',
					type: 'error',
				});
			}
		};

		fetchLogin();
	};

	return {control, formState, handleSubmit, handleLogin};
};

const LoginForm = () => {
	const {control, formState, handleSubmit, handleLogin} = useLoginForm();

	return (
		<section className="flexCol w-full gap-10 py-10 md:w-96">
			<form onSubmit={handleSubmit(handleLogin)} className="flexCol w-full gap-5">
				<HookFormInput control={control} name="email" icon="mail-line" />
				<HookFormInput control={control} name="password" icon="key-2-line" type="password" />
				<button className={`buttonStylePrimary w-full`} disabled={!formState.isValid}>
					로그인
				</button>
			</form>
		</section>
	);
};

export default LoginForm;
