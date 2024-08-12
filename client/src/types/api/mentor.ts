export type CreateMentorParams = {
	mentorName: string;
	field: string;
	career: string;
	task: string;
	email: string;
	phone: string;
	aboutMe: string;
	github: string;
};

export type GetMentorListParams = {offset: number; size: number};

export type GetMentorListResponse = {
	content: Content[];
	pageable: Pageable;
	last: boolean;
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
	sort: Sort2;
	first: boolean;
	numberOfElements: number;
	empty: boolean;
};

type Content = {
	mentorId: number;
	mentorName: string;
	career: string;
	field: string;
	task: string;
	email: string;
	phone: string;
	aboutMe: string;
	github: string;
	mentoringId: number;
	mentoringTitle: string;
	mentoringContent: string;
	mentoringPay: string;
	mentoringPeriod: string;
	mentoringParticipants: number;
	mentoringCategory: string;
};

interface Pageable {
	pageNumber: number;
	pageSize: number;
	sort: Sort;
	offset: number;
	paged: boolean;
	unpaged: boolean;
}

interface Sort {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
}

interface Sort2 {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
}
