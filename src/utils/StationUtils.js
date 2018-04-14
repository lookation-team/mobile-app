import React from 'react'
import favorit from '../../public/pictures/markers/favori.gif'
import unfavori from '../../public/pictures/markers/unfavori.gif'

const typeStation = [
    {
        code: 0,
        libelle: 'Point eau souterraine'
    }, {
        code: 1,
        libelle: 'Cours d\'eau'
    }, {
        code: 2,
        libelle: 'Plan d\'eau'
    }, {
        code: 3,
        libelle: 'Grand cours d\'eau'
    }, {
        code: 4,
        libelle: 'Milieu marin'
    }, {
        code: 5,
        libelle: 'Autre cours d\'eau et ravines'
    }, {
        code: 6,
        libelle: 'Source'
    }
]

const getFavorits = (id, list, detail = false) => {
    const classname = detail ? 'favorit-img' : 'small-favorit-img'
    if (list && list.length > 0) {
        const findFavorit = list.find((o) => o.id == id)
        if (findFavorit) {
            return (<img className={ classname } src={ favorit }/> )
        }
        if (detail) {
            return (<img className={ classname } src={ unfavori }/> )
        }
        return ''
    }
    return ''
}

const getStationType = (idType) => {
    return find(typeStation, (o) => {
        return o.code == idType
    })
}


export { getStationType, getFavorits }
