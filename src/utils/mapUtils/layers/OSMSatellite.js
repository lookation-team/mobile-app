import Layers from '../ILayers'
import ol from 'openlayers'

class _OSMSatellite extends Layers {

    constructor() {
        super()
        this.layer = this.createLayer()
    }


    createLayer() {
        return new ol.layer.Tile({
            source: new ol.source.XYZ({
                attributions: [
                    new ol.Attribution({
                        html: 'Tiles &copy Esri &mdash Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    })
                ],
                url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            })
        })
    }

    getLayer() {
        return this.layer
    }

}

export default function OSMSatellite(...args) {
    return new _OSMSatellite(...args)
}
