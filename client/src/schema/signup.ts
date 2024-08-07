import {z} from 'zod';

export const signupSchema = z.object({
	email: z
		.string()
		.max(40, '이메일의 길이가 비정상적 입니다.')
		.email('유효한 이메일 형식이어야 합니다.'),
	username: z
		.string()
		.min(2, '한글 2자리 이상이어야 합니다.')
		.max(10, '이름은 최대 10자리 입니다.')
		.regex(/^[가-힣]+$/, '한글만 입력 가능합니다.'),
	password: z
		.string()
		.min(8, '최소 8자 이상이어야 합니다.')
		.max(20, '비밀번호는 최대 20자리 입니다.')
		.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, '영문과 숫자를 모두 포함해야 합니다.'),
	nickName: z
		.string()
		.min(3, '특수문자 제외 3자리 이상이어야 합니다.')
		.max(20, '닉네임은 최대 10자리 입니다.')
		.regex(/^[A-Za-z0-9가-힣]+$/, '특수문자는 포함될 수 없습니다.'),
	phone: z
		.string()
		.max(20, '번호의 길이가 비정상적 입니다.')
		.regex(
			/^([0-9]{2}|[0-9]{3})-([0-9]{3,4})-([0-9]{4})$/,
			'하이픈(-)을 포함한 9자리 이상 정수여야 합니다.',
		),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
