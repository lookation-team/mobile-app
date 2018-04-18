import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import HomeAction from '../actions/HomeAction'
import AppStore from '../../store/AppStore'
import Map from '../../components/map/Map'
import Wait from '../../components/wait/Wait'
import DtoPosition from '../dto/DtoPosition'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        AppStore.dispatch(HomeAction.fetchLookersPositions())
    }

    watchPosition() {
        AppStore.dispatch(HomeAction.watchPosition())
    }

    componentWillUnMount() {
        AppStore.dispatch(HomeAction.clearPosition(this.props.watchId))
    }

    getContent() {
        if (this.props.coords.latitude && this.props.coords.latitude || !!1) {
            return (<Map coords={ this.props.coords } positions={ this.props.positions }/>)
        }
        const title = this.props.watchId ? 'We are looking for you!' : 'We can\'t find your position...'
        const action = this.props.watchId ? (
            <div className='center-align'>
                <Wait />
            </div>
        ) : (
            <div className='btn-wrapper'>
                <button className='btn' onClick={ this.watchPosition }>Find me again</button>
            </div>
        )
        return (
            <div className='position-not-found row no-margin valign-wrapper'>
                <div className='col s12'>
                    <div className='row center-align'>
                        <h5>{ title }</h5>
                    </div>
                    { action }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div id='dashboard' className='row no-margin'>
                <div className='col s12 no-padding'>
                    { this.getContent() }
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    coords: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        timestamp: PropTypes.number
    }),
    watchId: PropTypes.number,
    positions: PropTypes.arrayOf(PropTypes.instanceOf(DtoPosition))
}

const mapStateToProps = store => {
    return {
        coords: store.HomeReducer.coords,
        watchId: store.HomeReducer.watchId,
        positions: store.HomeReducer.positions
    }
}

export default connect(mapStateToProps)(Dashboard)
