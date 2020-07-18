import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
//import { setIngredients } from '../actions/burgerBuilder';


let initialState = {
        ingredients:null,
        totalPrice:15,
        error:false,
        building:false
};

let INGREDIENT_PRICES = {
    salad: 5,
    cheese:7,
    meat:9,
    bacon:4
}

let addIngredient = (state,action) => {
    let updatedIngredient={[action.ingredientName]:state.ingredients[action.ingredientName] + 1};
    let updatedIngredients=updateObject(state.ingredients,updatedIngredient);
    let updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building:true
         }
        return updateObject(state,updatedState);
}
let removeIngredient = (state,action) => {
    let updatedIngredient1={[action.ingredientName]:state.ingredients[action.ingredientName] - 1};
    let updatedIngredients1=updateObject(state.ingredients,updatedIngredient1);
    let updatedState1 = {
        ingredients: updatedIngredients1,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building:true
        }
        return updateObject(state,updatedState1);
}

let setIngredient = (state,action)=>{
    return updateObject(state,{
        ingredients:{
            salad:action.ingredients.salad,
            bacon:action.ingredients.bacon,
            cheese:action.ingredients.cheese,
            meat:action.ingredients.meat
        },
        totalPrice:15,
        error: false,
        building:false
    })
};

let fetchIngredientFailed = (state,action) => {
    return updateObject(state,{error:true})
};

let reducer = (state=initialState,action)=>{
        switch(action.type){
            case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);  
            case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
            case actionTypes.SET_INGREDIENTS: return setIngredient(state,action);
            case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientFailed(state,action);    
            default: return state;
        }
}

export default reducer;