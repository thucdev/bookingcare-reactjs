import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'connected-react-router'

import * as actions from '../../store/actions'
import './Login.scss'
import {FormattedMessage} from 'react-intl'
import 'bootstrap/dist/css/bootstrap.css'
import {handleLoginApi} from '../../services/userService.'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
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

    handleLogin = async () => {
        this.setState({
            errMessage: '',
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    })
                }
            }
        }
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
                        <div className="col-12" style={{color: 'red'}}>
                            {this.state.errMessage}
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
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
