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
    signinSelector,
} from '../../../../redux/Selectors/Selector';
import { userData } from '../../../../data/axiosAPI/userData';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const UserProfile = () => {
    const purchaseHistory = useSelector(myPurchaseHistorySelector);
    const token = useSelector(signinSelector);
    const id = token.charAt(token.length - 1);
    const dispatch = useDispatch();
    const [user, setUser] = useState();
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

    const fetchUserData = async () => {
        const result = await userData(id);
        if (result) {
            setTimeout(() => setUser(result.data), 1000);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className='UserProfile Container'>
            <div className='UserProfile__UserData'>
                {!user ? (
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
                            src={user && user.avatar}
                            alt={user && user.first_name}
                        />
                        <button
                            onClick={handleSignOut}
                            className='SignOut__Btn'>
                            <Link to='/userSignIn'>Sign Out</Link>
                        </button>
                        <div>
                            User: {user && user.first_name}{' '}
                            {user && user.last_name}
                            <br />
                            Id: {user && user.id}
                        </div>
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
