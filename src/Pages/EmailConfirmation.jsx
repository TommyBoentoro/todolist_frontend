import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"

// Import Image
import registerImage from "./../Supports/Register.png"

class EmailConfirmation extends React.Component{

    state = {
        message: null,
        error: false,
        showForm: false
    }

    componentDidMount(){
        this.onConfirmation()
    }

    onConfirmation = () => {
        let category = this.props.match.params.cat

        if(category === "true"){
            this.setState ({showForm: true})
        }else{
            let dataToSend = {
                id : this.props.match.params.id,
                password: this.props.match.params.pass
            }
    
                axios.patch(`http://localhost:4000/authentic-system/email-confirmation`, {dataToSend})
                .then ((res)=> {
                    this.setState({error: res.data.error})
                    this.setState({message: res.data.message})
                })
                .catch ((err) => {
                    console.log(err)
                })
        }    
     }

     onActivation = () => {

     }

    
    render(){
        return(
            
            this.state.showForm?
                <div className="container">
                    <div>
                        <div className="col-12"> 
                        <h1 className=" mt-5">
                            Input Your Code
                        </h1>
                    </div>
                        <div className="mt-5 col-5">                        
                            <div className="form-group">
                                <label for="exampleInputEmail1">Activation Code</label>
                                <input type="text" ref={(e)=> this.activationcode=e} className="form-control" />
                            </div>
                            
                            <button type="submit" onClick={() => this.onActivation()} className="btn btn-success w-100">
                                Submit
                            </button>
                        </div> 
                    </div>
                                
                </div>
           :

                <div className="container">
                    <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                        <div className=" d-flex flex-column align-items-center" style={{height: "430px", width: "393px", background: "#FCFCFC", boxShadow: "10px 10px 50px 10px rgba(0,0,0,0.1)", borderRadius: "48px"}}>
                            
                            <div className= "d-flex flex-column justify-content-center" style={{fontFamily: "Playfair Display"}}>
                                    <div className="mt-5" style={{fontSize: "24px"}} >
                                        <p style={{fontWeight: "bolder"}}>
                                            {
                                                this.state.message
                                            }
                                        </p>
                                    </div>
                                    <div className=" d-flex justify-content-center mt-2">
                                        <img src={registerImage} alt="Register_img" style={{width: "232px", height: "194px"}} />
                                    </div>

                                    <div className="d-flex justify-content-center" style={{marginTop: "35px"}}>
                                        <Link to="/login">
                                            <button style={{width: "132px", height: "47px", background: "#47B785", borderRadius: "20px", color: "white", border: "white", fontSize: "14px", fontWeight: "bold"}} > Continue Login</button>
                                        </Link>
                                    </div>
                                    
                            </div>
                        </div>
                        
                    </div>
                    
                    
                    
                    
                    {/* <div className = "row justify-content-center align-items-center" style={{height: "100vh"}}>
                        <div className="col-5 text-center border border-success px-3 py-5 rounded">
                            <h1>
                                {
                                    this.state.error?
                                        null
                                    : 
                                    `Welcome With Us!`
                                }
                            </h1>
                            <p>
                                {
                                    this.state.message
                                }
                            </p>
                            <Link to="/login">
                            <button className="btn btn-success" > Continue Login</button>
                            </Link>
                            
                        </div>
                    </div> */}

                </div>  
        )
    }
}

export default EmailConfirmation