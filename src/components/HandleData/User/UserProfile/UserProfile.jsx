import './UserProfile.css';
//
import Table from 'react-bootstrap/Table';
//
import { useDispatch, useSelector } from 'react-redux';
import { clearHistory, userSignOut } from '../../../../redux/Actions/Action';
import { Link } from 'react-router-dom';
//
import { toast } from 'react-toastify';
import {
    myPurchaseHistorySelector,
    userSelector,
} from '../../../../redux/Selectors/Selector';
import Skeleton from 'react-loading-skeleton';
import { logoutRequest } from '../../../../data/axiosAPI/userSignout';
import ErrorBoundary from '../../../Support/Error/ErrorBoundary';

const UserProfile = () => {
    const dispatch = useDispatch();
    const purchaseHistory = useSelector(myPurchaseHistorySelector);
    const userData = useSelector(userSelector);

    const handleSignOut = () => {
        dispatch(userSignOut());
        logoutRequest();
        signoutNotify();
    };

    const signoutNotify = () =>
        toast.error(`You have been Signed Out`, {
            position: 'top-left',
        });

    return (
        <div className='UserProfile Container'>
            <ErrorBoundary>
                <div className='UserProfile__UserData'>
                    {!userData ? (
                        <>
                            <Skeleton
                                width={128}
                                height={128}
                                circle
                            />
                            <div>
                                <Skeleton width={120} />
                                <Skeleton width={80} />
                            </div>
                            <div style={{ justifySelf: 'center' }}>
                                <Skeleton width={70} />
                            </div>
                        </>
                    ) : (
                        <>
                            <img
                                src={userData.avatar && userData.avatar}
                                alt={userData && userData.first_name}
                            />
                            <div>
                                User: {userData && userData.first_name}{' '}
                                {userData && userData.last_name}
                                <br />
                                Id: {userData && userData.id}
                            </div>
                            <button
                                onClick={handleSignOut}
                                className='SignOut__Btn'>
                                <Link to='/userSignIn'>Sign Out</Link>
                            </button>
                        </>
                    )}
                </div>
                <div className='UserProfile__PurchaseHistory'>
                    <h2>My Purchase History</h2>
                    <button
                        type='button'
                        className='ClearPurchaseHistory__Btn'
                        onClick={() => dispatch(clearHistory())}>
                        Clear History
                    </button>
                    {purchaseHistory.length > 0 && (
                        <div className='UserProfile__PurchaseHistory-TableContainer'>
                            <Table
                                striped
                                bordered
                                hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Quantities</th>
                                        <th>Price</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                {purchaseHistory && (
                                    <tbody>
                                        {purchaseHistory.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.price}</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </Table>
                        </div>
                    )}
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default UserProfile;
