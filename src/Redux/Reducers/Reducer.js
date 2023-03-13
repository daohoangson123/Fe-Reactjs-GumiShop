const initState = {
    myCart: [],
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'Add_To_Cart':
            action.payload.amount = 1;
            for (let i = 0; i < state.myCart.length; i++) {
                if (state.myCart[i].id === action.payload.id) {
                    state.myCart[i].amount++;
                    return {
                        ...state,
                        myCart: [...state.myCart],
                    };
                }
            }
            return {
                ...state,
                myCart: [...state.myCart, action.payload],
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
