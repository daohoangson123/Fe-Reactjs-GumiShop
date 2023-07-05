const initState = {
    myCart: [],
    purchaseHistory: [],
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
                myCart: state.myCart.filter(
                    (item) => item.id !== action.payload.id,
                ),
            };

        default:
            return state;
    }
};

export default rootReducer;
