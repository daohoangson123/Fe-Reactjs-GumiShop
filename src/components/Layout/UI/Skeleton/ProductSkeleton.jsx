import Skeleton from 'react-loading-skeleton';
//
import './ProductSkeleton.css';

function ProductSkeleton({
    imgWidth,
    imgHeight,
    contentWidth,
    contentHeight,
    count,
    boderRadius,
    circle,
}) {
    return (
        <>
            <div className="ProductSkeleton">
                <Skeleton
                    className="ProductSkeleton__Img"
                    width={imgWidth}
                    height={imgHeight}
                    borderRadius={boderRadius}
                    circle={circle}
                />
                <Skeleton
                    className="ProductSkeleton__Content"
                    width={contentWidth}
                    height={contentHeight}
                    count={count || 3}
                />
            </div>
            <div className="ProductSkeleton">
                <Skeleton
                    className="ProductSkeleton__Img"
                    width={imgWidth}
                    height={imgHeight}
                    borderRadius={boderRadius}
                    circle={circle}
                />
                <Skeleton
                    className="ProductSkeleton__Content"
                    width={contentWidth}
                    height={contentHeight}
                    count={count || 3}
                />
            </div>
            <div className="ProductSkeleton">
                <Skeleton
                    className="ProductSkeleton__Img"
                    width={imgWidth}
                    height={imgHeight}
                    borderRadius={boderRadius}
                    circle={circle}
                />
                <Skeleton
                    className="ProductSkeleton__Content"
                    width={contentWidth}
                    height={contentHeight}
                    count={count || 3}
                />
            </div>
            <div className="ProductSkeleton">
                <Skeleton
                    className="ProductSkeleton__Img"
                    width={imgWidth}
                    height={imgHeight}
                    borderRadius={boderRadius}
                    circle={circle}
                />
                <Skeleton
                    className="ProductSkeleton__Content"
                    width={contentWidth}
                    height={contentHeight}
                    count={count || 3}
                />
            </div>
        </>
    );
}

export default ProductSkeleton;
