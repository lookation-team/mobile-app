import React, { Component } from 'react'
import ol from 'openlayers'
import PropTypes from 'prop-types'
import mapIcon from '../../../www/images/map-icon.png'

class Map extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                this.getLookerLayer()
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([1.41, 43]),
                zoom: 4
            })
        })
        this.map = map
        console.log(map)
    }

    componentDidUpdate() {
        this.mouvPosition()
    }

    getLookerLayer() {
        const { longitude, latitude } = this.props.coords
        const position = new ol.source.Vector()
        const vector = new ol.layer.Vector({
            source: position
        })
        const point = new ol.Feature({
            geometry: new ol.geom.Point(this.getPosition(longitude, latitude)),
            name: 'Me'
        })
        this.looker = point
        point.setStyle(
            new ol.style.Style({
                image: new ol.style.Icon({
                    scale: 0.5,
                    anchor: [0.5, 1],
                    src: mapIcon
                }),
                zIndex: 1
            })
        )
        position.addFeature(point)
        return vector
    }

    mouvPosition() {
        const { longitude, latitude } = this.props.coords
        this.looker.getGeometry().setCoordinates(this.getPosition(longitude, latitude))
    }

    getPosition(x, y) {
        return ol.proj.transform([+x, +y], 'EPSG:4326', 'EPSG:3857')
    }

    render() {
        return (
            <div>
                <div id='map' className='map'/>
            </div>
        )
    }
}

Map.propTypes = {
    coords: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number
    })
}

Map.defaultProps = {
    coords: {
        latitude: 0,
        longitude: 0
    }
}

export default Map
