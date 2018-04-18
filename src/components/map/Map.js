import React, { Component } from 'react'
import ol from 'openlayers'
import moment from 'moment'
import PropTypes from 'prop-types'
import { client } from '../../home/actions/HomeAction'
import mapIcon from '../../../www/images/map-icon.png'
import { getPayload } from '../../utils/ActionUtils'
import DtoPosition from '../../home/dto/DtoPosition'

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: getPayload().id
        }
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
                center: ol.proj.fromLonLat([this.props.coords.longitude, this.props.coords.latitude]),
                zoom: 16
            })
        })
        this.points = {}
        this.map = map
        this.receiveSockets()
        this.createPositions()
    }

    receiveSockets() {
        client().on('lookerMouv', pos => {
            if (pos.id !== this.state.id) {
                if (!this.points[pos.id]) {
                    this.map.addLayer(this.getSimpleLayer(pos.id, pos.longitude, pos.latitude))
                } else {
                    this.points[pos.id].getGeometry().setCoordinates(this.getPosition(pos.longitude, pos.latitude))
                }
            }
        })
    }

    createPositions() {
        this.props.positions.map(p => {
            const diff = moment().diff(moment(parseInt(p.timestamp)), 'minutes')
            if (diff < 10 && this.state.id !== p.id) {
                this.map.addLayer(this.getSimpleLayer(p.id, p.longitude, p.latitude))
                console.log(this.map, this.map.features)
            }
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.coords !== this.props.coords) {
            this.mouvPosition()
        }
        if (prevProps.positions !== this.props.positions) {
            this.createPositions()
        }
    }

    getSimpleLayer(id, longitude, latitude) {
        const position = new ol.source.Vector()
        const vector = new ol.layer.Vector({
            source: position
        })
        const point = new ol.Feature({
            geometry: new ol.geom.Point(this.getPosition(longitude, latitude)),
            name: id
        })
        this.points[id] = point
        point.setStyle(
            new ol.style.Style({
                image: new ol.style.Icon({
                    scale: 0.8,
                    anchor: [0.5, 1],
                    src: mapIcon
                }),
                zIndex: 1
            })
        )
        position.addFeature(point)
        return vector
    }

    getLookerLayer() {
        const { longitude, latitude } = this.props.coords
        const position = new ol.source.Vector()
        const vector = new ol.layer.Vector({
            source: position
        })
        const point = new ol.Feature({
            geometry: new ol.geom.Point(this.getPosition(longitude, latitude)),
            name: this.state.id
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
        longitude: PropTypes.number,
        timestamp: PropTypes.number
    }),
    positions: PropTypes.arrayOf(PropTypes.instanceOf(DtoPosition))
}

Map.defaultProps = {
    coords: {
        latitude: 0,
        longitude: 0,
        timestamp: 0
    }
}

export default Map
