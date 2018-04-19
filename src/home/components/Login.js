import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import AppStore from '../../store/AppStore'
import HomeAction from '../actions/HomeAction'
import { getLoginPassword } from '../../utils/ActionUtils'

class Login extends Component {
    constructor(props) {
        super(props)
        const credentials = getLoginPassword()
        this.state = {
            login: credentials[0],
            password: credentials[1],
            message: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidUpdate() {
        if (this.state.message) {
            this.refs.container.error('', this.state.message, {
                timeOut: 10000,
                extendedTimeOut: 3000,
                closeButton: true
            })
        }
    }

    handleChange(e) {
        const element = e.target.dataset.mode
        const value = e.target.value
        this.setState(prevState => {
            prevState[element] = value
            return prevState
        })
    }

    componentWillMount() {
        document.body.classList.add('login-body')
    }

    componentWillUnmount() {
        document.body.classList.remove('login-body')
    }

    redirect(href) {
        AppStore.dispatch(push(href))
    }

    onSubmit(e) {
        e.preventDefault()
        const pwd = this.refs.password.value
        const login = this.refs.login.value
        if (pwd && login) {
            AppStore.dispatch(HomeAction.login(login, pwd))
        }
    }

    render() {
        return (
            <div className='login-page valign-wrapper'>
                <div className='container'>
                    <div className='row'>
                        <div className='col s12'>
                            <form name='registration' onSubmit={ this.onSubmit }>
                                <div className='row'>
                                    <div className='input-field col s6 offset-s3 center'>
                                        <img className='responsive-img' src='images/lookation-logo.png'/>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='login' data-mode='login' type='text' ref='login' className='login' value={this.state.login} onChange={this.handleChange} />
                                        <label htmlFor='login' className='valign-wrapper'>
                                            <i className='material-icons'>person</i>
                                            Email
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin-h'>
                                    <div className='col s12 input-field'>
                                        <input id='password' data-mode='password' type='password' ref='password' className='password' value={this.state.password} onChange={this.handleChange} />
                                        <label htmlFor='password' className='valign-wrapper'>
                                            <i className='material-icons'>lock_outline</i>
                                            Password
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin-h'>
                                    <div className='col s12 center-align'>
                                        <button type='submit' className='btn waves-effect waves-light'>
                                            Sign-In
                                        </button>
                                    </div>
                                </div>
                                <div className='row no-margin-h'>
                                    <div className='col s12 center-align sign-up'>
                                        Not a looker ? <span onClick={() => this.redirect('/signup')}>Sign up</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        message: store.HomeReducer.message
    }
}

export default connect(mapStateToProps)(Login)
