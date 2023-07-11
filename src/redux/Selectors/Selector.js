//trong useSelector se co san tham so la state
export const myCartSelector = (state) => {
    return state.myCart;
};

export const myPurchaseHistorySelector = (state) => {
    return state.purchaseHistory;
};

export const signinSelector = (state) => {
    return state.isSignIn;
};
