import React from "react"
import validator from "validator"


// Redux
import {connect} from "react-redux"
import {onUSerRegister} from "./../Redux/Actions/UserAction"
import { Link } from "react-router-dom"

// Import Image
import registerImage from "./../Supports/Register.png"

class Register extends React.Component{

    state = {
        error: null,
        loading: false
    }

    onRegister = () => {
        this.setState({loading: true})

       let email = this.email.value
       let password = this.password.value
       
       if(!email || !password) throw this.setState({error: `Data Must be Filled`, loading: false})
       if(!(validator.isEmail(email))) throw this.setState({error: `Email Not Valid`, loading: false})
       if(password.length < 6) throw this.setState({error: `Password Must Contain At Least 6 Characters`, loading: false})

       

       this.props.onUSerRegister(email, password)

      
    }

    render() {
        return(
            <div className="container">
                <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                    <div className=" d-flex flex-row align-items-center" style={{height: "688px", width: "1149px", background: "#FCFCFC", boxShadow: "10px 10px 50px 10px rgba(0,0,0,0.1)", borderRadius: "48px"}}>
                       <div className="col-6  d-flex justify-content-center align-items-center" style={{height: "500px"}}>
                            <img src={registerImage} alt="Register_img" style={{width: "482px", height: "404px"}} />
                       </div>
                       <div className="col-6  d-flex flex-column " style={{height: "500px"}}>
                           <div className= "d-flex flex-column justify-content-center mt-3" style={{fontFamily: "Playfair Display"}}>
                                <div className="pt-5" style={{fontSize: "30px",}} >
                                    <h1 style={{fontWeight: "bolder"}}>
                                    Register Your Account
                                    </h1>
                                </div>
                                <br/>
                                <div className="pt-3" style={{fontSize: "24px", }}>
                                    <h3 style={{fontWeight: "bold"}}>
                                            Email
                                    </h3>
                                    <input type="text" ref={(e)=> this.email=e} Placeholder ="Input your email" className="form-control" style={{background: "#FFFFFF", border: "1px solid #AFAFAF", borderRadius: "10px", boxSizing: "border-box", fontSize: "14px", width: "345px"}}/>
                                </div>
                                <div className="mt-3" style={{fontSize: "24px", fontWeight: "bold"}}>
                                    <h3 style={{fontWeight: "bold"}}>
                                            Password
                                    </h3>
                                    <input type="password" ref={(e)=> this.password = e} Placeholder = "Input your password" className="form-control" style={{background: "#FFFFFF", border: "1px solid #AFAFAF", borderRadius: "10px", boxSizing: "border-box", fontSize: "14px", width:"345px"}}/>
                                </div>
                                <div className="mt-1">
                                    <span style={{fontSize: "14px"}}>
                                        Already Have An Account?
                                    </span>
                                    <span className="ml-1" >
                                        <Link to="/login" style={{color: "#47B785"}}>Login</Link>
                                    </span>
                                </div>
                                <br/>
                                <br/>
                                
                                <button type="submit" onClick={() => this.onRegister()} disabled={this.props.user.loading} style={{width: "132px", height: "47px", background: "#47B785", borderRadius: "20px", color: "white", border: "white", fontSize: "20px", fontWeight: "bold"}} >
                                {
                                    this.props.user.loading?
                                    <div className="spinner-border text-light" role="status" style={{width : "25px", height:"25px"}}>
                                    <span className="sr-only">Loading...</span>
                                    </div> 
                                    :
                                    `Register`
                                }
                                </button>

                                <h6 className="mt-1 text-danger">
                                    {
                                        
                                        this.props.user.message?
                                        this.props.user.message
                                        :
                                        this.state.error
                                            
                                    }
                                </h6>
                           </div>
                           
                       </div>
                    </div>
                    
                </div>
                
                {/* <div> */}
                    {/* <div className="col-12"> 
                        <h1 className=" mt-5">
                            Page Register
                        </h1>
                    </div> */}
                {/* <div className="mt-5 col-5">
                    
                        <div className="form-group">
                            <label >Email address</label>
                            <input type="email" ref={(e)=> this.email=e} className="form-control" />
                            <small id="emailHelp" className="form-text text-muted">Register Your Account</small>
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" ref={(e)=> this.password = e} className="form-control" />
                        </div>

                        <div>
                            <span>
                                Already Have An Account?  
                            </span>
                            <span className="ml-1">
                                <Link to="/login">Login</Link> 
                            </span>                      
                        </div>
                        
                        <button type="submit" onClick={() => this.onRegister()} disabled={this.props.user.loading} className="btn btn-success w-100 mt-3">
                            {
                                this.props.user.loading?
                                <div className="spinner-border text-light" role="status">
                                <span className="sr-only">Loading...</span>
                                </div> 
                                :
                                `Register`
                            }
                        </button>
                           

                        <h6 className="mt-3 text-danger">
                            {this.state.error}
                            {
                                this.props.user.message
                            }
                        </h6>
                </div>  */}
                {/* </div> */}
                              
            </div>
        )
    }
}
const mapDispatchToProps = {
    onUSerRegister
}

const mapStateToProps = (state)=>  {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)