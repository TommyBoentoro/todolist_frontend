import Axios from "axios"

export const onCreateToDo = (dataToSend) => {
    return(dispatch) => {

        let data = {
            token : dataToSend.token
        }
        dispatch (
            {
                type: `LOADING`
            }
        )
        Axios.post (`http://localhost:4000/todo/create`, dataToSend)
        .then ((res)=> {
            Axios.post(`http://localhost:4000/todo/get`, data)
            .then((response)=> {
                console.log(response.data.Data[0].todolist[0].id)
                localStorage.setItem("id-data", response.data.Data[0].todolist[0].id )
                
                dispatch( 
                    {
                        type: `TODO_SUCCESS`,
                        payload: response.data.Data
                    }
                )
            })
            .catch((error)=>{
                dispatch ({
                    type: `TODO_ERROR`,
                    payload: error.response.data.message
                })
            })
            
        })
        .catch ((err) => {
            dispatch(
                {
                    type: `TODO_ERROR`,
                    payload: err.response.data.message
                }
            )
            
        })
    }
}

export const onGetToDo = (data) => {
    return(dispatch) => {
        Axios.post(`http://localhost:4000/todo/get`, data)
            .then((response)=> {
                dispatch(
                    {
                        type: `TODO_SUCCESS`,
                        payload: response.data.Data
                    }
                )
            })
            .catch((error)=>{
                dispatch ({
                    type: `TODO_ERROR`,
                    payload: error.response
                })
            })
    }
}

export const onDoneToDo = (data) => {
    return(dispatch) => {
        Axios.post(`http://localhost:4000/todo/done`, data)
            .then((response) => {    
                console.log(response)
                // dispatch({
                //     type: `DONE_SUCCESS`,
                //     payload: response.data.data
                // })
            })
            .catch((error) => {
                console.log(error)
                // dispatch({
                //     type: `DONE_ERROR`,
                //     payload: error.response
                // })
            })
    }
}

export const onDeleteToDo = (deleteTodo) => {
    return(dispatch) => {
        Axios.post(`http://localhost:4000/todo/delete`,deleteTodo)
        .then((response)=> {
            console.log(response)
            dispatch({
                type: `DELETE_DONE`,
                payload: response.data.data
            })
        })
        .catch((error) => {
            console.log(error)
            dispatch({
                type: `DELETE_ERROR`,
                payload: error.response
            })
        })
    }
}

