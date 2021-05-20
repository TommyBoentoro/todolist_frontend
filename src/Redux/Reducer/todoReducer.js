let initialState = {
    loading: false,
    data: null,
    message: null
}

const todoReducer = (state = initialState, action) => {
    switch(action.type){
        case `LOADING`: 
            return {...state, loading: true}   
        case `TODO_SUCCESS` :
            return {...state, data: action.payload, loading: false}
        case `TODO_ERROR` :
            return {...state, message: action.payload, loading: false}
        case `DONE_SUCCESS` :
            return {...state, data:action.payload}
        case `DONE_ERROR`:
            return{...state, message: action.payload}
        case `DELETE_ERROR`:
            return{...state, data:action.payload}
        case `DELETE_ERROR`:
            return{...state, message: action.payload}
        default :
            return state
    }
}

export default todoReducer