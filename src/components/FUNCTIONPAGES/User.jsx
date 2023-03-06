import { useEffect, useState } from 'react';
import './User.css';

const User = ({...props}) => {

    const [signIn, setSignIn] = useState(props.user);

    const [isSigned, setIsSigned] = useState(false);
    
    const [inputValue, setInputValue] = useState({
        UserName: "",
        Password: "",
        RegisEmail: "",
        RegisUser: "",
        RegisPass: "",
    });

    const [signAcc, setSignAcc] = useState({
        user: inputValue.RegisUser,
        pass: inputValue.RegisPass
    });

    const [info, setInfo] = useState({
        name: "",
        phone: "",
        address: "",
    })

    const [isInfo, setIsInfo] = useState(false);
    
    useEffect(() => {
        setSignIn(props.user);
    }, [props.user]);

    return (
        <div className='User'>
            {signIn && !isSigned
            ?
            <div className='SignIn'>
                <form action="" onSubmit={(event) => {
                    event.preventDefault();
                    if(inputValue.UserName === signAcc.user && inputValue.Password === signAcc.pass) {
                        setIsSigned(true);
                    }
                }}>
                    <div className='Input_Container'>
                        <div>
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="UserName" id="UserName" value={inputValue.UserName} required autoComplete='off' placeholder='User Name' onChange={(event) => setInputValue({...inputValue, 'UserName' : event.target.value })}/>
                        </div>
                        <div>
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="UserPass" id="UserPass" value={inputValue.Password} required autoComplete='off' placeholder='Password' onChange={(event) => setInputValue({...inputValue, 'Password' : event.target.value })}/>
                        </div>
                    </div>
                    <div className='User_Submit'>
                        <button type="submit" value="Submit">
                            Sign In
                        </button>
                    </div>
                    <span className='Sign-Regis'
                    onClick={() => setSignIn(false)}
                    >Create Account</span>
                </form>
            </div>
            : isSigned
            ?
            <div className='User__Account'>
                <form action='' className='User__Account-Form'>
                    <label htmlFor="name">Full Name: </label>
                    <input type="text" name='name' id='name' autoComplete='off' disabled={isInfo ? true : false} required onChange={(event) => setInfo({...info, name: event.target.value})} />
                    <label htmlFor="phone">Phone Number: </label>
                    <input type="tel" name='phone' id='phone' autoComplete='off' disabled={isInfo ? true : false} required onChange={(event) => setInfo({...info, phone: event.target.value})} />
                    <label htmlFor="address">Address: </label>
                    <textarea name="address" id="address" autoComplete='off' disabled={isInfo ? true : false} required onChange={(event) => setInfo({...info, address: event.target.value})}></textarea>
                    <button className='SaveInfo-Btn' type='button' disabled={isInfo ? true : info.name !== "" && info.phone !== "" && info.address !== "" ? false : true}
                    onClick={() => setIsInfo(true)}>
                        Save Info
                    </button>
                    <button className='ChangeInfo-Btn' type='button' disabled={!isInfo}
                    onClick={() => setIsInfo(false)}>
                        Change Info
                    </button>
                </form>
            </div>
            :
            <div className='Regis'>
                <form action="" onSubmit={(event) => {
                    event.preventDefault();
                    alert("Account Created!")
                    setSignAcc({
                        user: inputValue.RegisUser,
                        pass: inputValue.RegisPass
                    })
                    setSignIn(true)
                    }}>
                    <div className='Input_Container'>
                        <div>
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" name="RegisEmail" id="RegisEmail" value={inputValue.RegisEmail} required autoComplete='off' placeholder='Email' onChange={(event) => setInputValue({...inputValue, 'RegisEmail' : event.target.value })}/>
                        </div>
                        <div>
                            <i className="fa-solid fa-user-plus"></i>
                            <input type="text" name="RegisUser" id="RegisUser" value={inputValue.RegisUser} required autoComplete='off' placeholder='User Name' onChange={(event) => setInputValue({...inputValue, 'RegisUser' : event.target.value })}/>
                        </div>
                        <div>
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="RegisPass" id="RegisPass" value={inputValue.RegisPass} required autoComplete='off' placeholder='Password' onChange={(event) => setInputValue({...inputValue, 'RegisPass' : event.target.value })}/>
                        </div>
                    </div>
                    <div className='User_Submit'>
                        <button type="submit" value="Submit">
                            Register
                        </button>
                    </div>
                    <span className='Sign-Regis'
                    onClick={() => setSignIn(true)}
                    >Already have Account?</span>
                </form>
            </div>
            }
        </div>
    )
}

export default User;