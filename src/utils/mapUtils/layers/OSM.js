import Layers from 'mapUtils/ILayers'
import ol from 'openlayers'

class _OSM extends Layers {

    constructor() {
        super()
        this.layer = this.createLayer()
    }


    createLayer() {
        return new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    }
    getLayer() {
        return this.layer
    }

}

export default function OSM(...args) {
    return new _OSM(...args)
}


