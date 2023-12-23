const initState = {
    myCart: [],
    purchaseHistory: [],
    isSignIn: undefined,
    userData: undefined,
    isMenuOpen: false,
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
                                if (
                                    item.id === action.payload.id &&
                                    item.stock === undefined
                                ) {
                                    return (item.amount +=
                                        action.payload.amount);
                                }
                                if (
                                    item.id === action.payload.id &&
                                    item.amount + action.payload.amount <=
                                        item.stock
                                ) {
                                    return (item.amount +=
                                        action.payload.amount);
                                } else if (
                                    item.id === action.payload.id &&
                                    item.amount + action.payload.amount >
                                        item.stock
                                ) {
                                    throw new Error('maxed stock');
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
        case 'Submit_Cart':
            return {
                ...state,
                purchaseHistory: [...state.purchaseHistory, ...action.payload],
                myCart: [],
            };
        case 'Clear_History':
            return {
                ...state,
                purchaseHistory: [],
            };
        case 'SignIn_Successed':
            return {
                ...state,
                isSignIn: action.payload,
            };
        case 'Get_User_Data':
            return {
                ...state,
                userData: action.payload,
            };
        case 'SignOut':
            return {
                ...state,
                isSignIn: undefined,
                userData: undefined,
            };
        case 'ToggleMenu':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen,
            };
        default:
            return state;
    }
};

export default rootReducer;
