import './SignIn.css';
//
import { NavLink, useNavigate } from 'react-router-dom';
//
import google from '../../../../assets/icon/GoogleLogo.png';
import facebook from '../../../../assets/icon/FacebookLogo.png';
//
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signinSelector } from '../../../../redux/Selectors/Selector';
import { loginRequest } from '../../../../data/axiosAPI/userSignIn';
import { userSignIn } from '../../../../redux/Actions/Action';
//
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUserList } from '../../../../data/axiosAPI/userList';
import Pagination from 'react-bootstrap/Pagination';
import ErrorBoundary from '../../../Support/Error/ErrorBoundary';
import Skeleton from 'react-loading-skeleton';

const SignIn = () => {
    const isSignIn = useSelector(signinSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [showPass, setShowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userList, setUserList] = useState();

    const getUserList = async () => {
        let userListRes = await fetchUserList(active);
        if (userListRes) {
            setUserList(userListRes.data);
        }
    };

    const signinNotify = () =>
        toast.success(`You have Signed In Successfully`, {
            transition: Zoom,
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

    const signinErrorNotify = () =>
        toast.error(`UserName/ Password invalid`, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

    const dataRequired = () =>
        toast.error(`UserName/ Password Required`, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

    const handleSignIn = (event) => {
        event.preventDefault();
        if (username && password) {
            setIsLoading(true);
            setTimeout(() => postLoginRequest(), 1000);
        } else {
            dataRequired();
        }
    };

    const postLoginRequest = async () => {
        let signinRequest = await loginRequest(username, password);
        if (signinRequest.token) {
            signinNotify();
            return dispatch(userSignIn(signinRequest.token));
        }
        if (
            signinRequest.data.error &&
            signinRequest.data.error === 'user not found'
        ) {
            signinErrorNotify();
            setIsLoading(false);
            setIsError(true);
            return;
        }
    };

    const [active, setActive] = useState(1);

    useEffect(() => {
        if (isSignIn) {
            navigate('/userProfile');
        }
        getUserList();
    }, [isSignIn, navigate, active]);

    let items = [];
    for (let number = 1; number <= 2; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={() => {
                    setActive(number);
                }}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div className='SignIn'>
            <ErrorBoundary>
                <form
                    action=''
                    // autoComplete='off'
                    className='SignIn__Form'
                    onSubmit={handleSignIn}>
                    <div className='SignIn__Form-Title'>
                        Sign In
                        <div
                            style={{
                                fontSize: '16px',
                                fontWeight: 400,
                                color: 'red',
                            }}>
                            {isError && 'Username/ Password is invalid'}
                        </div>
                    </div>
                    <fieldset className='SignIn__Form-Fieldset'>
                        <div className='SignIn__Form-InputContainer'>
                            <label htmlFor='signInUserName'>
                                <i className='fa-solid fa-user'></i>
                            </label>
                            <input
                                type='text'
                                id='signInUserName'
                                className='signInUserName'
                                placeholder='username'
                                required
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                onFocus={() => setIsError(false)}
                            />
                        </div>
                        <div className='SignIn__Form-InputContainer'>
                            <label htmlFor='signInPassWord'>
                                <i className='fa-solid fa-key'></i>
                            </label>
                            <div>
                                <input
                                    type={!showPass ? 'password' : 'text'}
                                    id='signInPassWord'
                                    className='signInPassWord'
                                    placeholder='password'
                                    required
                                    autoComplete='on'
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    onFocus={() => setIsError(false)}
                                />
                                <i
                                    className={`fa-regular ${
                                        !showPass ? 'fa-eye-slash' : 'fa-eye'
                                    } showpassicon`}
                                    onClick={() => setShowPass(!showPass)}></i>
                            </div>
                        </div>
                        <div className='SignIn__Form-Remember'>
                            <label htmlFor='rememberUser'>Remember me</label>
                            <input
                                type='checkbox'
                                name='rememberUser'
                                id='rememberUser'
                            />
                        </div>
                        <button
                            type='submit'
                            disabled={
                                (!username || !password || isLoading) && true
                            }
                            className='SignIn__Btn'>
                            {isLoading ? (
                                <i className='fa-solid fa-spinner fa-spin-pulse'></i>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                        <div className='SignIn__Form-Link'>
                            <NavLink to='/passwordRetrieve'>
                                Forgot your password?
                            </NavLink>
                            <NavLink
                                to='/userSignUp'
                                className='toSignUp'>
                                Create new account
                            </NavLink>
                        </div>
                        <div className='SignIn__Form-Other'>
                            <div className='SignIn__Form-OtherDecor'>
                                <div></div>
                                <span>OR</span>
                                <div></div>
                            </div>
                            <div className='SignIn__Form-OtherSignIn'>
                                <div>
                                    <img
                                        src={google}
                                        alt='google'
                                        className='GoogleIcon'
                                    />
                                    Google
                                </div>
                                <div>
                                    <img
                                        src={facebook}
                                        alt='google'
                                        className='FacebookIcon'
                                    />
                                    Facebook
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <div className='User_List'>
                    <ol>
                        {userList ? (
                            userList.map((user) => (
                                <li key={user.id}>
                                    {user.id}. {user.email}
                                </li>
                            ))
                        ) : (
                            <Skeleton
                                width={200}
                                count={6}
                            />
                        )}
                    </ol>
                    <Pagination>{items}</Pagination>
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default SignIn;
