export type SignupParams = {
	email: string;
	password: string;
	username: string;
	nickName: string;
	phone: string;
	addressDto: {
		city: string | null;
		street: string | null;
	};
};

export type LoginParams = {
	email: string;
	password: string;
};
