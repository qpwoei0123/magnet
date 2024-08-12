export type CreateMentoringParams = {
	title: string;
	content: string;
	pay: string;
	period: string;
	participants: number;
	category: string;
};

export type GetMentoringResponse = {
	mentoringId: number;
	title: string;
	content: string;
	pay: string;
	period: string;
	participants: number;
	category: string;
	mentorId: number;
	career: string;
	field: string;
	task: string;
	email: string;
	phone: string;
	aboutMe: string;
	github: string;
};

export type GetMentoringListParams = {offset: number; size: number};

export type GetMentoringListResponse = {
	content: Content[];
	pageable: Pageable;
	last: boolean;
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
	sort: Sort;
	first: boolean;
	numberOfElements: number;
	empty: boolean;
};
type Pageable = {
	pageNumber: number;
	pageSize: number;
	sort: Sort;
	offset: number;
	unpaged: boolean;
	paged: boolean;
};
type Sort = {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
};
export type Content = {
	mentoringId: number;
	title: string;
	content: string;
	pay: string;
	period: string;
	participants: number;
	category: string;
	mentorId: number;
	aboutMe: string;
	field: string;
	task: string;
	mentorName: string;
	career: string;
};
