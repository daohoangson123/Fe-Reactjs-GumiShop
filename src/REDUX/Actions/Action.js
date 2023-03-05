export const addToCart = newProduct => {
    return {
        type: 'Add_To_Cart',
        payload: newProduct
    }
}