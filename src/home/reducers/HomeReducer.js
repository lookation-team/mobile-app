import {
    LOGIN_FAIL,
    DISCONNECTED,
    RECEIVE_CURRENT_LOCATION,
    ACTION,
    RECEIVE_WATCHID,
    POPUP
} from '../constants/HomeConstants'

export function HomeReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_FAIL:
            return Object.assign({}, state, {
                message: action.message
            })
        case RECEIVE_CURRENT_LOCATION:
            return Object.assign({}, state, {
                coords: {
                    latitude: action.position.coords.latitude,
                    longitude: action.position.coords.longitude
                }
            })
        case DISCONNECTED:
            return Object.assign({}, state, {
                message: action.message
            })
        case ACTION:
            return Object.assign({}, state, {
                action: action.action
            })
        case RECEIVE_WATCHID:
            return Object.assign({}, state, {
                watchId: action.watchId
            })
        case POPUP:
            return Object.assign({}, state, {
                popup: action.popup
            })
        default:
            return state
    }
}

export const store = {
    message: '',
    token: '',
    navhistory: [],
    coords: {
        latitude: 0,
        longitude: 0
    },
    watchId: null,
    action: '',
    popup: {
        content: '',
        actions: '',
        header: '',
        trigger: '',
        id: '',
        fixedFooter: false,
        bottomSheet: false
    }
}
