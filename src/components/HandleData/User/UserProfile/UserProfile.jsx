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
import { fetchUserData } from '../../../../data/axiosAPI/userData';
import { getUserData } from '../../../../redux/Actions/Action';
import { signinSelector } from '../../../../redux/Selectors/Selector';
import { useEffect } from 'react';
import ErrorBoundary from '../../../Support/Error/ErrorBoundary';

const UserProfile = () => {
    const dispatch = useDispatch();
    const purchaseHistory = useSelector(myPurchaseHistorySelector);
    const userData = useSelector(userSelector);
    const token = useSelector(signinSelector);
    const id = token && token.slice(16);

    const saveUserData = async () => {
        let userDataRes = await fetchUserData(id);
        if (userDataRes) {
            return dispatch(getUserData(userDataRes.data));
        }
        return;
    };

    useEffect(() => {
        saveUserData();
    }, []);

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
            <ErrorBoundary>
                <div className='UserProfile__UserData'>
                    {!userData ? (
                        <>
                            <Skeleton
                                width={128}
                                height={128}
                            />
                            User: <Skeleton width={100} />
                            Id: <Skeleton width={50} />
                        </>
                    ) : (
                        <>
                            <img
                                src={userData.avatar && userData.avatar}
                                alt={userData && userData.first_name}
                            />
                            <button
                                onClick={handleSignOut}
                                className='SignOut__Btn'
                            >
                                <Link to='/userSignIn'>Sign Out</Link>
                            </button>
                            <div>
                                User: {userData && userData.first_name}{' '}
                                {userData && userData.last_name}
                                <br />
                                Id: {userData && userData.id}
                            </div>
                        </>
                    )}
                </div>
                <div className='UserProfile__PurchaseHistory'>
                    <h2>My Purchase History</h2>
                    <button
                        type='button'
                        className='ClearPurchaseHistory__Btn'
                        onClick={() => dispatch(clearHistory())}
                    >
                        Clear History
                    </button>
                    <Table
                        striped
                        bordered
                        hover
                    >
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
            </ErrorBoundary>
        </div>
    );
};

export default UserProfile;
