import { NavLink, useNavigate } from 'react-router-dom';
//
import google from '../../../../assets/icon/GoogleLogo.webp';
import facebook from '../../../../assets/icon/FacebookLogo.webp';
//
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signinSelector } from '../../../../redux/Selectors/Selector';
import { loginRequest } from '../../../../data/axiosAPI/userSignIn';
import { userSignIn } from '../../../../redux/Actions/Action';
//
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EyeOpen from '../../../Layout/UI/SVG/Icons/EyeOpen';
import EyeClose from '../../../Layout/UI/SVG/Icons/EyeClose';
import UserName from '../../../Layout/UI/SVG/Icons/UserName';
import PassWord from '../../../Layout/UI/SVG/Icons/PassWord';
import Loading from '../../../Layout/UI/Loading/Loading'

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
                <div style={{ backdropFilter: 'opacity(0)' }}>
                    <span
                        className={`${isFocus || username ? 'SignInInputFocused' : 'SignInInputNotFocused'}`}
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
                <div style={{ backdropFilter: 'opacity(0)' }}>
                    <span
                        className={`${isFocus || password ? 'SignInInputFocused' : 'SignInInputNotFocused'}`}
                    >
                        password
                    </span>
                    <input
                        type={!showPass ? 'password' : 'text'}
                        id="signInPassWord"
                        className="signInPassWord"
                        required
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
                    <span
                        className="showpassicon"
                        onClick={() => setShowPass(!showPass)}
                    >
                        {showPass ? <EyeOpen /> : <EyeClose />}
                    </span>
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
        } else if (
            signinRequest.error &&
            signinRequest.error === 'user not found'
        ) {
            signinErrorNotify();
            setIsLoading(false);
            setIsError(true);
            return;
        }
    };

    useEffect(() => {
        if (isSignIn) {
            navigate('/user-profile');
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
                <span>Sign In</span>
                <div
                    style={{
                        fontSize: '16px',
                        fontWeight: 400,
                        color: 'red',
                    }}
                >
                    {isError && (
                        <p className="ErrorMessage">
                            Username/ Password is invalid
                        </p>
                    )}
                </div>
            </div>
            <fieldset className="SignIn__Form-Fieldset">
                <div className="SignIn__Form-InputContainer">
                    <label title="UserName" htmlFor="signInUserName">
                        <UserName />
                    </label>
                    <SignInInput
                        inputName="signInUserName"
                        setIsError={setIsError}
                        username={username}
                        setUsername={setUsername}
                    />
                </div>
                <div className="SignIn__Form-InputContainer">
                    <label title="PassWord" htmlFor="signInPassWord">
                        <PassWord />
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
                        <Loading />
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
                                loading="lazy"
                            />
                            Google
                        </div>
                        <div>
                            <img
                                src={facebook}
                                alt="google"
                                className="FacebookIcon"
                                loading="lazy"
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
