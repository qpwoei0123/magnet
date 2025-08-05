export type GetMemberResponse = {
	id: number;
	username: string;
	nickName: string;
	email: string;
	phone: string;
	picture: any;
	memberStatus: string;
	city: string;
	street: string;
	roles: string[];
	menteeList: any;
	mentorList: any;
};
export type UpdateMemberParams = {
	nickName: string;
	phone?: string;
	addressDto?: {city: string; street: string};
};
