import Header from './component/common/Header';
import Footer from './component/common/Footer';
import {Router} from './Router';
import {ToastPopup} from './component/common/ToastPopup';
import {Modal} from './component/common/Modal';
import {useEffect} from 'react';
import {initializeDemoUser} from './utils/auth/localStorageAuth';

function App() {
	// 앱 시작 시 데모 사용자 초기화
	useEffect(() => {
		initializeDemoUser();
	}, []);

	return (
		<>
			<Modal />
			<ToastPopup />
			<Header />
			<Router />
			<Footer />
		</>
	);
}

export default App;
