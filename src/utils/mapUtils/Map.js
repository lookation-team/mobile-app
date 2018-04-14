import React from 'react'
import ol from 'openlayers'
import ReactDOM from 'react-dom'
import Popup from './Popup'

export default React.createClass({

    propTypes: {
        layers: React.PropTypes.arrayOf(React.PropTypes.object),
        popupProps: React.PropTypes.shape({ filters: React.PropTypes.arrayOf(React.PropTypes.string) }),
        mapConf: React.PropTypes.shape({
            size: React.PropTypes.number,
            center: React.PropTypes.array,
            zoom: React.PropTypes.number
        }),
        event: React.PropTypes.func,
        drawFunction: React.PropTypes.bool,
        radius: React.PropTypes.func,
        mouseWheelZoom: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            mapConf: {
                size: 300,
                center: [1.75, 47.5],
                zoom: 6
            },
            layers: [],
            popupProps: { filters: [] },
            drawFunction: false,
            event: () => {
            },
            radius: () => {
            },
            zoom: 10,
            mouseWheelZoom: true
        }
    },
    getInitialState() {
        return {
            event: {},
            popup: []
        }
    },
    componentWillMount() {
        let layersTab = this.props.layers.map(el => el.getLayer())
        if (this.props.drawFunction) {
            const source = new ol.source.Vector({ wrapX: false })

            const vector = new ol.layer.Vector({
                source: source
            })
            layersTab = [].concat(layersTab, vector)
            this.source = source
        }
        const map = new ol.Map({
            layers: layersTab,
            interactions: ol.interaction.defaults(
                { mouseWheelZoom: this.props.mouseWheelZoom }
            ),
            view: new ol.View({
                center: ol.proj.fromLonLat(this.props.mapConf.center),
                zoom: this.props.mapConf.zoom
            })
        })
        const ghostZoom = map.getView().getZoom()
        const self = this
        map.on('moveend', (() => {
            if (ghostZoom != map.getView().getZoom()) {
                self.setState({ zoom: map.getView().getZoom() })
            }
        }))

        this.olMap = map
        if (this.props.drawFunction) {
            const draw = new ol.interaction.Draw({
                source: this.source,
                type: 'Circle'
            })
            map.addInteraction(draw)
            this.listener = ''
            this.coord = ''
            this.radius = ''
            this.measureTooltipElement = ''
            this.measureTooltip = ''
            this.createMeasureTooltip()
            draw.on('drawstart',
                evt => {
                    evt.feature.getGeometry().on('change', (event) => {
                        let units = map.getView().getProjection().getUnits()
                        self.listener = event.target
                        self.measureTooltipElement.innerHTML = ((self.listener.getRadius() * ol.proj.METERS_PER_UNIT[units]) / 1000).toFixed(2)
                        self.measureTooltip.setPosition(self.listener.getLastCoordinate())
                    })
                }, this)
            draw.on('drawend',
                evt => {
                    self.coord = ol.proj.transform(evt.feature.getGeometry().getFirstCoordinate(), 'EPSG:3857', 'EPSG:4326')
                    self.radius = self.listener.getRadius() / 1000
                    self.props.radius(this.coord, this.radius)
                }, this)
        }
    },
    createMeasureTooltip() {
        if (this.measureTooltipElement) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement)
        }
        this.measureTooltipElement = document.createElement('div')
        this.measureTooltipElement.className = 'tooltip tooltip-measure'
        this.measureTooltip = new ol.Overlay({
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        })
        this.olMap.addOverlay(this.measureTooltip)
    },
    componentDidMount() {
        const map = ReactDOM.findDOMNode(this.refs.map)
        this.olMap.setTarget(map)
    },
    componentWillReceiveProps(nextProps) {
        const added = nextProps.layers.filter(next => {
            return !this.props.layers.find((prec) => prec === next)
        })

        added.forEach(element => {
            this.olMap.addLayer(element.getLayer())
        }, this)

        const removed = this.props.layers.filter(prec => {
            return !nextProps.layers.find((next) => prec === next)
        })

        removed.forEach((element) => {
            this.olMap.removeLayer(element.getLayer())
        }, this)

        this.olMap.getView().setCenter(ol.proj.fromLonLat(nextProps.mapConf.center))
        this.olMap.getView().setZoom(nextProps.mapConf.zoom)
    },

    clickMap(e) {
        e.preventDefault()
        if (!this.props.drawFunction) {
            this.setState({ event: { clientX: e.clientX, clientY: e.clientY } })
            if (this.props.event) {
                const coordinate = this.olMap.getCoordinateFromPixel(this.olMap.getEventPixel({
                    clientX: e.clientX,
                    clientY: e.clientY
                }))
                const pointTransform = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')
                this.props.event(pointTransform, this.state.zoom)
            }
        }
    },


    render() {
        return (
            <div id='map' style={{ height: this.props.mapConf.size + 'px' }} ref='map' onClick={this.clickMap}>
                <Popup olMap={this.olMap} layers={this.props.layers} event={this.state.event}
                       popupProps={this.props.popupProps}/>
            </div>
        )
    }
})
