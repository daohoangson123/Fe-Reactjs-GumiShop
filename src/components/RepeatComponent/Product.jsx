import './Product.css';

const Product = ({...props}) => {
    return (
        <div className="Product">
            <div className="Product__Img-Container">
                <img src={props.url} alt={props.name} />
                {props.sale
                ? <div className='Product__Sale'>ON SALE</div>
                : null
                }
            </div>
            <div className="Product__Name" style={props.style}>
                {props.name}
            </div>
            <div className="Product__Prices">
                <span className='SalePrices'>
                    {props.saleprices}
                </span>
                <span className='Prices'>
                    {props.prices}
                </span>
            </div>
        </div>
    )
}

export default Product;