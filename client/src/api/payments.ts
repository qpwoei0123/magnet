// import axios from 'axios';
// import {loadTossPayments} from '@tosspayments/payment-sdk';

// const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY || 'NO_CLIENT_KEY';
// const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';
// const appUrl = process.env.REACT_APP_URL || 'NO_APP_URL';
// Use window.location.origin to support any deployment URL (S3, Vercel, Localhost)
const appUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

export const openTossPayment = async () => {
	try {
		// Mock: 실제 결제 대신 시뮬레이션
		const amount = Number(sessionStorage.getItem('amount'));
		const mentoringId = sessionStorage.getItem('mentoringId');
		
		console.log('모킹 환경: 결제 시뮬레이션 시작');
		console.log('Amount:', amount, 'MentoringId:', mentoringId);
		
		// 모킹 결제 데이터 생성
		const mockOrderId = `mock_order_${Date.now()}`;
		const mockPaymentKey = `mock_payment_${Date.now()}`;
		
		// 세션에 모킹 결제 데이터 저장
		sessionStorage.setItem('mockOrderId', mockOrderId);
		sessionStorage.setItem('mockPaymentKey', mockPaymentKey);
		
		// 2초 후 성공 페이지로 이동 (실제 결제 시뮬레이션)
		setTimeout(() => {
			const mockParams = new URLSearchParams({
				paymentKey: mockPaymentKey,
				orderId: mockOrderId,
				amount: amount.toString()
			});
			window.location.href = `${appUrl}/paymentcompleted?${mockParams.toString()}`;
		}, 2000);
		
		alert('모킹 환경: 2초 후 결제가 완료됩니다.');
		
	} catch (error) {
		console.error('모킹 결제 시뮬레이션 실패', error);
	}
};

type PaymentData = {
	paymentKey: string;
	orderId: string;
	amount: string;
};

export const sendPaymentSuccessToServer = async (paymentData: PaymentData) => {
	try {
		// Mock: 결제 성공 정보를 모킹 서버에 저장
		console.log('모킹 환경: 결제 성공 정보 서버 전송 시뮬레이션');
		
		const memberId = sessionStorage.getItem('memberId') || '1';
		const mentoringId = sessionStorage.getItem('mentoringId') || '1';
		
		const mockPaymentRecord = {
			memberId: parseInt(memberId),
			mentoringId: parseInt(mentoringId),
			amount: parseInt(paymentData.amount),
			paymentKey: paymentData.paymentKey,
			orderId: paymentData.orderId,
			status: 'completed',
			createdAt: new Date().toISOString()
		};
		
		// Mock API에 결제 정보 저장
		// const response = await axios.post(`${baseUrl}/payments`, mockPaymentRecord);
		console.log('모킹 서버에 결제 완료 정보 전송 성공 (Simulated)', mockPaymentRecord);
		
		return {
			success: true,
			message: '결제가 성공적으로 처리되었습니다.',
			data: mockPaymentRecord
		};
	} catch (error) {
		console.error('모킹 결제 정보 전송 실패', error);
		return {
			success: false,
			message: '결제 정보 전송에 실패했습니다.',
			error: error
		};
	}
};
