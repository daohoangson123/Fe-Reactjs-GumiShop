import './App.css';
//
import Header from './components/Layout/Header/Header';
import Main from './components/Layout/Main/Main';
import Footer from './components/Layout/Footer/Footer';
//
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
import { useDispatch, useSelector } from 'react-redux';
import { signinSelector } from './redux/Selectors/Selector';
import { getUserData } from './redux/Actions/Action';
import { fetchUserData } from './data/axiosAPI/userData';
//
import { useEffect } from 'react';

function App() {
    const isSignIn = useSelector(signinSelector);
    const id = isSignIn && isSignIn.slice(16);
    const dispatch = useDispatch();

    const saveUserData = async () => {
        let userDataRes = await fetchUserData(id);
        if (userDataRes) {
            return dispatch(getUserData(userDataRes.data));
        }
        return;
    };

    useEffect(() => {
        if (isSignIn) {
            saveUserData();
        }
        // eslint-disable-next-line
    }, [isSignIn]);

    return (
        <div className='App'>
            <Header isSignIn={isSignIn} />
            <Main />
            <Footer />
            <ToastContainer
                autoClose={1500}
                limit={2}
            />
        </div>
    );
}

export default App;
