const initState = {
    myCart: [],
    purchaseHistory: [],
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'Add_To_Cart':
            for (let i = 0; i < state.myCart.length; i++) {
                if (
                    state.myCart[i].id === action.payload.id &&
                    state.myCart[i].amount === action.payload.amount
                ) {
                    return {
                        ...state,
                    };
                }
            }
            return {
                ...state,
                myCart: [
                    ...state.myCart.filter(
                        (item) => item.id !== action.payload.id,
                    ),
                    action.payload,
                ],
            };
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
