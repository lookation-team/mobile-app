import {
    BLUE,
    WHITE,
    YELLOW,
    GREEN,
    RED,
    ORANGE,
    GREY
} from '../components/constants/ColorConstant'

const colors = [
    {
        constant: BLUE,
        color: 'blue'
    }, {
        constant: WHITE,
        color: 'white'
    }, {
        constant: YELLOW,
        color: 'yellow'
    }, {
        constant: GREEN,
        color: 'green'
    }, {
        constant: RED,
        color: 'red'
    }, {
        constant: ORANGE,
        color: 'orange'
    }, {
        constant: GREY,
        color: 'grey'
    }
]

const getColor = (constant) => {
    const color = colors.find((c) => c.constant == constant)
    return color ? color.color : 'white'
}

/* When bool=true => res=GREEN | bool=false => res=RED | bool=undefined => res=GREY  */
const getBooleanColor = (bool) => {
    if (!bool) {
        return (bool===false) ? RED : GREY
    }
    return GREEN
}


export { getColor, getBooleanColor }
