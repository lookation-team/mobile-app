import Layers from 'mapUtils/ILayers'
import ol from 'openlayers'


class _WFS extends Layers {

    constructor(obj) {
        super()
        this.obj = obj
        this.wfsFormatWater = new ol.format.WFS({})
        this.popup = obj.popup
        this.layer = this.createLayer()
    }

    getHeaders() {
        if (this.obj.headers) {
            return { Accept: 'application/vnd.google-earth.kml+xml' }
        }
        return {}
    }

    createLayer() {
        const vectorSource = new ol.source.Vector({
            format: new ol.format.WFS(),
            url: this.obj.url,
            strategy: ol.loadingstrategy.bbox
        })

        this.registerFeature()

        return new ol.layer.Vector({
            source: vectorSource,
            style: this.obj.style
        })
    }

    getLayer() {
        return this.layer
    }

    getPopup() {
        return this.popup
    }

}

export default function WFS(args) {
    return new _WFS(args)
}
