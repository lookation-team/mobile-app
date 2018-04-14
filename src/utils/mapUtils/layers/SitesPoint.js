import Layers from 'mapUtils/ILayers'
import ol from 'openlayers'
import { getWGS84Coordinate } from '../CoordinateUtils'

class _SitesPoint extends Layers {

    constructor(obj) {
        super()
        this.type = obj.type
        this.objPoints = obj
        this.popup = obj.popup
        this.layer = this.createLayer()
    }

    createLayer() {
        const features = this.objPoints.site.filter(point => point.localisation.x && point.localisation.y).map(point => {
            return this.createFeature(
                point.localisation.x,
                point.localisation.y,
                point.localisation.projection,
                this.objPoints.type.img,
                point.name,
                point
            )
        })
        const vectorSource = new ol.source.Vector({
            features: features
        })

        return new ol.layer.Vector({
            source: vectorSource
        })
    }

    getLayer() {
        return this.layer
    }

    createFeature(x, y, projection, style, name, site) {
        const center = getWGS84Coordinate(x, y, projection)
        const f = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform(center, 'EPSG:4326', 'EPSG:3857')),
            name: name
        })
        f.setId(this.registerFeature(site))
        f.setStyle(style)
        return f
    }

    getPopup() {
        return this.popup
    }
}

export default function SitesPoint(...args) {
    return new _SitesPoint(...args)
}


