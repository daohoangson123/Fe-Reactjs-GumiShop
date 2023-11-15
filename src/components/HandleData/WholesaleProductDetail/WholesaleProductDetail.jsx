import WholesaleProductDetailLayout from './WholesaleProductDetailLayout';
import ErrorBoundary from '../../Support/Error/ErrorBoundary';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchFurnitureApi } from '../../../data/axiosAPI/furnitureData';
import { fetchHektoApi } from '../../../data/axiosAPI/hektoData';
import { addToCart } from '../../../redux/Actions/Action';
import { toast } from 'react-toastify';

const WholesaleProductDetail = () => {
    const shipOpt = [
        { label: 'ABC', value: 'ABC' },
        { label: 'XYZ', value: 'XYZ' },
    ];

    const { id } = useParams();
    const dispatch = useDispatch();
    const [productDetail, setProductDetail] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [curColor, setCurColor] = useState(undefined);
    const [isColorPick, setIsColorPick] = useState(false);
    const [shipOption, setShipOption] = useState(shipOpt[0].label);
    const orgPrice =
        productDetail && productDetail.price + productDetail.discouter;
    const salePercent =
        100 - (productDetail && productDetail.price / orgPrice) * 100;

    const addNotify = () =>
        toast.success(
            `${quantity + ' ' + productDetail.name} added to your Cart`,
            {
                position: 'bottom-right',
            },
        );

    const colorPickNotify = () =>
        toast.error(`Please pick color`, {
            position: 'top-center',
        });

    function handleAddToCart(product) {
        if (product.color !== undefined) {
            dispatch(addToCart(product));
            addNotify();
        } else {
            colorPickNotify();
        }
    }

    const getProducts = async () => {
        let result = await fetchHektoApi();
        let result1 = await fetchFurnitureApi();

        let productRes = [...result, ...result1];

        const findProductDetail = productRes.find(
            (product) => product._id.toString() === id.toString(),
        );
        setProductDetail(findProductDetail);
    };

    useEffect(() => {
        setProductDetail([]);
        getProducts();
    }, [id]);
    return (
        <div className='WholesaleProductDetail'>
            <ErrorBoundary>
                <WholesaleProductDetailLayout
                    productDetail={productDetail}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    curColor={curColor}
                    setCurColor={setCurColor}
                    handleAddToCart={handleAddToCart}
                    orgPrice={orgPrice}
                    salePercent={salePercent}
                    shipOpt={shipOpt}
                    shipOption={shipOption}
                    setShipOption={setShipOption}
                    isColorPick={isColorPick}
                    setIsColorPick={setIsColorPick}
                />
            </ErrorBoundary>
        </div>
    );
};

export default WholesaleProductDetail;
