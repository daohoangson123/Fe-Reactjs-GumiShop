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
//

const Wholesale = ({ title, productApi }) => {
    const [curCategory, setCurCategory] = useState('All');
    const [curBrand, setCurBrand] = useState('All');
    const [showFilter, setShowFilter] = useState(true);
    //lọc và trả về tất cả value có key categories
    //check trước xem có key ko để tránh error
    //ép kiểu để đồng nhất data
    const getAllCategories = productApi
        .filter((item) => item.categories)
        .map((item) => {
            if (item.categories) {
                return item.categories.toString().toLowerCase();
            }
            return item.categories.toString().toLowerCase();
        });
    //tạo obj để chứa cộng dồn các key trùng lặp
    //cú pháp obj[key]
    const filteredCategories = {};
    getAllCategories.forEach((item) => {
        if (!filteredCategories[item]) {
            filteredCategories[item] = 1;
        } else {
            filteredCategories[item] = filteredCategories[item] + 1;
        }
    });
    //truy xuất key
    const categoriesList = Object.keys(filteredCategories);
    //sau khi load được data mới đẩy key 'All' vào
    if (productApi.length > 0) {
        categoriesList.unshift('All');
    }
    //tương tự cho key brand
    const getAllBrands = productApi
        .filter((item) => item.brand)
        .map((item) => {
            if (item.brand) {
                return item.brand.toString().toLowerCase();
            }
            return item.brand.toString().toLowerCase();
        });
    const filteredBrands = {};
    getAllBrands.forEach((item) => {
        if (!filteredBrands[item]) {
            filteredBrands[item] = 1;
        } else {
            filteredBrands[item] = filteredBrands[item] + 1;
        }
    });
    const brandsList = Object.keys(filteredBrands);
    if (productApi.length > 0 && brandsList.length > 0) {
        brandsList.unshift('All');
    }
    //
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

    const productLenghtByFilter =
        curCategory === 'All' && curBrand === 'All'
            ? productApi.length
            : curCategory !== 'All' && curBrand === 'All'
            ? categoryOnly.length
            : curCategory === 'All' && curBrand !== 'All'
            ? brandOnly.length
            : mutipleFilter.length;

    return (
        <>
            <h2>{title}</h2>
            {productApi.length > 0 && (
                <button
                    className='ToggleFilter'
                    type='button'
                    onClick={() => setShowFilter(!showFilter)}>
                    {showFilter ? 'Hide filter' : 'Show filter'}
                </button>
            )}
            <form
                className='Wholesale__Filter'
                style={{
                    display:
                        showFilter && productApi.length !== 0 ? 'grid' : 'none',
                }}>
                <ul className='Wholesale__CategoryFilter__List'>
                    {categoriesList.length > 0 && <h4>Categories:</h4>}
                    {categoriesList.map((category) => (
                        <li
                            key={category}
                            onClick={() => setCurCategory(category)}>
                            <button
                                type='button'
                                disabled={productApi.length === 0}
                                style={
                                    curCategory === category
                                        ? {
                                              backgroundColor:
                                                  'var(--color-primary)',
                                              color: 'var(--color-default)',
                                          }
                                        : null
                                }>
                                {category.charAt(0).toUpperCase() +
                                    category.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>
                <ul className='Wholesale__BrandFilter__List'>
                    {brandsList.length > 0 && <h4>Brands:</h4>}
                    {brandsList.map((brand) => (
                        <li
                            key={brand}
                            onClick={() => setCurBrand(brand)}>
                            <button
                                type='button'
                                disabled={productApi.length === 0}
                                style={
                                    curBrand === brand
                                        ? {
                                              backgroundColor:
                                                  'var(--color-primary)',
                                              color: 'var(--color-default)',
                                          }
                                        : null
                                }>
                                {brand.charAt(0).toUpperCase() + brand.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>
                {productApi.length !== 0 && (
                    <span>Product available: {productLenghtByFilter}</span>
                )}
            </form>
            <div className='Wholesale__Container'>
                {productApi.length === 0 ? (
                    <>
                        <ProductSkeleton imgWidth={200} />
                        <ProductSkeleton imgWidth={200} />
                    </>
                ) : productLenghtByFilter === 0 ? (
                    <img
                        src={noItem}
                        alt='noProduct'
                        className='Wholesale__NoItem'
                    />
                ) : curCategory === 'All' && curBrand === 'All' ? (
                    productApi.map((item) => (
                        <WholesaleProduct
                            key={item._id}
                            props={item}
                        />
                    ))
                ) : curBrand === 'All' && curCategory !== 'All' ? (
                    categoryOnly.map((item) => (
                        <WholesaleProduct
                            key={item._id}
                            props={item}
                        />
                    ))
                ) : curBrand !== 'All' && curCategory === 'All' ? (
                    brandOnly.map((item) => (
                        <WholesaleProduct
                            key={item._id}
                            props={item}
                        />
                    ))
                ) : (
                    mutipleFilter.map((item) => (
                        <WholesaleProduct
                            key={item._id}
                            props={item}
                        />
                    ))
                )}
            </div>
        </>
    );
};

const WholesaleLayout = () => {
    const [hektoApi, setHektoApi] = useState([]);
    const [furApi, setFurApi] = useState([]);
    const getWholesaleApi = async () => {
        let result = await fetchHektoApi();
        let result1 = await fetchFurnitureApi();

        if (result || result1) {
            setHektoApi(result);
            setFurApi(result1);
        }
    };

    useEffect(() => {
        getWholesaleApi();
    }, []);

    return (
        <div className='Wholesale Container'>
            <Wholesale
                title={'Hekto'}
                productApi={hektoApi}
            />
            <br />
            <Wholesale
                title={'Furniture'}
                productApi={furApi}
            />
        </div>
    );
};

export default WholesaleLayout;
