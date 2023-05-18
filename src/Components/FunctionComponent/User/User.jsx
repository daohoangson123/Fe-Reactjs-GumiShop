import './User.css';
//
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
//

const User = ({ ...props }) => {
    const [signIn, setSignIn] = useState(props.user);

    const [isRegis, setIsRegis] = useState(false);

    const [isSigned, setIsSigned] = useState(false);

    const [isWrongPass, setIsWrongPass] = useState(false);

    const [isInfo, setIsInfo] = useState(false);

    const [inputValue, setInputValue] = useState({
        UserName: '',
        Password: '',
        RegisEmail: '',
        RegisUser: '',
        RegisPass: '',
    });

    const [signAcc, setSignAcc] = useState({
        user: inputValue.RegisUser,
        pass: inputValue.RegisPass,
    });

    const [info, setInfo] = useState({
        name: '',
        phone: '',
        address: '',
    });

    const fillInfo =
        info.name !== '' && info.phone !== '' && info.address !== '';

    useEffect(() => {
        setSignIn(props.user);
    }, [props.user]);

    return (
        <div className='User'>
            {signIn && !isSigned ? (
                <div className='SignIn'>
                    <form
                        action=''
                        onSubmit={(event) => {
                            event.preventDefault();
                            if (
                                inputValue.UserName === signAcc.user &&
                                inputValue.Password === signAcc.pass
                            ) {
                                setIsSigned(true);
                            } else {
                                setIsWrongPass(true);
                                setInputValue({
                                    ...inputValue,
                                    Password: '',
                                });
                            }
                        }}
                    >
                        <div className='Input_Container'>
                            <div>
                                <label htmlFor='UserName'>
                                    <i className='fa-solid fa-user'></i>
                                </label>
                                <input
                                    type='text'
                                    name='UserName'
                                    id='UserName'
                                    value={inputValue.UserName}
                                    required
                                    autoComplete='off'
                                    placeholder='UserName*'
                                    onChange={(event) =>
                                        setInputValue({
                                            ...inputValue,
                                            UserName: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor='UserPass'>
                                    <i className='fa-solid fa-lock'></i>
                                </label>
                                <input
                                    type='password'
                                    name='UserPass'
                                    id='UserPass'
                                    value={inputValue.Password}
                                    required
                                    autoComplete='off'
                                    placeholder='Password*'
                                    onChange={(event) =>
                                        setInputValue({
                                            ...inputValue,
                                            Password: event.target.value,
                                        })
                                    }
                                    onFocus={() => setIsWrongPass(false)}
                                />
                            </div>
                        </div>
                        {isWrongPass ? (
                            <div className='WrongUserPass-Notify'>
                                UserName or PassWord is incorrect, please try
                                again
                            </div>
                        ) : null}
                        <div className='User_Submit'>
                            <button
                                type='submit'
                                value='Submit'
                            >
                                Sign In
                            </button>
                        </div>
                        <Link
                            to='/userRegister'
                            className='Sign-Regis'
                        >
                            Create New Account
                        </Link>
                    </form>
                </div>
            ) : isSigned ? (
                <div className='User__Account'>
                    <form
                        action=''
                        className='User__Account-Form'
                    >
                        <button
                            type='button'
                            className='SignOut-Btn'
                            onClick={() => {
                                setSignIn(true);
                                setIsSigned(false);
                            }}
                        >
                            Sign Out
                        </button>
                        <label htmlFor='name'>Full Name: </label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            autoComplete='off'
                            disabled={isInfo}
                            required
                            onChange={(event) =>
                                setInfo({
                                    ...info,
                                    name: event.target.value,
                                })
                            }
                        />
                        <label htmlFor='phone'>Phone Number: </label>
                        <input
                            type='tel'
                            name='phone'
                            id='phone'
                            autoComplete='off'
                            disabled={isInfo}
                            required
                            onChange={(event) =>
                                setInfo({
                                    ...info,
                                    phone: event.target.value,
                                })
                            }
                        />
                        <label htmlFor='address'>Address: </label>
                        <textarea
                            name='address'
                            id='address'
                            autoComplete='off'
                            disabled={isInfo}
                            required
                            onChange={(event) =>
                                setInfo({
                                    ...info,
                                    address: event.target.value,
                                })
                            }
                        ></textarea>
                        <button
                            className='SaveInfo-Btn'
                            type='button'
                            disabled={isInfo ? true : fillInfo ? false : true}
                            onClick={() => setIsInfo(true)}
                        >
                            Save Info
                        </button>
                        <button
                            className='ChangeInfo-Btn'
                            type='button'
                            disabled={!isInfo}
                            onClick={() => setIsInfo(false)}
                        >
                            Change Info
                        </button>
                    </form>
                </div>
            ) : (
                <div className='Regis'>
                    <form
                        action=''
                        onSubmit={(event) => {
                            event.preventDefault();
                            setSignAcc({
                                user: inputValue.RegisUser,
                                pass: inputValue.RegisPass,
                            });
                            setIsRegis(true);
                            setTimeout(() => {
                                setSignIn(true);
                                setIsRegis(false);
                            }, 2000);
                        }}
                    >
                        {isRegis ? (
                            <div className='AccountCreat-Notify'>
                                Account created! You can sign-in now.
                            </div>
                        ) : null}
                        <div className='Input_Container'>
                            <div>
                                <label htmlFor='RegisEmail'>
                                    <i className='fa-solid fa-envelope'></i>
                                </label>
                                <input
                                    type='email'
                                    name='RegisEmail'
                                    id='RegisEmail'
                                    value={inputValue.RegisEmail}
                                    required
                                    autoComplete='off'
                                    placeholder='Email'
                                    onChange={(event) =>
                                        setInputValue({
                                            ...inputValue,
                                            RegisEmail: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor='RegisUser'>
                                    <i className='fa-solid fa-user-plus'></i>
                                </label>
                                <input
                                    type='text'
                                    name='RegisUser'
                                    id='RegisUser'
                                    value={inputValue.RegisUser}
                                    required
                                    autoComplete='off'
                                    placeholder='User Name'
                                    onChange={(event) =>
                                        setInputValue({
                                            ...inputValue,
                                            RegisUser: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor='RegisPass'>
                                    <i className='fa-solid fa-lock'></i>
                                </label>
                                <input
                                    type='password'
                                    name='RegisPass'
                                    id='RegisPass'
                                    value={inputValue.RegisPass}
                                    required
                                    autoComplete='off'
                                    placeholder='Password'
                                    onChange={(event) =>
                                        setInputValue({
                                            ...inputValue,
                                            RegisPass: event.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className='User_Submit'>
                            <button
                                type='submit'
                                value='Submit'
                            >
                                Register
                            </button>
                        </div>
                        <Link
                            to='/userLogin'
                            className='Sign-Regis'
                        >
                            Already have Account?
                        </Link>
                    </form>
                </div>
            )}
        </div>
    );
};

export default User;
