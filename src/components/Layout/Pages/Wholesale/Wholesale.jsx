import './Wholesale.css';
//
import { useEffect, useState } from 'react';
//
import { fetchHektoApi } from '../../../../data/axiosAPI/hektoData';
import { fetchFurnitureApi } from '../../../../data/axiosAPI/furnitureData';
import noItem from '../../../../assets/img/noitem.webp';
//
import WholesaleProduct from '../../UI/WholesaleProduct/WholesaleProduct';
import ProductSkeleton from '../../UI/Skeleton/ProductSkeleton';
import WholesaleFilter from './ToggleFilter';
import SectionTitle from '../../UI/SectionTitle/SectionTitle';
import { fetchProductApi } from '../../../../data/axiosAPI/productData';
import mockData from '../../../../data/axiosAPI/mockData';
import Skeleton from 'react-loading-skeleton';
//

const WholesaleLayout = ({ title, productApi }) => {
    const [curCategory, setCurCategory] = useState('All');
    const [curBrand, setCurBrand] = useState('All');
    //lọc và trả về tất cả value có key categories
    //check trước xem có key ko để tránh lỗi
    //ép kiểu để đồng nhất data
    const getAllCategories = productApi
        .filter((item) => item.categories)
        .map((item) => {
            if (item.categories) {
                return item.categories.toString().toLowerCase();
            }
            return false;
        });

    //lọc key trùng lặp
    const categoriesList = getAllCategories.filter((category, index) => {
        return index === getAllCategories.indexOf(category);
    });

    //tương tự cho key brand
    const getAllBrands = productApi
        .filter((item) => item.brand)
        .map((item) => {
            if (item.brand) {
                return item.brand.toString().toLowerCase();
            }
            return false;
        });

    const brandsList = getAllBrands.filter((brand, index) => {
        return index === getAllBrands.indexOf(brand);
    });
    //

    function getFilterItems(productApi, curCategory, curBrand) {
        const categoryOnly = productApi.filter(
            (product) =>
                product.categories &&
                product.categories.toString().toLowerCase() === curCategory,
        );
        const brandOnly = productApi.filter(
            (product) =>
                product.brand &&
                product.brand.toString().toLowerCase() === curBrand,
        );
        const mutipleFilter = productApi.filter(
            (product) =>
                product.categories &&
                product.categories.toString().toLowerCase() === curCategory &&
                product.brand &&
                product.brand.toString().toLowerCase() === curBrand,
        );
        if (curCategory !== 'All' && curBrand === 'All') {
            return categoryOnly;
        }
        if (curCategory === 'All' && curBrand !== 'All') {
            return brandOnly;
        }
        if (curCategory !== 'All' && curBrand !== 'All') {
            return mutipleFilter;
        }
        return productApi;
    }

    const filtered = getFilterItems(productApi, curCategory, curBrand);

    return (
        <div className='WholesaleLayout'>
            {productApi.length > 0 ? (
                <>
                    <SectionTitle content={title} />
                    <WholesaleFilter
                        productApi={productApi}
                        filtered={filtered}
                        categoriesList={categoriesList}
                        brandsList={brandsList}
                        curCategory={curCategory}
                        setCurCategory={setCurCategory}
                        curBrand={curBrand}
                        setCurBrand={setCurBrand}
                    />
                </>
            ) : (
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Skeleton
                        width={200}
                        height={50}
                    />
                </div>
            )}
            <div className='Wholesale__Product-Container'>
                {filtered.length === 0 &&
                curBrand === 'All' &&
                curCategory === 'All' ? (
                    <>
                        <ProductSkeleton imgWidth={200} />
                        <ProductSkeleton imgWidth={200} />
                    </>
                ) : filtered.length === 0 ? (
                    <img
                        src={noItem}
                        alt='noProduct'
                        className='Wholesale__NoItem'
                    />
                ) : (
                    filtered.map((item) => (
                        <WholesaleProduct
                            key={item._id}
                            props={item}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

const Wholesale = () => {
    const [hektoApi, setHektoApi] = useState([]);
    const [furApi, setFurApi] = useState([]);
    const getWholesaleApi = async () => {
        let result = await fetchHektoApi();
        let result1 = await fetchFurnitureApi();
        let altRes = await fetchProductApi();

        if (result || result1) {
            setHektoApi(result);
            setFurApi(result1);
        } else if (altRes) {
            setHektoApi(altRes);
            setFurApi(altRes);
        } else {
            setHektoApi(mockData);
            setFurApi(mockData);
        }
    };

    useEffect(() => {
        getWholesaleApi();
    }, []);

    return (
        <div className='Wholesale Container'>
            <WholesaleLayout
                title={'Hekto'}
                productApi={hektoApi}
            />
            <br />
            <WholesaleLayout
                title={'Furniture'}
                productApi={furApi}
            />
        </div>
    );
};

export default Wholesale;
