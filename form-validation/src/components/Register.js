import React, { Component } from 'react';
import "./Register.css";

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


class Register extends Component {
    state = {
        fullName: null,
        email: null,
        phone: null,
        password: null,
        errors: {
            fullName: "",
            email: "",
            phone: "",
            password: ""
        }
    };

    validateForm(errors) {
        let valid = true;
        let name = this.state;
        if(!name.fullName || !name.email || !name.phone || !name.password){
            valid = false
        }
        Object.values(errors).forEach(
            // if we have an error string, set valid to false
            (val) => val.length > 0 && (valid = false)
        );
        console.log(valid);
        return valid;
    };
    

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state.errors;

        switch (name) {
            case "fullName":
                errors.fullName = value.length < 5 ? "Full name must be at least 5 characters long" : "";
                break;
            case "email" :
                errors.email = validEmailRegex.test(value) ? "" : "Email is not valid";
                break;
            case "phone" :
                errors.phone = value.match(/^[0-9]{10}$/) && value.length === 10 ? "" : "Enter 10 digit phone number including area code";
                break;
            case "password":
                errors.password = value.length < 8 ? "Password must be at least 8 characters long" : "";
                break;
            default:
                break;
        }

        // this.setState({errors, [name]: value}, () => {
        //     console.log(errors)
        // })
        this.setState({errors, [name]: value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.validateForm(this.state.errors)) {
            console.info("Valid Form")
        } else {
            console.error("Invalid Form");
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <div className='wrapper'>
                <h2>Simple react form-validation.</h2>
                <div className='form-wrapper'>
                    <h2>Register Form</h2>
                    <form onSubmit={this.handleSubmit} noValidate >
                        <div className='fullName'>
                            <label htmlFor="fullName">Full Name</label>
                            <input type='text' name='fullName' onChange={this.handleChange} noValidate />
                            {errors.fullName.length > 0 &&
                                <span className="error">{errors.fullName}</span>}
                        </div>
                        <div className='email'>
                            <label htmlFor="email">Email</label>
                            <input type='email' name='email' onChange={this.handleChange} noValidate />
                            {errors.email.length > 0 &&
                                <span className="error">{errors.email}</span>}
                        </div>
                        <div className="phone">
                            <label htmlFor="phone">Phone Number:</label>
                            <input type="text" name="phone" onChange={this.handleChange}   />
                            {errors.phone.length > 0 &&
                                <span className="error">{errors.phone}</span>}
                        </div>
                        <div className='password'>
                            <label htmlFor="password">Password</label>
                            <input type='password' name='password' onChange={this.handleChange} noValidate />
                            {errors.password.length > 0 &&
                                <span className="error">{errors.password}</span>}
                        </div>
                        <div className='info'>
                            <small>Password must be eight characters in length.</small>
                        </div>
                        <div className='submit'>
                            <button>Create new account</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;