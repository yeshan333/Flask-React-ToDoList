import React, {Component} from 'react';
import SignInSide from './SignInSide';

class ControlSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(event) {
        //event.preventDefault();
        alert("You are BB")
        if(this.state.email === '' || this.state.password === '') {
            alert("Please input your password or email");
        }else{
            alert("Sucess Login")
        }
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    render() {
        return(
            <SignInSide
                email={this.state.email}
                password={this.state.password}
                handleEmailChange={this.handleEmailChange}
                handlePasswordChange={this.handlePasswordChange}
                handleSubmit = {this.handleSubmit}
            />
        );
    }
}

export default ControlSignIn;