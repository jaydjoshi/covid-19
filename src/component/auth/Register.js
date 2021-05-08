import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import AuthService from "../../service/AuthService";
import {Link} from "react-router-dom";

import '../../styles/login.css';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                  <div className="card card-signin my-5">
                    <div className="card-body">
                      <h5 className="card-title text-center">Sign Up</h5>
                          <Form className="form-signin"
                            onSubmit={this.handleRegister}
                            ref={c => {
                              this.form = c;
                            }}
                          >

                         {!this.state.successful && (
                         <div>
                           <div className="form-label-group">
                                              <input type="text" id="username" className="form-control" placeholder="Username" required autoFocus value={this.state.username} onChange={this.onChangeUsername} validations={[required, vusername]}/>
                                              <label htmlFor="username">Username</label>
                                            </div>

                           <div className="form-label-group">
                                                <input type="text" id="email" className="form-control" placeholder="Email" required autoFocus value={this.state.username} value={this.state.email}
                                                                                                                                                                                               onChange={this.onChangeEmail}
                                                                                                                                                                                               validations={[required]}/>
                                                <label htmlFor="email">Email</label>
                           </div>

                           <div className="form-label-group">
                                               <input type="password" id="inputPassword" className="form-control" placeholder="Password" required value={this.state.password}
                                                                                                                                                                      onChange={this.onChangePassword}
                                                                                                                                                                      validations={[required, vpassword]}/>
                                               <label htmlFor="inputPassword">Password</label>
                                             </div>


                            <button className="btn btn-lg btn-primary btn-block text-uppercase" >Sign Up</button>

                                           </div>)}



            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
                <div>
                {this.state.successful && (
                    <p className="text-center">
                                                       <Link to='/'>Click here to Login</Link>
                                     </p>)
                }
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
      </div>
            </div>
    );
  }
}