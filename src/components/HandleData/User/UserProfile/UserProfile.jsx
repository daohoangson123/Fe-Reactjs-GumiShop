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
import { logoutRequest } from '../../../../data/axiosAPI/userSignout';
import ErrorBoundary from '../../../Support/Error/ErrorBoundary';
import { useRef, useState } from 'react';
import Loading from '../../../Layout/UI/Loading/Loading';

const UserProfile = () => {
    const dispatch = useDispatch();
    const purchaseHistory = useSelector(myPurchaseHistorySelector);
    const adminProduct = useSelector(adminProductSelector);
    const userData = useSelector(userSelector);
    const [productData, setProductData] = useState();
    const [isImgLoaded, setIsImgLoaded] = useState();
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
        <div className="UserProfile Container">
            <ErrorBoundary>
                <div className="UserProfile__UserData">
                    <div className="UserProfile__UserImgContainer">
                        {!isImgLoaded && (
                            <div>
                                <Loading />
                            </div>
                        )}
                        <img
                            src={userData?.avatar}
                            alt={userData?.first_name}
                            fetchpriority="high"
                            loading="lazy"
                            onLoad={() => setIsImgLoaded(true)}
                        />
                    </div>
                    <div>
                        User: {userData?.first_name} {userData?.last_name}
                        <br />
                        Id: {userData?.id} -{' '}
                        {userData?.id === 1 ? 'Admin' : 'Customer'}
                    </div>
                    <button onClick={handleSignOut} className="SignOut__Btn">
                        <Link to="/user-signin">Sign Out</Link>
                    </button>
                </div>
                {userData?.id === 1 ? (
                    <div className="Admin-Product-Control">
                        <div className="ProductsAdding">
                            <form
                                className="ProductsAddingForm"
                                onSubmit={handleSubmit}
                            >
                                <fieldset>
                                    <legend>New Product</legend>
                                    <label htmlFor="productName">Name:</label>
                                    <input
                                        type="text"
                                        id="productName"
                                        value={productData?.name || ''}
                                        onChange={(event) =>
                                            setProductData({
                                                ...productData,
                                                name: event.target.value,
                                            })
                                        }
                                    />
                                    <label htmlFor="productPrice">
                                        Price(max=300):
                                    </label>
                                    <input
                                        type="number"
                                        id="productPrice"
                                        value={productData?.price}
                                        min={1}
                                        max={300}
                                        onWheel={(event) => event.target.blur()}
                                        onChange={(event) => {
                                            let price = event.target.value;
                                            if (price < 300) {
                                                setProductData({
                                                    ...productData,
                                                    price: event.target.value,
                                                });
                                            } else {
                                                setProductData({
                                                    ...productData,
                                                    price: 300,
                                                });
                                            }
                                        }}
                                        onInput={
                                            (event) =>
                                                (event.currentTarget.value =
                                                    event.currentTarget.value
                                                        .replace(
                                                            /[^0-9\\.]+/g,
                                                            ''
                                                        )
                                                        .replace(
                                                            /(\..*?)\..*/g,
                                                            '$1'
                                                        )
                                                        .replace('.', '')
                                                        .replace(',', '')
                                                        .replace(/^0/, '')) //ko cho nhập số 0 đầu
                                        }
                                    />
                                    <label htmlFor="productImg">Image:</label>
                                    <input
                                        type="file"
                                        id="productImg"
                                        ref={inputFile}
                                        onChange={(event) => {
                                            setProductData({
                                                ...productData,
                                                img: URL.createObjectURL(
                                                    event.target.files[0]
                                                ),
                                            });
                                        }}
                                    />
                                    OR
                                    <label htmlFor="imgUrl">URL:</label>
                                    <input
                                        type="url"
                                        id="imgUrl"
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
                                            loading="lazy"
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
                                        type="submit"
                                        onClick={() =>
                                            handleAdd({
                                                name: productData?.name,
                                                price: productData?.price,
                                                img:
                                                    productData?.img ||
                                                    productData?.imgUrl,
                                            })
                                        }
                                    >
                                        Add
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                        <div className="ProductsList">
                            <span>Products List: </span>
                            <Table striped bordered hover>
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
                                                        alt="productImg"
                                                        loading="lazy"
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
                                                        }
                                                    >
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
                        <div className="UserProfile__PurchaseHistory">
                            <h2>Purchase History</h2>
                            <button
                                type="button"
                                className="ClearPurchaseHistory__Btn"
                                onClick={() => dispatch(clearHistory())}
                            >
                                Clear History
                            </button>
                            {purchaseHistory.length > 0 && (
                                <div className="UserProfile__PurchaseHistory-TableContainer">
                                    <Table bordered hover>
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
                                                            <td>
                                                                {item?.name ||
                                                                    item.first_name +
                                                                        item.last_name}
                                                            </td>
                                                            <td>
                                                                {item.amount}
                                                            </td>
                                                            <td>
                                                                {item.price}
                                                            </td>
                                                            <td>{item.date}</td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        )}
                                    </Table>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    'User Data Here'
                )}
            </ErrorBoundary>
        </div>
    );
};

export default UserProfile;
