import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SignBar.css';

const text = 'Afterpay, Laybuy & Genoapay | Free Delivery New Zealand + Australia*'

const langs = [
    {
        name: "USA",
    },
    {
        name: "VNM",
    }
]

const SignBar = () => {
    const [flag, setFlag] = useState("https://cdn-icons-png.flaticon.com/512/555/555526.png");
    
    const handelChange = (e) => {
        if(e.target.value === "VNM") {
            setFlag("https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/255px-Flag_of_Vietnam.svg.png")
        } else {
            setFlag("https://cdn-icons-png.flaticon.com/512/555/555526.png")
        }
    }
    
    return (
        <div className='SignBar '>
            <div className='SignBar__Text'>{text}</div>
            <div className='SignBar__SignRegis '>
                <div className='SignBar__SignRegis--Component'>
                    <NavLink to='/userLogin' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        Sign In
                    </NavLink>
                    /
                    <NavLink to='/userRegister' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        Register
                    </NavLink> 
                </div>
                <div className='SignBar__SignRegis--Languages '>
                    <label htmlFor="lang" className='LangLabel '>
                        <img src={flag} alt="flag" className=' ' />
                    </label>
                    <select className='LangSelect ' name="lang" id="lang" onChange={handelChange}>
                        {langs.map((item) => (
                            <option className='LangOption ' key={item.name} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SignBar;