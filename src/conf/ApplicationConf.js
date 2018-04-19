import { path } from './basepath'

export default {
    login: () => `${path}login`,
    looker: () => `${path}looker`,
    getLooker: id => `${path}looker/${id}`,
    getLookersPositions: () => `${path}position`
}
