import db from './mockData';

// Use window.location.origin to support any deployment URL (S3, Vercel, Localhost)
const appUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const openTossPayment = async () => {
	const amount = sessionStorage.getItem('amount');
	const mentoringId = sessionStorage.getItem('mentoringId');

	if (!amount || !mentoringId) {
		alert('결제 정보(금액 또는 멘토링 ID)가 없습니다. 다시 시도해 주세요.');
		return;
	}

	console.log('Mock Payment Simulation Started');
	console.log('Amount:', amount, 'MentoringId:', mentoringId);

	// Mock payment data generation
	const mockOrderId = `mock_order_${Date.now()}`;
	const mockPaymentKey = `mock_payment_${Date.now()}`;

	// Simulate a delay for the payment process
	await delay(2000);

	const mockParams = new URLSearchParams({
		paymentKey: mockPaymentKey,
		orderId: mockOrderId,
		amount: amount.toString(),
	});

	// Redirect to the payment completion page
	window.location.href = `${appUrl}/paymentcompleted?${mockParams.toString()}`;
};

type PaymentData = {
	paymentKey: string;
	orderId: string;
	amount: string;
};

export const sendPaymentSuccessToServer = async (paymentData: PaymentData) => {
	await delay(500);
	console.log('Mock: Simulating sending payment success to server...');

	const memberId = sessionStorage.getItem('memberId');
	const mentoringId = sessionStorage.getItem('mentoringId');

	if (!memberId || !mentoringId) {
		console.error('Mock Error: Missing memberId or mentoringId in session storage.');
		return {
			success: false,
			message: '사용자 또는 멘토링 정보가 없습니다.',
		};
	}

	const newPaymentRecord = {
		id: db.payments.length + 1,
		memberId: parseInt(memberId, 10),
		mentoringId: parseInt(mentoringId, 10),
		amount: parseInt(paymentData.amount, 10),
		paymentKey: paymentData.paymentKey,
		orderId: paymentData.orderId,
		status: 'completed',
	};

	// Note: This only logs the action. It doesn't persist the data.
	db.payments.push(newPaymentRecord);
	console.log('Mock: Payment record added to in-memory db.json', newPaymentRecord);

	return {
		success: true,
		message: '결제가 성공적으로 처리되었습니다.',
		data: newPaymentRecord,
	};
};
