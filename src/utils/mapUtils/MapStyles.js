
import ol from 'openlayers'

const fillBlack = (() => {
    const fill = new ol.style.Fill({
        color: ol.color.asString('rgba(255,255,255,0.5)')
    })
    const stroke = new ol.style.Stroke({
        color: ol.color.asString('#000000'),
        width: 2
    })
    return [
        new ol.style.Style({
            fill: fill,
            stroke: stroke
        })
    ]
})

const fillRed = (() => {
    const fill = new ol.style.Fill({
        color: ol.color.asString('rgba(255,255,255,0.3)')
    })
    const stroke = new ol.style.Stroke({
        color: 'rgba(255, 0, 0, 1.0)',
        width: 2
    })
    return [
        new ol.style.Style({
            fill: fill,
            stroke: stroke
        })
    ]
})

const fillBlue = (() => {
    const fill = new ol.style.Fill({
        color: ol.color.asString('rgba(255,255,255,0.3)')
    })
    const stroke = new ol.style.Stroke({
        color: 'rgba(255, 0, 0, 1.0)',
        width: 2
    })
    return [
        new ol.style.Style({
            fill: fill,
            stroke: stroke
        })
    ]
})


export default {
    FILL_RED: fillRed(),
    FILL_BLACK: fillBlack(),
    FILL_BLUE: fillBlue()
}
