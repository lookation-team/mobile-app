import proj4 from 'proj4'

const getWGS84Coordinate = (x, y, projection) => {
    if (projection) {
        switch (projection) {
            case 2:
                return proj4('+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs', 'WGS84', [+x, +y])
            case 5:
                return proj4('+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs', 'WGS84', [+x, +y])
            case 26:
                return proj4('+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', 'WGS84', [+x, +y])
            case 16:
                return [+x, +y]
            case 31:
                return [+x, +y]
            case 0:
                return [2.4983333333333335, 46.6058333]
            default:
                return proj4('+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs', 'WGS84', [+x, +y])
        }
    }
    return proj4('+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs', 'WGS84', [+x, +y])
}

const getMiddle = (loc1, loc2) => {
    return getWGS84Coordinate(((loc1[0]+loc2[0])/2), ((loc1[1]+loc2[1])/2), 16)
}


export { getWGS84Coordinate, getMiddle }
