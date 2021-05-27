
import React, { isValidElement } from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

// Import Action
import {checkUserVerify} from "./../Redux/Actions/UserAction"
import {onuserLogout} from "./../Redux/Actions/UserAction"
import {onGetToDo} from "./../Redux/Actions/todoAction"
import {onDoneToDo} from "./../Redux/Actions/todoAction"
import {onDeleteToDo} from "./../Redux/Actions/todoAction"


// Import Component 
import CreateModal from "./../Components/CreateToDoModal"
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils"
import { CardTitle } from "reactstrap"

class todolist extends React.Component{

    state = {
        showCreateModal : false,
        idData : null
    }
    
    componentDidMount(){
        this.checkUserVerify()
        this.onGetData()
    
    }

    checkUserVerify = () => {
        let token = localStorage.getItem(`my-tkn`)
        

        this.props.checkUserVerify(token)
    }

    onGetData = () => {
        let token = localStorage.getItem(`my-tkn`)

        let data = {
            token
        }

        this.props.onGetToDo(data)
    }

    onDoneData = (index1,index2) => {
        let token = localStorage.getItem(`my-tkn`)
        
        let id = this.props.todo.data[index1].todolist[index2].id
       
        
        
        let data = {
            token,
            id
            
        }
        console.log(data)
        
        window.location = "/home"

        this.props.onDoneToDo(data)
    }

    onDeleteData = (index1,index2) => {
        
        let token = localStorage.getItem(`my-tkn`)
        
        let id = this.props.todo.data[index1].todolist[index2].id
        
        
        let deleteTodo = {
            token,
            id
            
        }

        window.location = "/home"


        this.props.onDeleteToDo(deleteTodo)
    }

    onLogout = () => {
        let token = localStorage.getItem(`my-tkn`)
        
        let data = {
            token
        }
        console.log(data)

        
        this.props.onuserLogout(data)
    }
    
    render(){
        if(this.props.todo.data === null) {
            return(
                <div>
                    Loading...
                </div>
            )
        }
        // Note = 
        // 1. Page Register 
        // 2. Page Login
        // 3. Home ada Logout --> kalo di logout hapus token dan balik ke register
        return(
           <> 
           <div style = {{height: "100vh", background: "#F6F6F6"}}>
                <div className="container ">
                <nav class="navbar navbar-light bg-light d-flex justify-content-end">
                     <Link to="/" style={{fontFamily: "Playfair Display", fontSize: "24px", color: "#47B785", fontWeight: "bold"}}>Logout</Link>
                     {/* <input type="button" value ="logout" className="btn btn-primary" onClick= {()=> this.onLogout()} /> */}
                </nav>
                    
                    <div className="row justify-content-center py-5">
                        <div className="col-8">
                            { 
                                this.props.user.is_email_confirmed === 0?
                                <div class="alert alert-danger" role="alert"> 
                                    Activate your account!
                                </div>
                                :
                                null
                            }
                        </div>
                        <div className="col-8  py-3" style = {{fontFamily: "Playfair Display"}}>
                                {/* Button Selection */}
                                <div className="col-12 mb-3">
                                    <CreateModal/>
                                    <hr/>
                                </div>

                                <div className="row px-3">
                                    {                                         
                                        this.props.todo.data.map((value,index) => {
                                            return(
                                                <>
                                                    <div className="col-12">
                                                        <h4 style={{fontWeight: "bolder", fontStyle: "italic", fontSize: "20px" }}>
                                                            {value.date}
                                                        </h4>
                                                    </div>

                                                    {
                                                        value.todolist.map((val,idx)=> {
                                                            if(val.status === 1 ){
                                                                return(
                                                                    <div className ="col-12">
                                                                        <span style={{fontSize: '18px'}}>
                                                                            {val.title} - {val.description} 
                                                                        </span>
                                                                    </div>
                                                                )
                                                            }else{
                                                                return(
                                                                    <div className="col-12 d-flex justify-content-between " style={{width: "500px"}}>
                                                                    <div >
                                                                            <span style={{fontSize: '18px'}}>
                                                                                {val.title} - {val.description}
                                                                            </span>
                                                                            
                                                                    </div>
                                                                    <div className="ml-auto">
                                                                            <input type="button" value="Done" onClick={() => this.onDoneData(index,idx)} className="btn btn-success btn-sm"  />
                                                                            <input type="button" value="Delete" onClick={() => this.onDeleteData(index,idx)} className="btn btn-danger btn-sm" style={{marginLeft: "20px" }} />
                                                                    </div>
                                                                   
                                                                    <br /><br/>
                                                                </div>
                                                                )
                                                            }
                    
                                                        })
                                                        
                                                    }
                                                    <br/>
                                                    <br/>
                                                </>
                                            )
                                        })
                                        
                                    }                         
                                </div>
                            
                            
                        </div>
                    </div>
            </div>
           </div>
            
            
           </>
        )
    }
}

const mapDispatchToProps = {
    checkUserVerify, onGetToDo, onDoneToDo, onDeleteToDo, onuserLogout
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        todo: state.todo
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (todolist)