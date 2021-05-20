import React from "react"
import {BrowserRouter, Switch, Route}  from "react-router-dom"
import Register from "./Pages/Register"
import EmailConfirmation from "./Pages/EmailConfirmation"
import login from "./Pages/Login"
import todolist from "./Pages/todolist"

// Redux
import {applyMiddleware, createStore} from "redux"
import {Provider} from "react-redux"
import thunk from "redux-thunk"
import allReducer from "./Redux/Reducer/index"

const store = createStore(allReducer, applyMiddleware(thunk))

function App(){
  return(
   <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path= "/" component={todolist} />
          <Route path="/confirmation/:id/:pass/:cat" component={EmailConfirmation}/>
          <Route path="/login" component={login}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </BrowserRouter>
   </Provider>
  );
}


export default App;