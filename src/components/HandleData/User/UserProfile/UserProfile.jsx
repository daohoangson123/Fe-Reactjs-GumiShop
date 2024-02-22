import './UserProfile.css';
//
import Table from 'react-bootstrap/Table';
//
import { useDispatch, useSelector } from 'react-redux';
import {
    addNewProduct,
    clearHistory,
    removeProduct,
    userSignOut,
} from '../../../../redux/Actions/Action';
import { Link } from 'react-router-dom';
//
import { Zoom, toast } from 'react-toastify';
import {
    adminProductSelector,
    myPurchaseHistorySelector,
    userSelector,
} from '../../../../redux/Selectors/Selector';
import Skeleton from 'react-loading-skeleton';
import { logoutRequest } from '../../../../data/axiosAPI/userSignout';
import ErrorBoundary from '../../../Support/Error/ErrorBoundary';
import { useRef, useState } from 'react';

const UserProfile = () => {
    const dispatch = useDispatch();
    const purchaseHistory = useSelector(myPurchaseHistorySelector);
    const adminProduct = useSelector(adminProductSelector);
    const userData = useSelector(userSelector);
    const [productData, setProductData] = useState();
    const inputFile = useRef(null);

    const handleSignOut = () => {
        dispatch(userSignOut());
        logoutRequest();
        signoutNotify();
    };

    const signoutNotify = () =>
        toast.error(`You have been Signed Out`, {
            transition: Zoom,
        });

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleAdd = (product) => {
        dispatch(addNewProduct(product));
        setProductData({ name: '', price: '', imgUrl: '' });
        //reset input file
        if (inputFile.current) {
            inputFile.current.value = '';
            inputFile.current.type = 'text';
            inputFile.current.type = 'file';
        }
    };

    const handleRemove = (id) => {
        dispatch(removeProduct(id));
    };

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
                                src={userData?.avatar}
                                alt={userData?.first_name}
                            />
                            <div>
                                User: {userData?.first_name}{' '}
                                {userData?.last_name}
                                <br />
                                Id: {userData?.id} -{' '}
                                {userData?.id === 1 ? 'Admin' : 'Customer'}
                            </div>
                            <button
                                onClick={handleSignOut}
                                className='SignOut__Btn'>
                                <Link to='/userSignIn'>Sign Out</Link>
                            </button>
                        </>
                    )}
                </div>
                {userData?.id === 1 ? (
                    <div className='Admin-Product-Control'>
                        <div className='ProductsList'>
                            <span>Products List: </span>
                            <Table
                                striped
                                bordered
                                hover>
                                <thead>
                                    <tr>
                                        <th>Img</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                {adminProduct && (
                                    <tbody>
                                        {adminProduct.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <img
                                                        src={item?.img}
                                                        alt='productImg'
                                                        style={{
                                                            width: '50px',
                                                            height: '50px',
                                                            objectFit:
                                                                'contain',
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            handleRemove({
                                                                name: item?.name,
                                                            })
                                                        }>
                                                        Delete
                                                    </button>
                                                </td>
                                                <td>{item?.name}</td>
                                                <td>{item?.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </Table>
                        </div>
                        <div className='ProductsAdding'>
                            <form
                                className='ProductsAddingForm'
                                onSubmit={handleSubmit}>
                                <fieldset>
                                    <legend>New Product</legend>
                                    <label htmlFor='productName'>Name:</label>
                                    <input
                                        type='text'
                                        id='productName'
                                        value={productData?.name || ''}
                                        onChange={(event) =>
                                            setProductData({
                                                ...productData,
                                                name: event.target.value,
                                            })
                                        }
                                    />
                                    <label htmlFor='productPrice'>Price:</label>
                                    <input
                                        type='number'
                                        id='productPrice'
                                        value={productData?.price || ''}
                                        onChange={(event) =>
                                            setProductData({
                                                ...productData,
                                                price: event.target.value,
                                            })
                                        }
                                    />
                                    <label htmlFor='productImg'>Image:</label>
                                    <input
                                        type='file'
                                        id='productImg'
                                        ref={inputFile}
                                        onChange={(event) => {
                                            setProductData({
                                                ...productData,
                                                img: URL.createObjectURL(
                                                    event.target.files[0],
                                                ),
                                            });
                                        }}
                                    />
                                    OR
                                    <label htmlFor='imgUrl'>URL:</label>
                                    <input
                                        type='url'
                                        id='imgUrl'
                                        value={productData?.imgUrl || ''}
                                        onChange={(event) =>
                                            setProductData({
                                                ...productData,
                                                imgUrl: event.target.value,
                                            })
                                        }
                                    />
                                    {productData?.img || productData?.imgUrl ? (
                                        <img
                                            src={
                                                productData?.img ||
                                                productData?.imgUrl
                                            }
                                            alt={productData?.name}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    ) : (
                                        'Image preview'
                                    )}
                                    <button
                                        type='submit'
                                        onClick={() =>
                                            handleAdd({
                                                name: productData?.name,
                                                price: productData?.price,
                                                img:
                                                    productData?.img ||
                                                    productData?.imgUrl,
                                            })
                                        }>
                                        Add
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                ) : (
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
                                            {purchaseHistory.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.date}</td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    )}
                                </Table>
                            </div>
                        )}
                    </div>
                )}
            </ErrorBoundary>
        </div>
    );
};

export default UserProfile;
