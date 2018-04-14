import React from 'react'

export default {
    popupStationPoint: {
        name: ((layer) => layer.type.name),
        content: ((layer, feature) => {
            const station = layer.getUuid().find((el) => el.uuid === feature.id).obj
            return (
                <div >
                    <b>{station.station.code} </b>:
                    <br />{feature.name}
                </div>)
        })
    },
    popupSitePoint: {
        name: ((layer) => layer.type.name),
        content: ((layer, feature) => {
            const station = layer.getUuid().find((el) => el.uuid === feature.id).obj
            return (
                <div >
                    <b>{station.code} </b>:
                    <br />{feature.name}
                </div>)
        })
    },
    popupKmlCity: {
        name: ((layer, feature) => feature.NAME),
        content: ((layer, feature) => {
            return (
                <div ><b>{feature.NAME}</b><br />
                    Code postal : {feature.CODE_POSTAL}<br />
                    Population : {feature.POPULATION}<br />
                    Département : {feature.CODE_DEPARTMENT}<br />
                </div>)
        })
    },
    popupKmlWaterSheed: {
        name: ((layer, feature) => feature.CODE), content: ((layer, feature) => {
            return (
                <div ><b>{feature.CODE}</b><br />
                    Nom : {feature.NAME}<br />
                </div>)
        })
    }
}
