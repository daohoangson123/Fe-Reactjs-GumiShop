import './UserProfile.css';
//
import { useDispatch } from 'react-redux';
import { userSignOut } from '../../../../redux/Actions/Action';
import { Link } from 'react-router-dom';
//
import { toast } from 'react-toastify';

const UserProfile = () => {
    const dispatch = useDispatch();
    const handleSignOut = () => {
        dispatch(userSignOut());
        signoutNotify();
    };

    const signoutNotify = () =>
        toast.error(`You have been Signed Out`, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

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
