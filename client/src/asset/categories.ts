export type Category = {
	title: string;
	id: string;
	icon: string;
};

export const categories: Category[] = [
	{title: '전체', id: 'ALL', icon: 'menu-line'},
	{title: '백엔드', id: '백엔드', icon: 'server-line'},
	{title: '프론트엔드', id: '프론트엔드', icon: 'code-s-slash-line'},
	{title: '풀스택', id: '풀스택', icon: 'stack-line'},
	{title: '아키텍처', id: '아키텍처', icon: 'building-2-line'},
	{title: 'DevOps', id: 'DevOps', icon: 'cloud-line'},
	{title: '모바일', id: '모바일', icon: 'smartphone-line'},
	{title: '데이터베이스', id: '데이터베이스', icon: 'database-2-line'},
];
