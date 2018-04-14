import Layers from 'mapUtils/ILayers'
import ol from 'openlayers'


class _StationPoint extends Layers {

	constructor(obj) {
		super()
		this.type = obj.type
		this.objPoints = obj
		this.popup = obj.popup
		this.layer = this.createLayer()
	}

	createLayer() {
		const features = this.objPoints.site.map(point => {
			return this.createFeature(
				point.station.site.siteLocalization.xCoordinate,
				point.station.site.siteLocalization.yCoordinate,
				this.objPoints.type.img,
				point.station.site.name,
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

	createFeature(x, y, style, name, site) {
		const f = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.transform([+x, +y], 'EPSG:4326', 'EPSG:3857')),
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

export default function StationPoint(...args) {
	return new _StationPoint(...args)
}


