import { getDate } from "../../utils/DateUtil"

export default class {
    constructor(obj) {
        this.id = obj.id
        this.code = obj.designation ? obj.code + '/' + obj.designation : obj.code
        this.name = obj.name
        this.city = obj.city
        this.creationDate = getDate(obj.creationDate)
        this.closeDate = getDate(obj.close)
        this.historique = '05/01/01 au 15/11/16'
        this.operations = '56'
        this.headers = ['code', 'city', 'name', 'creationDate', 'closeDate', 'historique', 'operations']
    }
}