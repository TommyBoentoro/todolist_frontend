import React from "react"
import {Modal, ModalBody} from "reactstrap"
import {connect} from "react-redux"

// Import Action
import {onCreateToDo} from "./../Redux/Actions/todoAction"


class CreateToDoModal extends React.Component {

    state = {
        showModal: false
    }
    
    onSubmit = () => {
        let title = this.title.value
        let description = this.description.value
        let date = this.date.value
        let token = localStorage.getItem(`my-tkn`)

        let dataToSend = {
            title,
            description,
            date,
            token
        }

        this.props.onCreateToDo(dataToSend)
        this.setState({showModal: false})
    }

    render(){
        return(
           <>
            <div style = {{fontFamily: "Playfair Display"}}>
                <input type="button" value="Add Todo" onClick={() => this.setState({showModal: true})} disabled={this.props.user.is_email_confirmed === 0? true : false} style={{width: "132px", height: "47px", background: "#47B785", borderRadius: "20px", color: "white", border: "white", fontSize: "20px", fontWeight: "bold"}}/>
                    <Modal toggle={() => this.setState({showModal: false})} isOpen={this.state.showModal} >
                        <ModalBody className="px-5 py-5">
                            <div style = {{fontFamily: "Playfair Display", fontSize: "30px", fontWeight: "900", marginTop: "-10px", lineHeight: "200%"}}>
                                <p>
                                    Create New ToDo
                                </p>
                            </div>
                            <div className="form-group" style = {{fontFamily: "Playfair Display", fontSize: "20px" , fontWeight: "bold", marginTop: "40px"}}>
                                <label>Title</label>
                                <input type="text" ref={e => this.title = e} className="form-control" placeholder="Input title" style={{borderRadius: "25px", fontSize:"14px", marginTop: "-5px"}}/>
                            </div>

                            <div className="form-group mt-1" style = {{fontFamily: "Playfair Display", fontSize: "20px", fontWeight: "bold"}}>
                                <label>Description</label>
                                <input type="text" ref={e => this.description = e} className="form-control" placeholder="Input description" style={{borderRadius: "25px", fontSize:"14px", marginTop: "-5px"}} />
                            </div>  
                            
                            <div className="form-group mt-1" style = {{fontFamily: "Playfair Display", fontSize: "20px" , fontWeight: "bold"}}>
                                <label>Date</label>
                                <input type="Datetime-local" ref={e => this.date = e} className="form-control" placeholder="Input Date" style={{borderRadius: "25px", fontSize:"14px", marginTop: "-5px"}} />
                            </div>
                            
                            <div className="d-flex justify-content-end" style={{marginTop : "70px"}}>
                        
                                <input type="button" value="Submit" onClick={() => this.onSubmit()} style={{width: "100px", height: "35px", background: "#47B785", borderRadius: "20px", color: "white", border: "white" ,fontWeight: "700"}} />
                            </div>
                            
                        </ModalBody>
                    </Modal>
            </div>
            
           </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        todo: state.todo
    }
}

const mapDispatchToProps = {
    onCreateToDo
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateToDoModal)