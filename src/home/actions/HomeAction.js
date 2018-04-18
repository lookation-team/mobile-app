import moment from 'moment'
import socket from 'socket.io-client'
import {
    LOGIN_FAIL,
    LOOKATION_TOKEN,
    DISCONNECTED,
    RECEIVE_CURRENT_LOCATION,
    RECEIVE_LOOKERS_POSITIONS,
    RECEIVE_WATCHID,
    ACTION,
    POPUP,
    RECEIVE_USER
} from '../constants/HomeConstants'
import { wsPath } from '../../conf/basepath'
import AppStore from '../../store/AppStore'
import ApplicationConf from '../../conf/ApplicationConf'
import { push } from 'react-router-redux'
import { toastError, toast, toastSuccess } from '../../utils/MaterializeUtil'
import { lookationFetch, removeToken, resetCredentials, getPayload, getAuthorization, getToken } from '../../utils/ActionUtils'

let io = null
export const client = () => {
    if (!io || !io.connected) {
        io = socket(wsPath, {
            query: {
                token: getToken()
            }
        })
        io.on('reconnect_attempt', () => {
            io.io.opts.query = {
                query: getToken()
            }
        })
    }
    return io
}

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
                const lastTS = AppStore.getState().HomeReducer.coords.timestamp
                const diff = moment().diff(moment(lastTS), 'seconds')
                if (lastTS === 0 || diff > 10) {
                    dispatch(HomeAction.receiveCurrentLocation(position))
                    HomeAction.socketPublish('position', {
                        timestamp: position.timestamp,
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude
                    })
                }
            },
            err => {
                if (highAccur) {
                    dispatch(HomeAction.watchPosition(false))
                } else {
                    console.log('Err', err)
                    dispatch(HomeAction.watchId(null))
                    toastError('We can\'t find your location')
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
            dispatch(HomeAction.receiveCurrentLocation({
                timestamp: 0,
                coords: { longitude: 0, latitude: 0 }
            }))
        }
    },
    receiveUser(user) {
        return { type: RECEIVE_USER, user: user }
    },
    fetchUser() {
        return dispatch => {
            const obj = getPayload()
            return lookationFetch(ApplicationConf.getLooker(obj.id), {
                headers: getAuthorization()
            }, true)
                .then(json => dispatch(HomeAction.receiveUser(json)))
        }
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
                client()
                dispatch(HomeAction.fetchUser())
                dispatch(push('/'))
                dispatch(HomeAction.watchPosition())
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
            dispatch(HomeAction.resetStore())
            HomeAction.closeSocket()
            toast('Bye')
            /*})*/
        }
    },
    closeSocket() {
        client().close()
    },
    socketPublish(path, data) {
        return client().emit(path, data)
    },
    setAction(action) {
        return { type: ACTION, action: action }
    },
    setPopup(popup) {
        return { type: POPUP, popup: popup }
    },
    resetStore() {
        return dispatch => {
            dispatch(HomeAction.clearPosition())
            dispatch(HomeAction.receiveUser())
        }
    },
    setLookersPositions(positions) {
        return { type: RECEIVE_LOOKERS_POSITIONS, positions: positions }
    },
    fetchLookersPositions() {
        return dispatch => {
            lookationFetch(ApplicationConf.getLookersPositions(), {
                headers: getAuthorization()
            }).then(json => {
                dispatch(HomeAction.setLookersPositions(json))
            })
        }
    }
}

export default HomeAction
