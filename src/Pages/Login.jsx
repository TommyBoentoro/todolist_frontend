import React from "react"
import validator from "validator"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"


// Action
import {onUserLogin} from "./../Redux/Actions/UserAction"

// Import Image
import loginImage from "./../Supports/Login.png"


class login extends React.Component{

    state = {
        error: null
    }

    onLogin = () => {

        let email = this.email.value
        let password = this.password.value

        let data = {
            email: this.email.value,
            password: this.password.value
        }

        
        
        if(!email || !password) throw this.setState({error: `Data Must be Filled`})
        if(!(validator.isEmail(email))) throw this.setState({error: `Email Not Valid`, loading: false})
        
        this.props.onUserLogin(data)

    }

    render(){
        if(this.props.user.isRedirect){
           return(
            <Redirect to="/home"/>
           )
        }
            return(      
                <div className="container">
                    <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                        <div className=" d-flex flex-row align-items-center" style={{height: "688px", width: "1149px", background: "#FCFCFC", boxShadow: "10px 10px 50px 10px rgba(0,0,0,0.1)", borderRadius: "48px"}}>
                        <div className="col-6  d-flex justify-content-center align-items-center" style={{height: "500px"}}>
                                <img src={loginImage} alt="Register_img" style={{width: "482px", height: "404px"}} />
                        </div>
                        <div className="col-6  d-flex flex-column " style={{height: "500px"}}>
                            <div className= "d-flex flex-column justify-content-center mt-3" style={{fontFamily: "Playfair Display"}}>
                                    <div className="pt-5" style={{fontSize: "30px",}} >
                                        <h1 style={{fontWeight: "bolder"}}>
                                        Login
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
                                    
                                    <br/>
                                    <br/>
                                    
                                    <button type="submit" onClick={()=> this.onLogin()}  style={{width: "132px", height: "47px", background: "#47B785", borderRadius: "20px", color: "white", border: "white", fontSize: "20px", fontWeight: "bold"}} >
                                        Login
                                    </button>

                                    <p className="mt-1 text-danger">
                                        {
                                            this.props.user.message2?
                                            this.props.user.message2
                                            :
                                            this.state.error
                                        }
                                    </p>
                            </div>
                            
                        </div>
                        </div>
                    
                    </div>
                    {/* <div>
                        <div className="col-12"> 
                        <h1 className=" mt-5">
                            Login Page
                        </h1>
                    </div>
                        <div className="mt-5 col-5">
                            
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" ref={(e)=> this.email=e} className="form-control" />
                                    
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" ref={(e)=> this.password = e} className="form-control" />
                                </div>
                                
                                <button type="submit" onClick={()=> this.onLogin()} className="btn btn-success w-100">
                                    Login
                                </button>
        
                                <p className= "mt-3 text-danger">
                                    {
                                      this.props.user.message
                                    }
                                </p>
                                
                                
        
                            
                        </div> 
                    </div> */}
                                  
                </div>
                )
        
     
    }
}

const mapDispatchToProps = {
    onUserLogin
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (login)