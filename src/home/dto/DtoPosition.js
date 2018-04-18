export default class {
    constructor(obj = {}) {
        this.longitude = obj.longitude || 0
        this.latitude = obj.latitude || 0
        this.id = obj.id || ''
        this.timestamp = obj.date || 0
    }
}
