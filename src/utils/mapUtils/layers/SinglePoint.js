import Layers from 'mapUtils/ILayers'
import ol from 'openlayers'


class _SinglePoint extends Layers {

    constructor(x, y, type) {
        super()
        this.type = type
        this.x = x
        this.y = y
        this.layer = this.createLayer()
    }

    createLayer() {
        const feature = this.createFeature(
            this.x,
            this.y,
            this.type.img
        )
        const vectorSource = new ol.source.Vector({
            features: [feature]
        })

        return new ol.layer.Vector({
            source: vectorSource
        })
    }

    getLayer() {
        return this.layer
    }

    createFeature(x, y, style) {
        const f = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([+x, +y], 'EPSG:4326', 'EPSG:3857'))
        })
        f.setStyle(style)
        return f
    }
}

export default function SinglePoint(...args) {
    return new _SinglePoint(...args)
}


