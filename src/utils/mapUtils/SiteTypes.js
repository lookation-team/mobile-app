import ol from 'openlayers'
import qualito from '../../../www/pictures/markers/map_quality.png'
import pluviometer from '../../../www/pictures/markers/mapmarker_pluie.gif'
import piezometer from '../../../www/pictures/markers/map_piezo.png'
import hydro from '../../../www/pictures/markers/mapmarker_hydro.gif'
import seaport from '../../../www/pictures/markers/mapmarker_blue_default.gif'
import industrialSite from '../../../www/pictures/markers/mapmarker_industrial_site.gif'
import treatment from '../../../www/pictures/markers/mapmarker_treatment_station.gif'
import pollutedSoil from '../../../www/pictures/markers/mapmarker_polluted_soil.gif'
import undefinedStation from '../../../www/pictures/markers/mapmarker_blue.gif'
import damStation from '../../../www/pictures/markers/barrage.png'
import productionFactory from '../../../www/pictures/markers/usine.png'
import notGood from '../../../www/pictures/markers/map_arrow_down_yellow.png'
import good from '../../../www/pictures/markers/map_arrow_right_green.png'
import userPosition from '../../../www/pictures/markers/map_current_position.png'

const createIconStyle = (imgsrc) => {
    return new ol.style.Style({
        image: new ol.style.Icon(({
            scale: 0.15,
            anchor: [0.48, 1],
            src: imgsrc
        }))
    })
}

export default {
    getType: (urlSiteType, types) => {
        const urlSplit = urlSiteType.split('/')
        const idType = urlSplit[urlSplit.length - 1]
        const dataFilter = types.find(type => type.id == idType)
        if (dataFilter && dataFilter.parameter && this[dataFilter.parameter]) {
            return this[dataFilter.parameter]
        }
        return this.PIEZOMETER
    },
    CURRENT_POSITION: {
        img: createIconStyle(userPosition),
        name: 'Position actuelle'
    },
    QUALITOMETER: {
        img: createIconStyle(qualito),
        name: 'Qualitomètre'
    },
    QUALITOMETER_SURFACE: {
        img: createIconStyle(qualito),
        name: 'Qualitomètre de surface'
    },
    PLUVIOMETER: {
        img: createIconStyle(pluviometer),
        name: 'Pluviomètre'
    },
    PIEZOMETER: {
        img: createIconStyle(piezometer),
        name: 'Piézomètre'
    },
    HYDROLOGICAL_STATION: {
        img: createIconStyle(hydro),
        name: 'Station Hydro'
    },
    SEAPORT: {
        img: createIconStyle(seaport),
        name: 'Marégraphes'
    },
    INDUSTRIAL_SITE: {
        img: createIconStyle(industrialSite),
        name: 'Site industriel'
    },
    OBSTACLE_FLOW: {
        img: createIconStyle(damStation),
        name: 'Obstacle à l\'écoulement'
    },
    TREATMENT_STATION: {
        img: createIconStyle(treatment),
        name: 'Station d\'épuration'
    },
    POLLUTED_SOIL: {
        img: createIconStyle(pollutedSoil),
        name: 'Sols pollués'
    },
    GOOD: {
        img: createIconStyle(good),
        name: 'En hausse'
    },
    NOT_GOOD: {
        img: createIconStyle(notGood),
        name: 'En baisse'
    },
    PRODUCTION_FACTORY: {
        img: createIconStyle(productionFactory),
        name: 'En baisse'
    },
    DAM: {
        img: createIconStyle(damStation),
        name: 'En baisse'
    },
    UNDEFINED: {
        img: createIconStyle(undefinedStation),
        name: 'Site associé'
    }
}
