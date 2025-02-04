import './SignBar.css';
//
import userIcon from '../../../../assets/icon/userLogo.webp';
//
import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    signinSelector,
    userSelector,
} from '../../../../redux/Selectors/Selector';
import USAFlag from '../../UI/SVG/Flags/USA';
import VNMFlag from '../../UI/SVG/Flags/VNM';

const SignBar = memo(function SignBar({ isDown }) {
    const isSignIn = useSelector(signinSelector);
    const userData = useSelector(userSelector);
    const text =
        'Afterpay, Laybuy & Genoapay | Free Delivery New Zealand + Australia*';

    const langs = [
        {
            name: 'USA',
            flag: <USAFlag />,
        },
        {
            name: 'VNM',
            flag: <VNMFlag />,
        },
    ];

    const [flag, setFlag] = useState('USA');

    return (
        <div className="SignBar Container">
            <div className="SignBar__Text">{text}</div>
            <div className="SignBar__SignRegis ">
                <div className="SignBar__SignRegis-Link">
                    <NavLink
                        to={isSignIn ? '/user-profile' : '/user-signIn'}
                        title={
                            isSignIn && userData
                                ? userData.first_name + userData.last_name
                                : 'Sign In'
                        }
                        className={({ isActive }) =>
                            isActive ? 'active' : 'inactive'
                        }
                    >
                        {isSignIn ? (
                            <img
                                className="UserImg"
                                src={userData ? userData.avatar : userIcon}
                                alt="userImg"
                                loading="lazy"
                            />
                        ) : (
                            'Sign In'
                        )}
                    </NavLink>
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
                        {langs
                            .filter((item) => item.name === flag)
                            .map((item) => (
                                <div key={item.name}>{item.flag}</div>
                            ))}
                    </label>
                    <select
                        className="LangSelect "
                        name="lang"
                        id="lang"
                        title="Click to select Language"
                        onChange={(event) => setFlag(event.target.value)}
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
});

export default SignBar;
