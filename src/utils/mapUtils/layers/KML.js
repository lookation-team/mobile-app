import Layers from 'mapUtils/ILayers'
import { checkStatus } from 'ActionUtils'
import ol from 'openlayers'


class _KML extends Layers {

    constructor(obj) {
        super()
        this.obj = obj
        this.kmlFormatWater = new ol.format.KML({
            extractStyles: obj.extractStyles || false
        })
        this.popup = obj.popup
        this.layer = this.createLayer()
    }
    onChangeVisibility(visibility){
        this.layer.setVisible(visibility)
    }


    getHeaders() {
        if (this.obj.headers) {
            return { Accept: 'application/vnd.google-earth.kml+xml' }
        }
        return {}
    }

    createLayer() {
        const that = this
        const vct = new ol.source.Vector({
            loader: function () {
                fetch(that.obj.url, {
                    headers: that.getHeaders(),
                    method: 'GET'
                })
                    .then(response => checkStatus({
                        200: ((rep) => rep.text()),
                        204: (() => [])
                    }, response))
                    .then((response = []) => {
                        const feature = that.kmlFormatWater.readFeatures(response, { featureProjection: 'EPSG:3857' })
                        feature.map(f => f.setId(that.registerFeature()))
                        vct.addFeatures(feature)
                    })
            },
            format: this.kmlFormatWater
        })
        return new ol.layer.Vector({
            source: vct,
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

export default function KML(args) {
    return new _KML(args)
}


