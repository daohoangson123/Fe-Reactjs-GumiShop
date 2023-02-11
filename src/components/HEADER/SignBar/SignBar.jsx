import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './SignBar.css'

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
    }, [flag])

    return (
        <div className='SignBar hidden md:flex justify-between gap-3 '>
            <div className='SignBar__text'>{text}</div>
            <div className='SignBar__SignRegis flex gap-2 '>
                <div className='SignBar__SignRegis--Component flex flex-wrap justify-center pr-2 '>
                    <Link className=' mr-1 hover:underline '>
                        Sign In
                    </Link>
                    /
                    <Link className=' ml-1 hover:underline '>
                    Register
                    </Link> 
                </div>
                <div className='SignBar__SignRegis--Languages flex items-center gap-1 '>
                    <label htmlFor="lang" className='LangLabel grid place-items-center '>
                        <img src={flag} alt="flag" />
                    </label>
                    <select className='LangSelect focus:border-none' name="lang" id="lang" onChange={handelChange}>
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