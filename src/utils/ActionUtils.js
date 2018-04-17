import {
    LOOKATION_TOKEN,
    CREDENTIALS
} from '../home/constants/HomeConstants'
import fetch from 'isomorphic-fetch'
import moment from 'moment'
import { toastError } from './MaterializeUtil'
import HomeAction from '../home/actions/HomeAction'
import AppStore from '../store/AppStore'

const removeToken = () => {
    localStorage.removeItem(LOOKATION_TOKEN)
}

const checkAuth = response => {
    switch (response.status) {
        case 200:
            return response.json()
        case 401:
            throw new Error('Sorry you\'re not authorised' )
        case 403:
            AppStore.dispatch(HomeAction.logout())
            throw new Error('Session expired' )
        case 404:
            throw new Error('Resource not found')
        case 500:
            throw new Error('Oops.. somthing went wrong on our side.. sorry')
        default:
            throw new Error('Oops.. an error occured')
    }
}

const catchError = err => {
    toastError(err.message)
}

const checkStatus = (obj, response) => {
    const code = Object.keys(obj).find(element => response.status + '' === element + '')
    if (!code) {
        throw new Error('Unhandled Error during fetch' + response.status)
    }
    return obj[code](response)
}

const lookationFetch = (url, params, printErr = true) => {
    return fetch(url, params)
        .then(checkAuth)
        .catch(err => {
            if (printErr) {
                return catchError(err)
            }
            throw err
        })
}

const getAuthorization = () => {
    return {
        Authorization: 'Bearer ' + localStorage.getItem(LOOKATION_TOKEN)
    }
}

const getPayload = () => {
    const token = localStorage.getItem(LOOKATION_TOKEN)
    if (token && token !== 'undefined') {
        try {
            return JSON.parse(atob(token.split('.')[1]))
        } catch (err) {
            return ''
        }
    }
    return ''
}

const getLoginPassword = (defaultRes = ['', '']) => {
    return localStorage.getItem(CREDENTIALS) ? atob(localStorage.getItem(CREDENTIALS)).split(':') : defaultRes
}

const resetCredentials = () => {
    localStorage.removeItem(LOOKATION_TOKEN)
    localStorage.removeItem(CREDENTIALS)
}

const getToken = () => {
    return localStorage.getItem(LOOKATION_TOKEN)
}

const isAuthenticated = () => {
    const payload = getPayload()
    if (payload) {
        const exp = moment(payload.exp)
        return moment().isAfter(exp)
    }
    return false
}

export { checkAuth, checkStatus, getAuthorization, getPayload, removeToken, catchError, lookationFetch, getLoginPassword, resetCredentials, isAuthenticated, getToken }
