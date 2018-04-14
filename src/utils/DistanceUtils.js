import { getWGS84Coordinate } from './mapUtils/CoordinateUtils'
const google = window.google

const getDistanceBetweenCoords = (lat1, lng1, proj1, lat2, lng2, proj2) => {
    const loc1 = getWGS84Coordinate(lng1, lat1, proj1)
    const loc2 = getWGS84Coordinate(lng2, lat2, proj2)
    const gLoc1 = new google.maps.LatLng(loc1[1], loc1[0])
    const gLoc2 = new google.maps.LatLng(loc2[1], loc2[0])
    return (google.maps.geometry.spherical.computeDistanceBetween(gLoc1, gLoc2)/1000).toFixed()
}

const getDistanceBetweenCoordsWGS84 = (loc1, loc2) => {
    const gLoc1 = new google.maps.LatLng(loc1[1], loc1[0])
    const gLoc2 = new google.maps.LatLng(loc2[1], loc2[0])
    return (google.maps.geometry.spherical.computeDistanceBetween(gLoc1, gLoc2)/1000).toFixed()
}

export { getDistanceBetweenCoords, getDistanceBetweenCoordsWGS84 }
