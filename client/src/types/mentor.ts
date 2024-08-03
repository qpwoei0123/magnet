import {MentoringDto} from './mentoring';

export type Mentor = {
	mentorId: number;
	mentorName: string;
	career: string;
	field: string;
	task: string;
	email: string;
	phone: string;
	aboutMe: string;
	github: string;
	mentoringDtoList: MentoringDto[];
};
