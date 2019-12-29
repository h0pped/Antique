
export const ADD_PRODUCT_CART = "product/ADD_CARD";
export const DELETE_PRODUCT_CART = "product/DELETE_CARD";
export const CLEAR_CART = "product/CLEAR_CART";

const initialState = {
    products: [],
    total:0
}


export const cartReducer = (state = initialState, action) => {
    let newState = state;
    let total = newState.total;

    switch (action.type) {

        case ADD_PRODUCT_CART: { 
            total+=action.product.price
            return { 
                ...state,
                products: [...state.products, action.product],
                total:total
            }
        }
        case DELETE_PRODUCT_CART: { 
            total-=newState.products[action.id].price
            return { 
                ...state,
                products: [...state.products.slice(0, action.id),
                    ...state.products.slice(action.id + 1)],
                    total:total
            }
        }
        case CLEAR_CART: { 
            return { 
                ...state,
                products: [],
                    total:0
            }
        }
        default: {
            return newState;
        }
    }

}

export const AddProductToCart = (model) => {
    return (dispatch) => {
        dispatch(cartActions.addProduct(model));
    }
}
export const deleteProductFromCart = (id) => {
    return (dispatch) => {
        dispatch(cartActions.deleteProduct(id));
    }
}
export const clearCart = () => {
    return (dispatch) => {
        dispatch(cartActions.clearCart());
    }
}
export const cartActions = {
    addProduct: (product) => {
        return {
            type: ADD_PRODUCT_CART,
            product
        }
    },
    deleteProduct:(id)=>{
        return{
            type: DELETE_PRODUCT_CART,
            id
        }
    },
    clearCart:()=>{
        return{
            type: CLEAR_CART
        }
    }
}