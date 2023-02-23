import './SignIn.css';

const SignIn = () => {
    return (
        <div className='SignIn'>
            <form action="">
                <fieldset>
                    <legend>Sign In</legend>
                    <div className='Input_Container'>
                        <label htmlFor="User">UserName:</label>
                        <input type="text" name="User" id="User" required autoComplete='off'/>
                        <label htmlFor="Pass">Password:</label>
                        <input type="password" name="Pass" id="Pass" required autoComplete='off'/>
                    </div>
                    <div className='SignIn_Submit'>
                        <button type="submit" value="Submit">
                            Sign In
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default SignIn;