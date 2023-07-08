const initState = {
    myCart: [],
    purchaseHistory: [],
    isSignIn: false,
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'Add_To_Cart':
            for (let i = 0; i < state.myCart.length; i++) {
                if (state.myCart[i].id === action.payload.id) {
                    return {
                        ...state,
                        myCart: [
                            ...state.myCart.filter((item) => {
                                if (item.id === action.payload.id) {
                                    return (item.amount +=
                                        action.payload.amount);
                                }
                                return state.myCart;
                            }),
                        ],
                    };
                }
            }
            return {
                ...state,
                myCart: [...state.myCart, action.payload],
            };
        case 'Cart_Item_Inc':
            for (let i = 0; i < state.myCart.length; i++) {
                if (state.myCart[i].id === action.payload.id) {
                    return {
                        ...state,
                        myCart: [
                            ...state.myCart.filter((item) => {
                                if (item.id === action.payload.id) {
                                    return item.amount++;
                                }
                                return state.myCart;
                            }),
                        ],
                    };
                }
            }
            return;
        case 'Cart_Item_Dec':
            for (let i = 0; i < state.myCart.length; i++) {
                if (state.myCart[i].id === action.payload.id) {
                    return {
                        ...state,
                        myCart: [
                            ...state.myCart.filter((item) => {
                                if (item.id === action.payload.id) {
                                    return item.amount--;
                                }
                                return state.myCart;
                            }),
                        ],
                    };
                }
            }
            return;
        case 'Remove_In_Cart':
            return {
                ...state,
                myCart: state.myCart.filter(
                    (item) => item.id !== action.payload.id,
                ),
            };
        case 'SignIn__Successed':
            return {
                ...state,
                isSignIn: true,
            };
        case 'SignOut':
            return {
                ...state,
                isSignIn: false,
            };
        default:
            return state;
    }
};

export default rootReducer;
