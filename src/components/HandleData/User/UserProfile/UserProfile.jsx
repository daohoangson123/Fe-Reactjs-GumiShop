import './UserProfile.css';
//
import { useDispatch, useSelector } from 'react-redux';
import { clearHistory, userSignOut } from '../../../../redux/Actions/Action';
import { Link } from 'react-router-dom';
//
import { toast } from 'react-toastify';
import { myPurchaseHistorySelector } from '../../../../redux/Selectors/Selector';

const UserProfile = () => {
    const purchaseHistory = useSelector(myPurchaseHistorySelector);
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
            <div className='UserProfile__PurchaseHistory'>
                <h2>My Purchase History</h2>
                {purchaseHistory.map((item) => (
                    <div>
                        {item.name}
                        <br />
                        {item.amount}
                    </div>
                ))}
                <button
                    type='button'
                    onClick={() => dispatch(clearHistory())}>
                    Clear History
                </button>
            </div>
            <button
                onClick={handleSignOut}
                className='SignOut__Btn'>
                <Link to='/userSignIn'>Sign Out</Link>
            </button>
        </div>
    );
};

export default UserProfile;
