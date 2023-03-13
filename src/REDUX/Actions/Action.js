export const addToCart = (newProduct) => {
    return {
        type: 'Add_To_Cart',
        payload: newProduct,
    };
};

export const removeInCart = (currentProduct) => {
    return {
        type: 'Remove_In_Cart',
        payload: currentProduct,
    };
};
