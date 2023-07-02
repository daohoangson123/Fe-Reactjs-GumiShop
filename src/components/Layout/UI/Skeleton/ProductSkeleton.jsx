import Skeleton from 'react-loading-skeleton';

function ProductSkeleton({ width, height }) {
    return (
        <>
            <div>
                <Skeleton
                    width={width || 250}
                    height={height || 250}
                />
                <Skeleton
                    width={200}
                    count={3}
                />
            </div>
            <div>
                <Skeleton
                    width={width || 250}
                    height={height || 250}
                />
                <Skeleton
                    width={200}
                    count={3}
                />
            </div>
            <div>
                <Skeleton
                    width={width || 250}
                    height={height || 250}
                />
                <Skeleton
                    width={200}
                    count={3}
                />
            </div>
            <div>
                <Skeleton
                    width={width || 250}
                    height={height || 250}
                />
                <Skeleton
                    width={200}
                    count={3}
                />
            </div>
        </>
    );
}

export default ProductSkeleton;
