import ReactDOM from 'react-dom';
import ModalStore from '../../store/ModalStore';
import {LogoTickle} from './LogoTickle';
import {useEffect} from 'react';

export const Modal = () => {
	const {closeModal, modalContent, isModalOpen} = ModalStore();

	// ESC 키를 누르면 모달이 닫히도록 합니다.
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [closeModal]);

	// 모달이 열릴 때 body의 스크롤을 막습니다.
	useEffect(() => {
		isModalOpen
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'unset');
	}, [isModalOpen]);

	return isModalOpen
		? ReactDOM.createPortal(
				<div
					onClick={closeModal}
					className="flexCenter fixed top-0 z-50 size-full  bg-black bg-opacity-30 backdrop-blur-sm"
				>
					<section
						onClick={e => e.stopPropagation()}
						className="modalStyle relative animate-fadeIn"
					>
						<PopupCloseButton handleClick={closeModal} />
						<LogoTickle word="MAGNET" />
						{modalContent}
					</section>
				</div>,
				document.body, // 여기가 포탈의 타겟 위치입니다.s
			)
		: null;
};

const PopupCloseButton = ({handleClick}: {handleClick: React.MouseEventHandler<HTMLElement>}) => {
	return (
		<div className="absolute right-1 top-1">
			<i
				onClick={handleClick}
				className="ri-close-line cursor-pointer text-3xl text-slate-400 transition-colors duration-300 hover:text-black"
			></i>
		</div>
	);
};
