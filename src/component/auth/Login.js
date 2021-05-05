import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../service/AuthService";

import '../../styles/login.css';
import {Link} from "react-router-dom";
import { withRouter } from "react-router-dom";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
            console.log("In login.js")
          this.props.history.push("/covid-19/dashboard");
          //window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (

      
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <Form className="form-signin" onSubmit={this.handleLogin}
                        ref={c => {
                              this.form = c;
                            }}>
                  <div className="form-label-group">
                    <input type="text" id="username" className="form-control" placeholder="Username" required autoFocus value={this.state.username} onChange={this.onChangeUsername} validations={[required]}/>
                    <label htmlFor="username">Username</label>
                  </div>

    
                  <div className="form-label-group">
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required value={this.state.password} onChange={this.onChangePassword} validations={[required]}/>
                    <label htmlFor="inputPassword">Password</label>
                  </div>

                    {this.state.message && (
                                  <div className="form-group">
                                    <div className="alert alert-danger alert-validate" role="alert">
                                      {this.state.message}
                                    </div>
                                  </div>
                                )}

                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" disabled={this.state.loading}>
                  {this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                              )}
                              <span> Sign in</span>
                  </button>

                  <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                  this.checkBtn = c;
                                }}
                              />


                </Form>
                <hr className="my-4"/>
                <p className="text-center">
                                   <Link to='/covid-19/register'>Create an Account</Link>

                 </p>
              </div>
            </div>
          </div>
       </div>
    



    );
  }
}

export default withRouter(Login);