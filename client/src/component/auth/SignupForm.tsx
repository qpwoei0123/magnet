import {useNavigate} from 'react-router-dom';
import {signup, login} from '../../api/auth';
import {useOpenToastPopup} from '../../hooks/useOpenToastPopup';
import {getMember} from '../../api/member';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {signupSchema, SignupFormValues} from '../../schema/signup';
import {HookFormInput} from '../input/HookFormInput';

const useSignForm = () => {
	const navigate = useNavigate();
	const openToast = useOpenToastPopup();

	const {handleSubmit, formState, control} = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			username: '',
			password: '',
			nickName: '',
			phone: '',
		},
	});

	const onSubmit = async (data: SignupFormValues) => {
		try {
			const {email, username, password, nickName, phone} = data;
			await signup({
				email,
				username,
				password,
				nickName,
				phone,
				addressDto: {city: 'city', street: 'street'},
			});
			await login({email, password});
			await getMember();
			navigate('/');
			openToast({message: `${data.nickName}님 가입을 축하드려요!`, type: 'success'});
		} catch (e) {
			openToast({message: '회원가입에 실패했어요.', type: 'error'});
			console.error('회원가입에 실패했어요.', e);
		}
	};
	return {handleSubmit, onSubmit, formState, control};
};

const SignupForm = () => {
	const {control, formState, onSubmit, handleSubmit} = useSignForm();

	return (
		<section className="flexCol w-full items-center gap-10 *:w-10/12 *:md:w-96">
			<form onSubmit={handleSubmit(onSubmit)} className="flexCol gap-5">
				<HookFormInput name="email" icon="mail-line" control={control} />

				<HookFormInput name="password" icon="key-2-line" control={control} type="password" />

				<HookFormInput name="username" icon="user-line" control={control} />

				<HookFormInput name="nickName" icon="aliens-line" control={control} />

				<HookFormInput name="phone" icon="phone-line" control={control} />

				<button type="submit" className="buttonStylePrimary" disabled={!formState.isValid}>
					회원가입
				</button>
			</form>
		</section>
	);
};

export default SignupForm;
