import './SignBar.css';
//
import usa from '../../../../assets/img/usa.png';
import vnm from '../../../../assets/img/vnm.png';
import userLogo from '../../../../assets/icon/userLogo.png';
//
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    signinSelector,
    userSelector,
} from '../../../../redux/Selectors/Selector';

const SignBar = () => {
    const isSignIn = useSelector(signinSelector);
    const userData = useSelector(userSelector);
    const text =
        'Afterpay, Laybuy & Genoapay | Free Delivery New Zealand + Australia*';

    const langs = [
        {
            name: 'USA',
            flag: usa,
        },
        {
            name: 'VNM',
            flag: vnm,
        },
    ];

    const [flag, setFlag] = useState(usa);

    const handelChange = (event) => {
        if (event.target.value === 'VNM') {
            setFlag(vnm);
        } else {
            setFlag(usa);
        }
    };

    return (
        <div className="SignBar">
            <div className="SignBar__Text">{text}</div>
            <div className="SignBar__SignRegis ">
                <div className="SignBar__SignRegis-Link">
                    {!isSignIn ? (
                        <NavLink
                            to="/userSignIn"
                            title="Sign In"
                            className={({ isActive }) =>
                                isActive ? 'active' : 'inactive'
                            }
                        >
                            Sign In
                        </NavLink>
                    ) : (
                        <NavLink
                            to="/userProfile"
                            title={
                                userData
                                    ? userData.first_name + userData.last_name
                                    : 'Sign In'
                            }
                            className={({ isActive }) =>
                                isActive ? 'active' : 'inactive'
                            }
                        >
                            <img
                                className="UserImg"
                                src={userData ? userData.avatar : userLogo}
                                alt="userImg"
                            />
                        </NavLink>
                    )}
                    /
                    <NavLink
                        to="/userSignUp"
                        title="Sign Up"
                        className={({ isActive }) =>
                            isActive ? 'active' : 'inactive'
                        }
                    >
                        Register
                    </NavLink>
                </div>
                <div className="SignBar__Languages" title="Change Language">
                    <label htmlFor="lang" className="LangLabel ">
                        <img src={flag} alt="flag" />
                    </label>
                    <select
                        className="LangSelect "
                        name="lang"
                        id="lang"
                        title="Click to select Language"
                        onChange={handelChange}
                    >
                        {langs.map((item) => (
                            <option
                                className="LangOption "
                                key={item.name}
                                title={
                                    item.name === 'USA'
                                        ? 'American English'
                                        : 'Vietnamese'
                                }
                                value={item.name}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SignBar;
