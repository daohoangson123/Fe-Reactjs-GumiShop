import './App.css';
//
import Header from './components/Layout/Header/Header';
import Main from './components/Layout/Main/Main';
import Footer from './components/Layout/Footer/Footer';

//
import { useDispatch, useSelector } from 'react-redux';
import { signinSelector } from './redux/Selectors/Selector';
import { getUserData } from './redux/Actions/Action';
import { fetchUserData } from './data/axiosAPI/userData';
//
import { useEffect } from 'react';
//
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <div className="App">
            <Header />
            <Main />
            <Footer />
            <ToastContainer autoClose={1500} />
        </div>
    );
}

export default App;
