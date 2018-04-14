import React from 'react'


export default React.createClass({

    propTypes: {
        layers: React.PropTypes.arrayOf(React.PropTypes.object),
        features: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    getInitialState() {
        return {
            selected: ''
        }
    },
    getDefaultProps() {
        return {
            layers: [],
            features: []
        }
    },
    getFeatureProxy(feature) {
        const handler = {
            get: function (target, name) {
                // You must use .get to access to props of feature.
                if (name === 'id') {
                    return target.getId()
                }
                return target.get(name)
            }
        }
        return new Proxy(feature, handler)
    },
    componentWillMount() {
        const feature = this.getFeatureProxy(this.props.features[0])
        const lay = this.props.layers.find(la => la.checkUuid(this.props.features[0].getId()))
        this.setState({ selected: lay.getPopup().content(lay, feature) })
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.features) {
            if (this.props.features.length > 1) {
                this.props.features.forEach(element => {
                    this['couche' + element.getId()].removeEventListener('click', this.handlerListener(element))
                })
            }

            const lay = nextProps.layers.find(la => la.checkUuid(nextProps.features[0].getId()))
            const feature = this.getFeatureProxy(nextProps.features[0])
            this.setState({ selected: lay.getPopup().content(lay, feature) })
        }
    },
    componentDidMount() {
        this.createListener()
    },
    componentDidUpdate(prevProps) {
        // no props check create too much listener
        if (prevProps.features !== this.props.features) {
            this.createListener()
        }
    },
    createListener() {
        if (this.props.features.length > 1) {
            this.props.features.forEach((element) => {
                // React can't trigger click on the map. You must use EventListener, after the DOM render.
                this['couche' + element.getId()].removeEventListener('click', this.handlerListener(element))
                this['couche' + element.getId()].addEventListener('click', this.handlerListener(element))
            })
        }
    },
    handlerListener(element) {
        return () => {
            const feature = this.getFeatureProxy(element)
            const lay = this.props.layers.find(la => la.checkUuid(element.getId()))
            return this.setState({ selected: lay.getPopup().content(lay, feature) })
        }
    },
    getContent() {
        // creation of childs components is too hard because you must use eventlistener over 2 components..
        const list = this.props.features.map(element => {
            const lay = this.props.layers.find(la => la.checkUuid(element.getId()))
            const feature = this.getFeatureProxy(element)
            return (<li key={element.getId()}><a className='truncate' ref={(el) => {
                this['couche' + element.getId()] = el
            }}>{lay.getPopup().name(lay, feature)}</a></li>)
        })

        if (list.length > 1) {
            return (
                <div className='row no-margin'>
                    <div className='col s4 border-right'>
                        <ul id='menu'>
                            {list}
                        </ul>
                    </div>
                    <div className='col s8'>
                        {this.state.selected}
                    </div>
                </div>)
        }
        return (
            <div className='row no-margin'>
                <div className='col s12'>
                    {this.state.selected}
                </div>
            </div>)
    },

    render: function () {
        const content = this.getContent()
        return (
            <div id='popover-content'>{content}</div>
        )
    }
})
