import {
    LOGIN_FAIL,
    LOOKATION_TOKEN,
    DISCONNECTED,
    RECEIVE_CURRENT_LOCATION,
    RECEIVE_WATCHID,
    ACTION,
    STATION_RANGE,
    POPUP
} from '../constants/HomeConstants'
import AppStore from '../../store/AppStore'
import ApplicationConf from '../../conf/ApplicationConf'
import { push } from 'react-router-redux'
import { toastError, toast, toastSuccess } from '../../utils/MaterializeUtil'
import { lookationFetch, removeToken, resetCredentials } from '../../utils/ActionUtils'

const HomeAction = {
    loginFail(message) {
        return { type: LOGIN_FAIL, message: message }
    },
    watchId(id) {
        return { type: RECEIVE_WATCHID, watchId: id }
    },
    disconnected(message) {
        return { type: DISCONNECTED, message: message }
    },
    receiveCurrentLocation(position) {
        return { type: RECEIVE_CURRENT_LOCATION, position: position }
    },
    getCurrentLocation(highAccur = true) {
        return dispatch => {
            navigator.geolocation.getCurrentPosition(position => {
                toastSuccess('We found you!')
                dispatch(HomeAction.receiveCurrentLocation(position))
            },
            () => {
                if (highAccur) {
                    dispatch(HomeAction.getCurrentLocation(false))
                }
            }, {
                enableHighAccuracy: highAccur
            })
        }
    },
    watchPosition(highAccur = true) {
        return dispatch => {
            if (AppStore.getState().HomeReducer.watchId) {
                dispatch(HomeAction.clearPosition(AppStore.getState().HomeReducer.watchId))
            }
            const id = navigator.geolocation.watchPosition(position => {
                dispatch(HomeAction.receiveCurrentLocation(position))
            },
            err => {
                if (highAccur) {
                    dispatch(HomeAction.watchPosition(false))
                } else {
                    console.log('Err', err)
                    toastError('Please enable the geolocation to use our app\'')
                }
            }, {
                enableHighAccuracy: highAccur,
                timeout: 7000
            })
            dispatch(HomeAction.watchId(id))
        }
    },
    clearPosition(id) {
        return dispatch => {
            navigator.geolocation.clearWatch(id)
            dispatch(HomeAction.watchId(null))
        }
    },
    setStationRange(range) {
        localStorage.setItem(STATION_RANGE, range)
    },
    login(login, password) {
        return dispatch => {
            return lookationFetch(ApplicationConf.login(), {
                method: 'POST',
                body: JSON.stringify({
                    email: login,
                    password: password
                })
            }, true).then(json => {
                localStorage.setItem(LOOKATION_TOKEN, json.token)
                dispatch(push('/'))
                toast('Hey, nice to see you again !')
            }).catch(() => {
                resetCredentials()
            })
        }
    },
    logout() {
        return dispatch => {
            /*return fetch(ApplicationConf.logout(), {
                method: 'POST',
                headers: getAuthorization()
            }).then(() => {*/
            removeToken()
            dispatch(push('/login'))
            toast('Bye')
            /*})*/
        }
    },
    setAction(action) {
        return { type: ACTION, action: action }
    },
    setPopup(popup) {
        return { type: POPUP, popup: popup }
    }
}

export default HomeAction
