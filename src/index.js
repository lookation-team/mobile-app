import React from 'react'
import { Router, IndexRoute, Route, hashHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, push } from 'react-router-redux'
import Login from './home/components/Login'
import NavApp from './home/components/NavApp'
import Dashboard from './home/components/Dashboard'
import AppStore from './store/AppStore'
import { getPayload, getLoginPassword } from './utils/ActionUtils'
import moment from 'moment'
import HomeAction from './home/actions/HomeAction'
import Options from './home/components/Options'
import SignUp from './home/components/SignUp'

const history = syncHistoryWithStore(hashHistory, AppStore)

history.listenBefore(location => {
    if (location.pathname.includes('/gallery-')) {
        AppStore.dispatch(push('/'))
    }
})

const reLogin = credentials => {
    AppStore.dispatch(HomeAction.login(credentials[0], credentials[1]))
}

const checkAuth = replace => {
    const payload = getPayload()
    const logPass = getLoginPassword(null)
    if (!payload) {
        if (logPass) {
            reLogin(logPass)
        } else {
            replace('/login')
        }
    } else {
        const exp = moment(payload.exp)
        if (moment().isAfter(exp)) {
            if (logPass) {
                reLogin(logPass)
            }/* else {
                replace('/login')
                AppStore.dispatch(HomeAction.logout())
            }*/
        }
    }
}

const onEnter = (nextState, replace) => {
    checkAuth(replace)
}

const onEnterLogin = (nextState, replace) => {
    const payload = getPayload()
    if (payload) {
        replace('/')
    }
}

const onChange = (prevState, nextState, replace) => {
    checkAuth(replace)
}

render(
    <Provider store={ AppStore }>
        <Router history={ history }>
            <Route path='/' component={ NavApp }>
                <Route onChange={ onChange } onEnter={ onEnter }>
                    <IndexRoute component={ Dashboard } />
                    {/* <Route path='station/:id' component={ StationApp }/>
                    <Route path='station/:id/event/add' component={ EventForm } />
                    <Route path='station/:id/contact' component={ ContactForm } /> */}
                </Route>
                <Route path='login' component={ Login } onEnter={ onEnterLogin }/>
                <Route path='signup' component={ SignUp } onEnter={ onEnterLogin }/>
                <Route path='options' component={ Options } />
            </Route>
        </Router>
    </Provider>
    , document.getElementById('app')
)
