import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppStore from '../../store/AppStore'
import HomeAction from '../actions/HomeAction'
import { push, goBack } from 'react-router-redux'
import { connect } from 'react-redux'
import { isAuthenticated, getPayload } from '../../utils/ActionUtils'
import { initSidenav } from '../../utils/MaterializeUtil'
import { UserDto } from '../dto/UserDto'

class NavApp extends Component {
    redirect(href) {
        AppStore.dispatch(push(href))
    }

    logout() {
        AppStore.dispatch(HomeAction.logout())
    }

    isMenuDisplayed() {
        return (this.props.location.pathname === '/')
    }

    componentDidMount() {
        initSidenav('.sidenav')
        if (isAuthenticated()) {
            const token = getPayload()
            AppStore.dispatch(HomeAction.fetchUser(token.id))
        }
    }

    componentDidUpdate() {
        initSidenav('.sidenav')
    }

    getNavComponent() {
        if (isAuthenticated()) {
            const menu = this.isMenuDisplayed() ? [ '', 'hidden' ] : [ 'hidden','' ]
            return (
                <div>
                    <div className={ `left brand-logo ${menu[0]}` }>
                        <a data-target='slide-out' className='sidenav-trigger'>
                            <i className='material-icons menu-icon'>menu</i>
                        </a>
                    </div>
                    <div className={ `left ${menu[1]} arrow-nav` }>
                        <i className='material-icons menu-icon' onClick={ () => AppStore.dispatch(goBack()) }>arrow_back</i>
                    </div>
                </div>
            )
        }
        if (this.props.location.pathname === '/signup') {
            return (
                <div>
                    <div className='left arrow-nav'>
                        <i className='material-icons menu-icon' onClick={ () => AppStore.dispatch(goBack()) }>arrow_back</i>
                    </div>
                </div>
            )
        }
        return null
    }

    getSideComponent() {
        return (
            <div>
                <ul id='slide-out' className='sidenav'>
                    <li>
                        <div className='user-view no-margin'>
                            <div className='background'>
                                <img src='images/lookation-logo.png'/>
                            </div>
                            <div className='col s12 center-align'>
                                <a><i className='material-icons large accent-color'>perm_identity</i></a>
                            </div>
                            <a><span className='white-text name'>{ this.props.user.userName }</span></a>
                            <a><span className='white-text email'>{ this.props.user.email }</span></a>
                        </div>
                    </li>
                    <li className='divider no-margin'/>
                    <li>
                        <a className='waves-effect sidenav-close' onClick={ () => this.redirect('/') }>
                            <i className='material-icons'>dashboard</i> Home
                        </a>
                    </li>
                    <li className='divider'/>
                    <li>
                        <a className='waves-effect sidenav-close' onClick={ () => this.redirect('/options') }>
                            <i className='material-icons'>settings</i> Account
                        </a>
                    </li>
                    <li className='divider'/>
                    <li>
                        <a className='waves-effect sidenav-close' onClick={ this.logout }>
                            <i className='material-icons'>power_settings_new</i> Logout
                        </a>
                    </li>
                </ul>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className='navbar-fixed' id='main-nav'>
                    <nav>
                        <div className='nav-wrapper'>
                            { this.getNavComponent() }
                            <ul className='right'>
                                {this.props.action}
                            </ul>
                        </div>
                    </nav>
                </div>
                {
                    isAuthenticated() && this.getSideComponent()
                }
                <div className='main-content'>
                    { this.props.children }
                </div>
            </div>
        )
    }
}

NavApp.propTypes = {
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    location: PropTypes.shape({
        pathname: PropTypes.string
    }),
    children: PropTypes.element,
    user: PropTypes.instanceOf(UserDto)
}

const mapStateToProps = store => {
    return {
        action: store.HomeReducer.action,
        user: store.HomeReducer.user
    }
}

export default connect(mapStateToProps)(NavApp)
