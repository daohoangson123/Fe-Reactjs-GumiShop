import { useState } from 'react';

const WholesaleFilter = ({
    productApi,
    filtered,
    categoriesList,
    brandsList,
    curCategory,
    setCurCategory,
    curBrand,
    setCurBrand,
}) => {
    const [showFilter, setShowFilter] = useState(true);

    return (
        <div className='WholesaleFilter'>
            <button
                className='ToggleFilter'
                type='button'
                onClick={() => setShowFilter(!showFilter)}>
                {showFilter ? 'Hide filter' : 'Show filter'}
            </button>
            <form className='Wholesale__Filter'>
                <div
                    className='Wholesale__Filter-Container'
                    style={
                        !showFilter
                            ? {
                                  animation: 'hideFilter 0.3s linear forwards',
                              }
                            : {
                                  animation: 'showFilter 0.3s linear forwards',
                              }
                    }>
                    {categoriesList.length > 0 && (
                        <ul className='Wholesale__CategoryFilter__List'>
                            <h4>Categories:</h4>
                            <li onClick={() => setCurCategory('All')}>
                                <button
                                    type='button'
                                    disabled={productApi.length === 0}
                                    style={
                                        curCategory === 'All'
                                            ? {
                                                  backgroundColor:
                                                      'var(--color-primary)',
                                                  color: 'var(--color-default)',
                                              }
                                            : null
                                    }>
                                    All
                                </button>
                            </li>
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
                    )}
                    {brandsList.length > 0 && (
                        <ul className='Wholesale__BrandFilter__List'>
                            <h4>Brands:</h4>
                            <li onClick={() => setCurBrand('All')}>
                                <button
                                    type='button'
                                    disabled={productApi.length === 0}
                                    style={
                                        curBrand === 'All'
                                            ? {
                                                  backgroundColor:
                                                      'var(--color-primary)',
                                                  color: 'var(--color-default)',
                                              }
                                            : null
                                    }>
                                    All
                                </button>
                            </li>
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
                                        {brand.charAt(0).toUpperCase() +
                                            brand.slice(1)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </form>
            <div style={{ textAlign: 'center', marginBlock: '10px' }}>
                {productApi.length !== 0 && (
                    <span>Product available: {filtered.length}</span>
                )}
            </div>
        </div>
    );
};

export default WholesaleFilter;
