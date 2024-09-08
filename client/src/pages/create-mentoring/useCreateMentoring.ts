import {useCallback, useEffect, useState} from 'react';
import {createMentoring} from '../../api/mentoring';
import {useNavigate} from 'react-router-dom';
import {useOpenToastPopup} from '../../hooks/useOpenToastPopup';

export const useCreateMentoring = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [pay, setPay] = useState('');
	const [period, setPeriod] = useState('');
	const [participants, setParticipants] = useState('');
	const [category, setCategory] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);
	const navigate = useNavigate();
	const openToastPopup = useOpenToastPopup();

	const handleSubmit = async () => {
		const newForm = {
			title,
			content,
			pay,
			period,
			participants: Number(participants),
			category,
		};
		try {
			await createMentoring(newForm);
			openToastPopup({message: '멘토링 개설에 성공했습니다.', type: 'success'});
			navigate('/mentorlist');
		} catch (error) {
			openToastPopup({message: '멘토링 개설에 실패했습니다.', type: 'error'});
		}
	};

	const validateForm = useCallback(() => {
		const isValidDescription = content.trim().length > 0;
		const isValidTitle = title.trim().length > 0;
		const isValidPay = Number(pay) >= 1000 && Number(pay) <= 100000;
		const isValidParticipants = Number(participants) >= 1 && Number(participants) <= 30;
		const isValidPeriod = new Date(period).getMonth() >= new Date().getMonth();

		setIsFormValid(
			isValidDescription && isValidTitle && isValidPay && isValidParticipants && isValidPeriod,
		);
	}, [title, content, pay, participants, period]);

	useEffect(() => {
		validateForm();
	}, [validateForm]);

	return {
		title: {value: title, onChange: setTitle},
		category: {value: category, onChange: setCategory},
		content: {value: content, onChange: setContent},
		pay: {value: pay, onChange: setPay},
		period: {value: period, onChange: setPeriod},
		participants: {value: participants, onChange: setParticipants},
		isFormValid,
		handleSubmit,
	};
};
