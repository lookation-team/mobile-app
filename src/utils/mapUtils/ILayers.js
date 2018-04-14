import { MapException } from './MapException'

export default class ILayers {

    constructor() {
        this.uuid = []
        if (!this.getLayer) {
            throw new MapException('getLayer is not defined')
        }
    }

    generateUUID() {
        let d = new Date().getTime()
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (d + Math.random() * 16) % 16 | 0
            d = Math.floor(d / 16)
            return (() => {
                if (c === 'x') {
                    return r
                }
                return (r & 0x3 | 0x8)
            })().toString(16)
        })
        return uuid
    }

    getUuid() {
        return this.uuid
    }

    getPopup() {
        return ''
    }

    checkUuid(u) {
        return !!this.uuid.find(el => u === el.uuid)
    }

    registerFeature(obj = {}) {
        const uuid = this.generateUUID()
        this.uuid.push({ uuid: uuid, obj: obj })
        return uuid
    }

}
