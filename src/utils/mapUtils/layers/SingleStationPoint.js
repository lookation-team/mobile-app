import Layers from '../ILayers'
import ol from 'openlayers'
import { getWGS84Coordinate } from '../CoordinateUtils'


class _SingleStationPoint extends Layers {

    constructor(obj) {
        super()
        this.type = obj.type
        this.objPoints = obj
        this.layer = this.createLayer()
    }

    createLayer() {
        const feature = this.createFeature(
            this.objPoints.site.x,
            this.objPoints.site.y,
            this.objPoints.site.projection,
            this.objPoints.type.img,
            this.objPoints.site.name,
            this.objPoints.site
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
}

export default function SingleStationPoint(...args) {
    return new _SingleStationPoint(...args)
}
