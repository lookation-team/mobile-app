import React, { Component } from 'react'
import AppStore from '../../store/AppStore'
import HomeAction from '../actions/HomeAction'
import { push, goBack } from 'react-router-redux'
import { connect } from 'react-redux'
import { isAuthenticated } from '../../utils/ActionUtils'
import { initSidenav } from '../../utils/MaterializeUtil'

class NavApp extends Component {
    redirect(href) {
        AppStore.dispatch(push(href))
    }

    componentWillMount() {
        AppStore.dispatch(HomeAction.watchPosition())
    }

    componentWillUnmount() {
        AppStore.dispatch(HomeAction.clearPosition())
    }

    logout() {
        AppStore.dispatch(HomeAction.logout())
    }

    isMenuDisplayed() {
        return (this.props.location.pathname === '/')
    }

    componentDidMount() {
        initSidenav('.sidenav')
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
        return null
    }

    getSideComponent() {
        return (
            <div>
                <ul id='slide-out' className='sidenav'>
                    <li>
                        <div className='user-view'>
                            <div className='background'>
                                <img src='images/lookation-logo.png'/>
                            </div>
                            <div className='col s12 center-align'>
                                <a><i className='material-icons large accent-color'>perm_identity</i></a>
                            </div>
                            <a><span className='white-text name'>John Doe</span></a>
                            <a><span className='white-text email'>jdandturk@gmail.com</span></a>
                        </div>
                    </li>
                    <li className='divider'/>
                    <li>
                        <a className='waves-effect sidenav-close' onClick={ () => this.redirect('/') }>
                            <i className='material-icons'>dashboard</i> Home
                        </a>
                    </li>
                    <li className='divider'/>
                    <li>
                        <a className='waves-effect sidenav-close' onClick={ () => this.redirect('/options') }>
                            <i className='material-icons'>settings</i> Options
                        </a>
                    </li>
                    <li className='divider'/>
                    <li>
                        <a className='waves-effect sidenav-close' onClick={ this.logout }>
                            <i className='material-icons'>power_settings_new</i> Déconnexion
                        </a>
                    </li>
                </ul>
            </div>
        )
    }

    render() {
        console.log(process.env)
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
    action: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
    ]),
    location: React.PropTypes.shape({
        pathname: React.PropTypes.string
    }),
    children: React.PropTypes.element
}

const mapStateToProps = store => {
    return {
        action: store.HomeReducer.action
    }
}

export default connect(mapStateToProps)(NavApp)
