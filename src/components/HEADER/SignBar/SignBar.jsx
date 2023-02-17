import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    useEffect(() => {
    }, [])

    return (
        <div className='SignBar container hidden md:flex justify-between gap-3 '>
            <div className='SignBar__text'>{text}</div>
            <div className='SignBar__SignRegis flex gap-2 '>
                <div className='SignBar__SignRegis--Component flex flex-wrap justify-center pr-2 '>
                    <Link to='/signin' className=' mr-1 hover:underline '>
                        Sign In
                    </Link>
                    /
                    <Link to='/register' className=' ml-1 hover:underline '>
                    Register
                    </Link> 
                </div>
                <div className='SignBar__SignRegis--Languages flex items-center gap-1 '>
                    <label htmlFor="lang" className='LangLabel '>
                        <img src={flag} alt="flag" className=' grid place-items-center ' />
                    </label>
                    <select className='LangSelect ' name="lang" id="lang" onChange={handelChange}>
                        {langs.map((item) => (
                            <option className='LangOption ' key={item.name} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div> {/* tao component rieng */}
        </div>
    )
}

export default SignBar;