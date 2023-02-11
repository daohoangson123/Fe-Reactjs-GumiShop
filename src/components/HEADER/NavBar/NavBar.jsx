import { Link } from "react-router-dom";
import logoIcon from "../../../icon/LogoIcon.png";
import menuIcon1 from "../../../icon/MenuIcon1.png";
import menuIcon2 from "../../../icon/MenuIcon2.png";
import menuIcon3 from "../../../icon/MenuIcon3.png";
import searchIcon from "../../../icon/SearchIcon.svg";
import cartIcon from "../../../icon/CartIcon.svg";
import "./NavBar.css"

const Nav_Items = [
    {
        name: "HOME",
        path: "/",
    },{
        name: "SHOP",
        path: "/shop",
    },{
        name: "FAQ'S",
        path: "/faq",
    },{
        name: "STOCKIST",
        path: "/stockist",
    },{
        name: "WHOLESALE",
        path: "/wholesale",
    },{
        name: "CONTACT",
        path: "/contact",
    },
]

const NavBar = () => {
    return (
        <nav className="NavBar p-5 sm:py-[10px] sm:px-[50px] md:px-[100px] flex flex-wrap justify-between items-center bg-white">
            <button className="MobileMenu flex flex-col items-end gap-1 lg:hidden ">
                <img src={menuIcon1} alt="" className="w-[30px] " />
                <img src={menuIcon2} alt="" className="w-[30px] "/>
                <img src={menuIcon3} alt="" className="w-[20px] "/>
            </button>
            <div className="NavBar__List absolute top-[100px] left-[50px] hidden lg:hidden justify-between gap-5">
                {Nav_Items.map((item) => (
                    <Link to={item.path} className="">
                        {item.name}
                    </Link>
                ))}
            </div>
            <h1 className="NavBar__Logo p-1 sm:p-0 w-[200px] sm:w-[250px] h-[50px] "><img src={logoIcon} alt="Logo" /></h1>
            <div className="NavBar__List hidden lg:flex justify-center sm:gap-5 2xl:gap-20">
                {Nav_Items.map((item) => (
                    <Link to={item.path} key={item.name} className=' hover:underline '>
                        {item.name}
                    </Link>
                ))}
            </div>
            <div className="SearchCart flex items-center gap-2">
                <Link to='/search' >
                    <img className='NavBar__SearchIcon' src={searchIcon} alt="search" />
                </Link>
                <Link to='/cart' >
                    <img className='NavBar__CartIcon' src={cartIcon} alt="cart" />
                </Link>
            </div>
        </nav>
    )
}

export default NavBar