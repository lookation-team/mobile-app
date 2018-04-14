import Layers from 'mapUtils/ILayers'

class _Custom extends Layers {

    constructor(vector) {
        super()
        this.vector = vector
    }

    getLayer() {
        return this.vector
    }
}

export default function Custom(...args) {
    return new _Custom(...args)
}


