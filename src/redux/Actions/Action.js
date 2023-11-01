export const addToCart = (newProduct) => {
    return {
        type: 'Add_To_Cart',
        payload: newProduct,
    };
};

export const newIncAmount = (newAmount) => {
    return {
        type: 'Cart_Item_Inc',
        payload: newAmount,
    };
};

export const newDecAmount = (newAmount) => {
    return {
        type: 'Cart_Item_Dec',
        payload: newAmount,
    };
};

export const removeInCart = (currentProduct) => {
    return {
        type: 'Remove_In_Cart',
        payload: currentProduct,
    };
};

export const submitCart = (currentCart) => {
    return {
        type: 'Submit_Cart',
        payload: currentCart,
    };
};

export const clearHistory = () => {
    return {
        type: 'Clear_History',
    };
};

export const userSignIn = (signinData) => {
    return {
        type: 'SignIn_Successed',
        payload: signinData,
    };
};

export const getUserData = (userData) => {
    return {
        type: 'Get_User_Data',
        payload: userData,
    };
};

export const userSignOut = (signout) => {
    return {
        type: 'SignOut',
        payload: signout,
    };
};

export const toggleMenu = () => {
    return {
        type: 'ToggleMenu',
    };
};
