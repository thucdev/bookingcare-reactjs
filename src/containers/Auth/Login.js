import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'connected-react-router'

import * as actions from '../../store/actions'
import './Login.scss'
import {FormattedMessage} from 'react-intl'
import 'bootstrap/dist/css/bootstrap.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
        }
    }

    handleOnchangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleLogin = () => {
        console.log('username: ', this.state.username, 'password: ', this.state.password)
        console.log('all state: ', this.state)
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center text-login">Login</div>
                        <div className="col-12 form-group login-input ">
                            <label htmlFor="">User Name:</label>
                            <input
                                type="text"
                                placeholder="Enter user name"
                                className="form-control input-field"
                                value={this.state.username}
                                onChange={(event) => this.handleOnchangeUsername(event)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label htmlFor="">Password:</label>
                            <div className="visible-password">
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    className="form-control input-field"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnchangePassword(event)}
                                />
                                <span
                                    onClick={() => {
                                        this.handleShowHidePassword()
                                    }}
                                >
                                    <i
                                        class={
                                            this.state.isShowPassword
                                                ? 'fas fa-eye'
                                                : 'fas fa-eye-slash'
                                        }
                                    ></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <button
                                className="btn-login form-control"
                                onClick={() => this.handleLogin()}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <a className="forgot-password">Forgot your password?</a>
                        </div>
                        <div className="col-12 text-center">
                            <span className="text-social">Or Login With</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
