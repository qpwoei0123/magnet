/**
 * 에러 발생 시 사용자가 데이터를 다시 불러올 수 있는 UI를 제공합니다.
 */
export const ErrorContainer = ({refetch}: {refetch: () => Promise<void>}) => {
	return (
		<section
			className="flexCenterCol group min-h-40 w-full animate-fadeIn cursor-pointer border border-dashed text-secondary hover:text-primary"
			onClick={refetch}
		>
			<i className="ri-restart-line ri-2x group-hover:animate-spin" />
			<p className="textSmall font-semibold">다시 시도하기</p>
		</section>
	);
};
