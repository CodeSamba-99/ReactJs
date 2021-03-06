import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../Utility';

// if you want to leanear code you can make use of Utility
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    buliding:false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        buliding:true
    }
    return updatedObject(state, updatedState);
}

const removeIngerdient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngs = updatedObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        buliding:true
    }
    return updatedObject(state, updatedSt);
}

const setIngreDient = (state, action) => {
    return updatedObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        buliding:false
    })
}

const fetchIngredientsFaild = (state) => {
    return updatedObject(state, { error: true })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);      
        case actionTypes.REMOVE_INGREDIENT: return removeIngerdient(state, action);
        case actionTypes.SET_INGREDIENT: return setIngreDient(state, action)    
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFaild(state, action); 
        default:return state;
    }
};

export default reducer;