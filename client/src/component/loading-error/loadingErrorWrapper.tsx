import {LoadingContainer} from './LoadingContainer';
import {ErrorContainer} from './ErrorContainer';
import {ReactNode} from 'react';

type LoadingErrorWrapperParams = {
	isLoading: boolean;
	isError: boolean;
	refetch: () => Promise<void>;
	children: ReactNode;
};

/**
 * 로딩, 에러 상태를 관리하고, 해당 상태에 따라 적절한 컴포넌트를 렌더링합니다.
 **/
export const LoadingErrorWrapper = ({
	isLoading,
	isError,
	refetch,
	children,
}: LoadingErrorWrapperParams) => {
	if (isLoading) return <LoadingContainer />;
	if (isError) return <ErrorContainer refetch={refetch} />;
	return <>{children}</> || null;
};
