import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import HomeAction from '../actions/HomeAction'
import AppStore from '../../store/AppStore'
import Map from '../../components/map/Map'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    watchPosition() {
        AppStore.dispatch(HomeAction.watchPosition())
    }

    getContent() {
        if (this.props.coords.latitude && this.props.coords.latitude) {
            return (<Map coords={ this.props.coords }/>)
        }
        return (
            <div className='position-not-found row no-margin valign-wrapper'>
                <div className='col s12'>
                    <div className='row center-align'>
                        <h5>We can't find your position...</h5>
                    </div>
                    <div className='btn-wrapper'>
                        <button className='btn' onClick={ this.watchPosition }>Find me again</button>
                    </div>
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
        longitude: PropTypes.number
    })
}

const mapStateToProps = store => {
    return {
        coords: store.HomeReducer.coords
    }
}

export default connect(mapStateToProps)(Dashboard)
