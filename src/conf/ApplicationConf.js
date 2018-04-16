import { path } from './basepath'

export default {
    login: () => `${path}login`,
    getLooker: id => `${path}looker/${id}`
}
