import React from 'react'
import ol from 'openlayers'
import ReactDOM from 'react-dom'
import PopupContent from './PopupContent'

export default React.createClass({

    propTypes: {
        olMap: React.PropTypes.instanceOf(ol.Map),
        event: React.PropTypes.shape({ clientX: React.PropTypes.number, clientY: React.PropTypes.number }),
        layers: React.PropTypes.arrayOf(React.PropTypes.object),
        popupProps: React.PropTypes.shape({ filters: React.PropTypes.arrayOf(React.PropTypes.string) })
    },
    getDefaultProps() {
        return {
            olMap: {},
            event: {},
            layers: [],
            popupProps: { filters: [] }
        }
    },
    getInitialState() {
        return {
            feature: []
        }
    },
    componentDidMount() {
        const container = ReactDOM.findDOMNode(this.refs.popup)
        this.popup = new ol.Overlay({
            positioning: 'bottom-center',
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            },
            offset: [0, 0]
        })
        this.props.olMap.addOverlay(this.popup)
        this.popup.setElement(container)
    },

    componentWillReceiveProps(nextProps) {
        const arr = []
        const popup = this.popup
        nextProps.olMap.forEachFeatureAtPixel(this.props.olMap.getEventPixel(nextProps.event), feature => {
            const havePopup = (() => {
                const layer = this.props.layers.find(la => la.checkUuid(feature.getId()))
                if (layer) {
                    return layer.getPopup()
                }
                return null
            })
            const isOnFilter = this.props.popupProps.filters.includes(feature.getGeometry().getType())
            if (havePopup && isOnFilter) {
                arr.push(feature)
            }
        })
        if (arr.length > 0) {
            this.setState({ feature: arr })
            popup.setPosition(this.props.olMap.getCoordinateFromPixel(this.props.olMap.getEventPixel(nextProps.event)))
        } else {
            popup.setPosition(undefined)
        }
    },

    getContent() {
        if (this.state.feature.length > 0) {
            const filterLayers = this.state.feature.map(ft => this.props.layers.find(la => la.checkUuid(ft.getId())))
            return (<PopupContent features={ this.state.feature } layers={ filterLayers } />)
        }
        return []
    },

    render: function () {
        const popupContent = this.getContent()
        return (
            <div ref='popup' className='ol-popup'>
                { popupContent }
            </div>
        )
    }
})
