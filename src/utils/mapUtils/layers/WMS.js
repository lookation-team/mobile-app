
import Layers from 'mapUtils/ILayers'
import ol from 'openlayers'

class _WMS extends Layers {

	constructor(obj) {
		super()
		this.url = obj.url
		this.params = obj.params
		this.layer = this.createLayer()
	}

	createLayer() {
		return new ol.layer.Tile({
			source: new ol.source.TileWMS({
				url: this.url,
				params: this.params
			})
		})
	}
	getLayer() {
		return this.layer
	}

}

export default function WMS(...args) {
	return new _WMS(...args)
}


