import './UserProfile.css';
//
import { useDispatch } from 'react-redux';
import { userSignOut } from '../../../../redux/Actions/Action';
import { Link } from 'react-router-dom';
//

const UserProfile = () => {
    const dispatch = useDispatch();
    const handleSignOut = () => {
        dispatch(userSignOut());
    };

    return (
        <div className='UserProfile'>
            <button
                onClick={handleSignOut}
                className='SignOut__Btn'>
                <Link to='/userSignIn'>Sign Out</Link>
            </button>
        </div>
    );
};

export default UserProfile;
