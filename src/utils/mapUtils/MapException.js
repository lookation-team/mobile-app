class MapException extends Error {
    constructor(message) {
        const name = 'MapException'
        super(name + ' : ' + message)
        this.name = name
    }
}

export { MapException }
