import React, { Component } from 'react'
import { push } from 'react-router-redux'
import AppStore from '../../store/AppStore'
import HomeAction from '../actions/HomeAction'
import { getBrutPath, getStationRange } from '../../utils/ActionUtils'

class Options extends Component{
    constructor(props) {
        super(props)
        this.state = {
            path: getBrutPath() || '',
            range: getStationRange()
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    onSubmit() {
        HomeAction.setStationRange(parseInt(this.state.range))
        if (this.state.path !== getBrutPath()) {
            AppStore.dispatch(HomeAction.testPath(this.state.path))
        } else {
            AppStore.dispatch(push('/'))
        }
    }

    handleChange(e) {
        this.setState({ path: e.target.value })
    }

    handleSelect(range) {
        this.setState({ range })
    }

    render() {
        const rangeOptions = [{ value: '2000', label: 'Toutes' }, { value: '5', label: '5 km' }, { value: '10', label: '10 km' }, { value: '20', label: '20 km' }, { value: '50', label: '50 km' }, { value: '100', label: '100 km' }]
        return (
            <div className='row server-form'>
                <ul className='collapsible no-margin' data-collapsible='expandable'>
                    <li className='server'>
                        <div className='collapsible-header active'>
                            <ul className='collection no-margin'>
                                <li className='collection-item avatar'>
                                    <div className='valign-wrapper'>
                                        <i className='material-icons circle'>dns</i>
                                        <h5 className='title'>Adresse du serveur</h5>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='collapsible-body'>
                            <div className='row'>
                                <div className='input-field flex-container valign-wrapper classic-form-style no-padding col s12'>
                                    <span className='flex-none preinfo'>{'https://'}</span>
                                    <input type='text' id='autocomplete-input' placeholder='example.aquasys.fr' className='flex-auto no-margin' value={ this.state.path } onChange={ this.handleChange } />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className='station-range'>
                        <div className='collapsible-header active'>
                            <ul className='collection no-margin'>
                                <li className='collection-item avatar'>
                                    <div className='valign-wrapper'>
                                        <i className='material-icons circle green'>filter_tilt_shift</i>
                                        <h5 className='title'>Rayon de recherche des stations</h5>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='collapsible-body'>
                            <div className='row no-margin'>
                                <div className='input-field col s12'>
                                    <div>Distance maximum de visibilité des stations</div>
                                    <select onChange={this.handleSelect} elements={rangeOptions} selected={this.state.range}>
                                        { rangeOptions.map(o => (<option selected={this.state.range === o.value} value={ o.value }>{o.label}</option>)) }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Options
