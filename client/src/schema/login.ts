import {z} from 'zod';

export const loginSchema = z.object({
	email: z
		.string()
		.max(40, '이메일의 길이가 비정상적 입니다.')
		.email('유효한 이메일 형식이어야 합니다.'),
	password: z
		.string()
		.min(8, '최소 8자 이상이어야 합니다.')
		.max(20, '비밀번호는 최대 20자리 입니다.')
		.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, '영문과 숫자를 모두 포함해야 합니다.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
