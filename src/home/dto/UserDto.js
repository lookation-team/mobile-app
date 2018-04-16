export default class {
    constructor(obj = {}) {
        this.birthDate = obj.birthDate || null
        this.email = obj.email || ''
        this.firstName = obj.firstName || ''
        this.gender = obj.gender || ''
        this.id = obj.id || ''
        this.lastName = obj.lastName || ''
        this.phoneNumber = obj.phoneNumber || null
        this.userName = obj.userName || ''
    }
}
