
import React, { isValidElement } from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

// Import Action
import {checkUserVerify} from "./../Redux/Actions/UserAction"
import {onGetToDo} from "./../Redux/Actions/todoAction"
import {onDoneToDo} from "./../Redux/Actions/todoAction"
import {onDeleteToDo} from "./../Redux/Actions/todoAction"

// Import Component 
import CreateModal from "./../Components/CreateToDoModal"
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils"

class todolist extends React.Component{

    state = {
        showCreateModal : false,
        donetodo : false,
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
        this.setState({donetodo: true})
        let token = localStorage.getItem(`my-tkn`)
        
        let id = this.props.todo.data[index1].todolist[index2].id
        
        
        let data = {
            token,
            id
            
        }
        console.log(data)

        this.props.onDoneToDo(data)
    }

    onDeleteData = (index1,index2) => {
        
        let token = localStorage.getItem(`my-tkn`)
        
        let id = this.props.todo.data[index1].todolist[index2].id
        
        
        let deleteTodo = {
            token,
            id
            
        }

        window.location = "/"


        this.props.onDeleteToDo(deleteTodo)
    }
    
    render(){
        if(this.props.todo.data === null) {
            return(
                <div>
                    Loading...
                </div>
            )
        }

        return(
           <> 
           <div style = {{height: "100vh", background: "#F6F6F6"}}>
                <div className ="d-flex justify-content-end" style={{fontFamily : "Playfair Display", fontSize: "24px", fontWeight: "900", marginRight : "150px"}}>
                    <nav className="navbar navbar-light">
                        <Link to="/register" style={{color: "#39986E"}}>Sign Up</Link>
                        <Link to="/login" style={{color: "#39986E", marginLeft: "30px"}}>Login</Link>
                    </nav>
                </div>

                <div className="container ">
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
                                                        return(
                                                            <>
                                                                {
                                                                    
                                                                    this.state.donetodo?
                                                                    <div className ="col-12">
                                                                        <span style={{fontSize: '18px'}}>
                                                                            {val.title} - {val.description} 
                                                                        </span>
                                                                    </div>
                                                                    :
                                                                    <div className="col-12 border border-black">
                                                                        <div >
                                                                                <span style={{fontSize: '18px'}}>
                                                                                    {val.title} - {val.description} 
                                                                                </span>
                                                                                <input type="button" value="Done" onClick={() => this.onDoneData(index,idx)} className="btn btn-outline-success" style={{fontSize: "12px", height:"25px" }} />
                                                                                <input type="button" value="Delete" onClick={() => this.onDeleteData(index,idx)} className="btn btn-outline-danger" style={{fontSize: "12px", height:"25px" }} />
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    
                                                                        
                                                                }
                                                            </>
                                                        )
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
    checkUserVerify, onGetToDo, onDoneToDo, onDeleteToDo
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        todo: state.todo
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (todolist)