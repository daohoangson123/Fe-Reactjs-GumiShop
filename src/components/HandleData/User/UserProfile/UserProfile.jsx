import './UserProfile.css';
//
import Table from 'react-bootstrap/Table';
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
        <div className='UserProfile Container'>
            <button
                onClick={handleSignOut}
                className='SignOut__Btn'>
                <Link to='/userSignIn'>Sign Out</Link>
            </button>
            <div className='UserProfile__PurchaseHistory'>
                <h2>My Purchase History</h2>
                <button
                    type='button'
                    className='ClearPurchaseHistory__Btn'
                    onClick={() => dispatch(clearHistory())}>
                    Clear History
                </button>
                <Table
                    striped
                    bordered
                    hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantities</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseHistory.length === 0 ? (
                            <tr>
                                <td>Null</td>
                                <td>Null</td>
                                <td>Null</td>
                            </tr>
                        ) : (
                            purchaseHistory.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default UserProfile;
