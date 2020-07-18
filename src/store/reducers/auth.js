import * as actionTypes  from "../actions/actionTypes";
import {updateObject} from '../utility';

let initialState={
    token: null,
    userId:null,
    error:null,
    loading: false,
    authRedirectPath:'/'
}

let authStart = (state,action) =>{
    return updateObject(state,{error:null,loading:true});
}

let authSuccess= (state,action) =>{
    return updateObject(state,{
        token:action.idToken,
        userId:action.userId,
        error:null,
        loading:false
    })
}

let authFail =(state,action) =>{
    return updateObject(state,{
        error:action.error,
        loading:false
    })
}

let authLogout = (state,action) =>{
    return updateObject(state,{token:null,userId:null});
}

let setAuthRedirectPath=(state,action) =>{
    return updateObject(state,{authRedirectPath:action.path})
}
let reducer=(state=initialState,action) =>{
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);    
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);    
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);    
        default:
            return state;
    }
}

export default reducer;