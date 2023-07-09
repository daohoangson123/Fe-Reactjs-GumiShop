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
import { fetchUserData } from '../../../../data/axiosAPI/userSignIn';
import { userSignIn } from '../../../../redux/Actions/Action';
//
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const isSignIn = useSelector(signinSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [showPass, setShowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

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

    const handleSignIn = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setTimeout(() => getUserData(), 1000);
    };

    const getUserData = async () => {
        let result = await fetchUserData(username, password);
        if (result.token) {
            signinNotify();
            return dispatch(userSignIn(result.token));
        }
        if (result.data.error && result.data.error === 'user not found') {
            signinErrorNotify();
            setIsLoading(false);
            setIsError(true);
            return;
        }
    };

    useEffect(() => {
        if (isSignIn) {
            navigate(-1);
        }
    }, [isSignIn, navigate]);

    return (
        <div className='SignIn'>
            eve.holt@reqres.in
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
                        <label htmlFor='signInUserName'>UserName: </label>
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
                        <label htmlFor='signInPassWord'>Password: </label>
                        <div className='SignIn__Form-InputContainer-Password'>
                            <input
                                type={!showPass ? 'password' : 'text'}
                                id='signInPassWord'
                                className='signInPassWord'
                                placeholder='password'
                                required
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                onFocus={() => setIsError(false)}
                            />
                            <i
                                className={`fa-regular ${
                                    !showPass ? 'fa-eye-slash' : 'fa-eye'
                                }`}
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
                        disabled={(!username || !password || isLoading) && true}
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
        </div>
    );
};

export default SignIn;
