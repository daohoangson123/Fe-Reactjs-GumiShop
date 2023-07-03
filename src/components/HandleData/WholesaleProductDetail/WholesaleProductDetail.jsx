import WholesaleProductDetailLayout from './WholesaleProductDetailLayout';
import ErrorBoundary from '../../Support/Error/ErrorBoundary';

const WholesaleProductDetail = () => {
    return (
        <div className='WholesaleProductDetail'>
            <ErrorBoundary>
                <WholesaleProductDetailLayout />
            </ErrorBoundary>
        </div>
    );
};

export default WholesaleProductDetail;
