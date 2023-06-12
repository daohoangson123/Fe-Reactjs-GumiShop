import Skeleton from 'react-loading-skeleton';

function ProductSkeleton() {
    return (
        <>
            <div>
                <Skeleton
                    width={250}
                    height={250}
                />
                <Skeleton
                    width={200}
                    count={3}
                />
            </div>
            <div>
                <Skeleton
                    width={250}
                    height={250}
                />
                <Skeleton
                    width={200}
                    count={3}
                />
            </div>
            <div>
                <Skeleton
                    width={250}
                    height={250}
                />
                <Skeleton
                    width={200}
                    count={3}
                />
            </div>
            <div>
                <Skeleton
                    width={250}
                    height={250}
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
