import {
    LOGIN_FAIL,
    DISCONNECTED,
    RECEIVE_CURRENT_LOCATION,
    RECEIVE_LOOKERS_POSITIONS,
    ACTION,
    RECEIVE_WATCHID,
    POPUP,
    RECEIVE_USER
} from '../constants/HomeConstants'
import UserDto from '../dto/UserDto'
import DtoPosition from '../dto/DtoPosition'

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
                    longitude: action.position.coords.longitude,
                    timestamp: action.position.timestamp
                }
            })
        case RECEIVE_LOOKERS_POSITIONS:
            return Object.assign({}, state, {
                positions: action.positions.map(p => new DtoPosition(p))
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
        case RECEIVE_USER:
            return Object.assign({}, state, {
                user: new UserDto(action.user)
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
        longitude: 0,
        timestamp: 0
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
    },
    user: new UserDto(),
    positions: []
}
