
import Axios from "axios"

export const onUSerRegister = (email,password) => {
    return(dispatch) => {
        dispatch(
            {
                type: `LOADING`
            }
        )
        Axios.post(`http://localhost:4000/authentic-system/register`, {email: email, password: password})
        .then((res)=> {
            console.log(res)
            dispatch(
                {
                    type: `AUTH_SUCCESS`,
                    payload: res.data.message
                }
            )
        })
        .catch((err)=> {
            console.log(err)
            dispatch(
                {
                    type: `AUTH_ERROR`,
                    payload: err.res.data.message
                }
            )
        })
    }
}

// export const onUserLogin = (data) => {
//     return(dispatch) => {
//         dispatch({
//             type : `LOADING`
//         })
//         Axios.post(`http://localhost:4000/authentic-system/login`, data)
//         .then((res) => {
//             console.log(res.data)
//         })
//         .catch((err)=> {
//             console.log(err)
//         })
//     }
// }

export const onUserLogin = (data) => {
    return(dispatch) => {
        dispatch ({
            type : `LOADING`
        })
        Axios.post(`http://localhost:4000/authentic-system/login`, data)
        .then((res)=> {
            console.log(res.data.message)
            if(res.data.error === false){
                
                dispatch(
                    {
                        type: `LOGIN_SUCCESS`,
                        payload: res.data.data.token
                    }
                )
            }else {
                dispatch(
                    {
                        type: `LOGIN_ERROR`,
                        payload: res.data.message
                    }
                )
            }           
        })
        .catch((err)=> {
            dispatch(
                {
                    type: `LOGIN_ERROR`,
                    payload: err.response.data.message
                    
                }
            )
            
        })
     
    }
}

export const onuserLogout = (data) => {
    return(dispatch) => {
        Axios.post(`http://localhost:4000/authentic-system/logout`, data)
        .then((res)=> {
            console.log(res.data)
            localStorage.removeItem("my-tkn")
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

export const checkUserVerify = (token) => {
    return(dispatch) => {
        Axios.post(`http://localhost:4000/authentic-system/user-verify`, {token})
        .then((res) => {
            console.log(res.data.is_email_confirmed)
            dispatch({
                type: `CHECK_USER_VERIFY_SUCCESS`,
                payload: res.data.is_email_confirmed
            })
        })
        .catch((err) => {
           dispatch({
               type: `CHECK_USER_VERIFY_ERROR`,
               payload: err.response.data.message
           })
        })
    }
}