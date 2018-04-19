import React, { Component } from 'react'
import moment from 'moment'
import AppStore from '../../store/AppStore'
import HomeAction from '../actions/HomeAction'
import { initDatepicker, initSelect, toastError } from '../../utils/MaterializeUtil'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        initDatepicker('#birthDate')
        initSelect('#gender')
    }

    onSubmit(e) {
        e.preventDefault()
        const form = {
            firstName: this.refs.firstName.value,
            lastName: this.refs.lastName.value,
            userName: this.refs.userName.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
            birthDate: moment(this.refs.birthDate.value, 'MMM DD, YYYY').valueOf(),
            gender: this.refs.gender.value
        }
        const fields = Object.keys(form).filter(f => !form[f])
        if (fields.length === 0) {
            form.phoneNumber = this.refs.phoneNumber.value
            AppStore.dispatch(HomeAction.signup(form))
        } else {
            console.log(fields, fields.join(', '))
            toastError('Please fill the required fields :\n'+fields.join(', '))
        }
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div id='signup' className='col s12'>
                            <form name='registration' onSubmit={ this.onSubmit }>
                                <div className='row no-margin'>
                                    <div className='col s12 center-align'>
                                        <h5>Ready to become a Looker ?</h5>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='firstName' name='firstName' data-mode='firstName' type='text' ref='firstName' className='firstName'/>
                                        <label htmlFor='firstName' className='valign-wrapper'>
                                            <i className='material-icons'>person_outline</i>
                                            First Name *
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='lastName' name='lastName' data-mode='lastName' type='text' ref='lastName' className='lastName'/>
                                        <label htmlFor='lastName' className='valign-wrapper'>
                                            <i className='material-icons'>person_outline</i>
                                            Last Name *
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='userName' name='userName' data-mode='userName' type='text' ref='userName' className='userName'/>
                                        <label htmlFor='userName' className='valign-wrapper'>
                                            <i className='material-icons'>person</i>
                                            Username *
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='email' name='email' data-mode='email' type='text' ref='email' className='email'/>
                                        <label htmlFor='email' className='valign-wrapper'>
                                            <i className='material-icons'>mail_outline</i>
                                            Email *
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='phoneNumber' name='phoneNumber' data-mode='phoneNumber' type='text' ref='phoneNumber' className='phoneNumber'/>
                                        <label htmlFor='phoneNumber' className='valign-wrapper'>
                                            <i className='material-icons'>phone</i>
                                            Phone Number
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='password' name='password' data-mode='password' type='password' ref='password' className='password'/>
                                        <label htmlFor='password' className='valign-wrapper'>
                                            <i className='material-icons'>lock_outline</i>
                                            Password *
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='birthDate' name='birthDate' data-mode='birthDate' ref='birthDate' type='text' className='datepicker birthDate'/>
                                        <label htmlFor='birthDate' className='valign-wrapper'>
                                            <i className='material-icons'>cake</i>
                                            Birth Date *
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <select id='gender' name='gender' data-mode='gender' ref='gender' className='gender'>
                                            <option value='' disabled selected>Choose your gender *</option>
                                            <option value='man'>Man</option>
                                            <option value='woman'>Woman</option>
                                            <option value='other'>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='row no-margin-h'>
                                    <div className='col s12 center-align'>
                                        <button type='submit' className='btn waves-effect waves-light'>
                                            Sign-Up
                                        </button>
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

export default SignUp
