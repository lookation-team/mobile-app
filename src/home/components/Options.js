import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import AppStore from '../../store/AppStore'
import HomeAction from '../actions/HomeAction'
import LookerDto from '../dto/UserDto'
import { initDatepicker, initSelect } from '../../utils/MaterializeUtil'

class Options extends Component{
    constructor(props) {
        super(props)
        this.state = new LookerDto()
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        console.log(this.state, this.props.user)
        const modifiedKeys = Object.keys(this.state).filter(k => this.state[k] && this.state[k] !== this.props.user[k])
        console.log(modifiedKeys)
        const obj = {}
        modifiedKeys.forEach(k => {
            if (k === 'birthDate') {
                obj[k] = moment(this.state[k], 'MMM DD, YYYY').valueOf()
            } else {
                obj[k] = this.state[k]
            }
        })
        console.log(obj)
        AppStore.dispatch(HomeAction.putLooker(this.props.user.id, obj))
    }

    handleChange(e) {
        const element = e.target.dataset.mode
        const value = e.target.value
        this.setState(prevState => {
            prevState[element] = value
            return prevState
        })
    }

    componentDidMount() {
        if (this.props.user.id) {
            this.setState(() => {
                const looker = Object.assign({}, this.props.user)
                looker.birthDate = moment(looker.birthDate).format( 'MMM DD, YYYY')
                return looker
            })
        }
        initDatepicker('#birthDate')
        initSelect('#gender')
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.id) {
            console.log(nextProps)
            this.setState(() => {
                const looker = Object.assign({}, nextProps.user)
                looker.birthDate = moment(looker.birthDate).format( 'MMM DD, YYYY')
                return looker
            })
        }
    }

    /*handleChange(e) {
        this.setState({ gender: e.target.value })
    }*/

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div id='signup' className='col s12'>
                            <form name='registration' onSubmit={ this.onSubmit }>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='firstName' onChange={this.handleChange} value={this.state.firstName} name='firstName' data-mode='firstName' type='text' ref='firstName' className='firstName'/>
                                        <label htmlFor='firstName' className={`valign-wrapper ${this.state.firstName ? 'active' : ''}`}>
                                            <i className='material-icons'>person_outline</i>
                                            First Name *
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='lastName' onChange={this.handleChange} value={this.state.lastName} name='lastName' data-mode='lastName' type='text' ref='lastName' className='lastName'/>
                                        <label htmlFor='lastName' className={`valign-wrapper ${this.state.lastName ? 'active' : ''}`}>
                                            <i className='material-icons'>person_outline</i>
                                            Last Name *
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='userName' onChange={this.handleChange} value={this.state.userName} name='userName' data-mode='userName' type='text' ref='userName' className='userName'/>
                                        <label htmlFor='userName' className={`valign-wrapper ${this.state.userName ? 'active' : ''}`}>
                                            <i className='material-icons'>person</i>
                                            Username *
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='email' onChange={this.handleChange} value={this.state.email} name='email' data-mode='email' type='text' ref='email' className='email'/>
                                        <label htmlFor='email' className={`valign-wrapper ${this.state.email ? 'active' : ''}`}>
                                            <i className='material-icons'>mail_outline</i>
                                            Email *
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='phoneNumber' onChange={this.handleChange} value={this.state.phoneNumber} name='phoneNumber' data-mode='phoneNumber' type='text' ref='phoneNumber' className='phoneNumber'/>
                                        <label htmlFor='phoneNumber' className={`valign-wrapper ${this.state.phoneNumber ? 'active' : ''}`}>
                                            <i className='material-icons'>phone</i>
                                            Phone Number
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='password' onChange={this.handleChange} value={this.state.password} name='password' data-mode='password' type='password' ref='password' className='password'/>
                                        <label htmlFor='password' className={`valign-wrapper ${this.state.password ? 'active' : ''}`}>
                                            <i className='material-icons'>lock_outline</i>
                                            Password *
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <input id='birthDate' onChange={this.handleChange} value={this.state.birthDate} name='birthDate' data-mode='birthDate' ref='birthDate' type='text' className='datepicker birthDate'/>
                                        <label htmlFor='birthDate' className={`valign-wrapper ${this.state.birthDate ? 'active' : ''}`}>
                                            <i className='material-icons'>cake</i>
                                            Birth Date *
                                        </label>
                                    </div>
                                </div>
                                <div className='row no-margin'>
                                    <div className='col s12 input-field'>
                                        <select id='gender' onChange={this.handleChange} value={this.state.gender} name='gender' data-mode='gender' ref='gender' className='gender'>
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
                                            Save Modifictions
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

Options.propTypes = {
    user: PropTypes.instanceOf(LookerDto)
}

const mapStateToProps = store => {
    return {
        user: store.HomeReducer.user
    }
}

export default connect(mapStateToProps)(Options)
