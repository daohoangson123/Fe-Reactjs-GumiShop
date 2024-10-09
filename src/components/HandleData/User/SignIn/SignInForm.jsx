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

const SignInInput = ({
    inputName,
    username,
    setUsername,
    password,
    setPassword,
    setIsError,
}) => {
    const [isFocus, setIsFocus] = useState(false);
    const [showPass, setShowPass] = useState(false);

    return (
        <>
            {' '}
            {inputName === 'signInUserName' ? (
                <div>
                    <span
                        style={{
                            position: 'absolute',
                            transform: isFocus
                                ? 'translate3d(15px, -12px, -10px)'
                                : 'translate3d(5px, 7px, 0',
                            fontSize: isFocus ? '14px' : '16px',
                            color: isFocus
                                ? 'var(--color-primary)'
                                : 'var(--color-icon)',
                            background: 'white',
                            paddingInline: isFocus && '5px',
                            zIndex: isFocus ? 0 : -1,
                            transition: 'all ease-in-out 0.2s',
                        }}
                    >
                        username
                    </span>
                    <input
                        type="text"
                        id="signInUserName"
                        className="signInUserName"
                        required
                        onChange={(event) => setUsername(event.target.value)}
                        onBlur={() => {
                            if (username === '') {
                                setIsFocus(false);
                            }
                        }}
                        onFocus={() => {
                            setIsError(false);
                            setIsFocus(true);
                        }}
                    />
                </div>
            ) : (
                <div>
                    <span
                        style={{
                            position: 'absolute',
                            transform: isFocus
                                ? 'translate3d(15px, -12px, -10px)'
                                : 'translate3d(5px, 7px, 0',
                            fontSize: isFocus ? '14px' : '16px',
                            color: isFocus
                                ? 'var(--color-primary)'
                                : 'var(--color-icon)',
                            background: 'white',
                            paddingInline: isFocus && '5px',
                            zIndex: isFocus ? 0 : -1,
                            transition: 'all ease-in-out 0.2s',
                        }}
                    >
                        password
                    </span>
                    <input
                        type={!showPass ? 'password' : 'text'}
                        id="signInPassWord"
                        className="signInPassWord"
                        required
                        autoComplete="on"
                        onChange={(event) => setPassword(event.target.value)}
                        onBlur={() => {
                            if (password === '') {
                                setIsFocus(false);
                            }
                        }}
                        onFocus={() => {
                            setIsError(false);
                            setIsFocus(true);
                        }}
                    />
                    <i
                        className={`fa-regular ${
                            !showPass ? 'fa-eye-slash' : 'fa-eye'
                        } showpassicon`}
                        onClick={() => setShowPass(!showPass)}
                    ></i>
                </div>
            )}
        </>
    );
};

const SignInForm = () => {
    const isSignIn = useSelector(signinSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const signinNotify = () =>
        toast.success(`You have Signed In Successfully`, {
            transition: Zoom,
        });

    const signinErrorNotify = () =>
        toast.error(`UserName/ Password invalid`, {
            transition: Zoom,
        });

    const dataRequired = () =>
        toast.error(`UserName/ Password Required`, {
            transition: Zoom,
        });

    const handleSignIn = (event) => {
        event.preventDefault();
        if (username && password) {
            setIsLoading(true);
            setTimeout(() => postLoginRequest(), 1500);
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

    useEffect(() => {
        if (isSignIn) {
            navigate('/userProfile');
        }
        // eslint-disable-next-line
    }, [isSignIn]);

    return (
        <form
            action=""
            // autoComplete='off'
            className="SignIn__Form"
            onSubmit={handleSignIn}
        >
            <div className="SignIn__Form-Title">
                Sign In
                <div
                    style={{
                        fontSize: '16px',
                        fontWeight: 400,
                        color: 'red',
                    }}
                >
                    {isError ? (
                        <p className="ErrorMessage">
                            Username/ Password is invalid
                        </p>
                    ) : (
                        <p>Please fillout username and password</p>
                    )}
                </div>
            </div>
            <fieldset className="SignIn__Form-Fieldset">
                <div className="SignIn__Form-InputContainer">
                    <label htmlFor="signInUserName">
                        <i className="fa-solid fa-user"></i>
                    </label>
                    <SignInInput
                        inputName="signInUserName"
                        setIsError={setIsError}
                        username={username}
                        setUsername={setUsername}
                    />
                </div>
                <div className="SignIn__Form-InputContainer">
                    <label htmlFor="signInPassWord">
                        <i className="fa-key fa-solid"></i>
                    </label>
                    <SignInInput
                        inputName="signInPassWord"
                        setIsError={setIsError}
                        password={password}
                        setPassword={setPassword}
                    />
                </div>
                <div className="SignIn__Form-Remember">
                    <label htmlFor="rememberUser">Remember me</label>
                    <input
                        type="checkbox"
                        name="rememberUser"
                        id="rememberUser"
                    />
                </div>
                <button
                    type="submit"
                    disabled={(!username || !password || isLoading) && true}
                    className="SignIn__Btn"
                >
                    {isLoading ? (
                        <>
                            <i className="fa-solid fa-spin-pulse fa-spinner"></i>
                            <span> Logging in</span>
                        </>
                    ) : (
                        'Sign In'
                    )}
                </button>
                <div className="SignIn__Form-Link">
                    <NavLink to="/passwordRetrieve">
                        Forgot your password?
                    </NavLink>
                    <NavLink to="/userSignUp" className="toSignUp">
                        Create new account
                    </NavLink>
                </div>
                <div className="SignIn__Form-Other">
                    <div className="SignIn__Form-OtherDecor">
                        <div></div>
                        <span>OR</span>
                        <div></div>
                    </div>
                    <div className="SignIn__Form-OtherSignIn">
                        <div>
                            <img
                                src={google}
                                alt="google"
                                className="GoogleIcon"
                            />
                            Google
                        </div>
                        <div>
                            <img
                                src={facebook}
                                alt="google"
                                className="FacebookIcon"
                            />
                            Facebook
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    );
};

export default SignInForm;
