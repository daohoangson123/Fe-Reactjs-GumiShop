import { useState } from 'react';
import './User.css';

const User = ({...props}) => {
    const [login, setLogin] = useState(true);

    return (
        <div className='User'>
            {login
            ?
            <div className='SignIn'>
                <form action="">
                    <fieldset>
                        <legend>Sign In</legend>
                        <div className='Input_Container'>
                            <label htmlFor="UserName">User Name:</label>
                            <input type="text" name="UserName" id="UserName" required autoComplete='off'/>
                            <label htmlFor="UserPass">Password:</label>
                            <input type="password" name="UserPass" id="UserPass" required autoComplete='off'/>
                        </div>
                        <div className='User_Submit'>
                            <button type="submit" value="Submit">
                                Sign In
                            </button>
                        </div>
                        <span className='Sign-Regis' onClick={() => setLogin(false)}>Create Account</span>
                    </fieldset>
                </form>
            </div>
            :
            <div className='Regis'>
                <form action="">
                    <fieldset>
                        <legend>Register</legend>
                        <div className='Input_Container'>
                            <label htmlFor="RegisEmail">Email:</label>
                            <input type="email" name="RegisEmail" id="RegisEmail" required autoComplete='off'/>
                            <label htmlFor="RegisdUser">User Name:</label>
                            <input type="text" name="RegisdUser" id="RegisdUser" required autoComplete='off'/>
                            <label htmlFor="RegisPass">Password:</label>
                            <input type="password" name="RegisPass" id="RegisPass" required autoComplete='off'/>
                        </div>
                        <div className='User_Submit'>
                            <button type="submit" value="Submit">
                                Register
                            </button>
                        </div>
                        <span className='Sign-Regis' onClick={() => setLogin(true)}>Already have Account?</span>
                    </fieldset>
                </form>
            </div>
            }
        </div>
    )
}

export default User;