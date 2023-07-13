//trong useSelector se co san tham so la state

export const signinSelector = (state) => {
    return state.isSignIn;
};

export const userSelector = (state) => {
    return state.userData;
};

export const myCartSelector = (state) => {
    return state.myCart;
};

export const myPurchaseHistorySelector = (state) => {
    return state.purchaseHistory;
};
