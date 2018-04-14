const nFormatter = (num) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(0).replace(/\.0$/, '') + 'G'
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(0).replace(/\.0$/, '') + 'M'
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0).replace(/\.0$/, '') + 'K'
    }
    return num
}

const getNumberFormat = (number) => {
    return Number(number).toLocaleString('fr-FR')
}

const getLongNumber = (number) => {
    return nFormatter(number)
}

const formatNumber = (number) => {
    return number.toFixed(3)
}

const formatFixedNumber = (number, fixedNumber) => {
    return number.toFixed(fixedNumber)
}

const getSuperiorAround = (value) => {
    return Math.ceil(value)
}
const getInferiorAround = (value) => {
    return Math.floor(value)
}

export { getNumberFormat, getLongNumber, nFormatter, formatNumber,formatFixedNumber, getSuperiorAround,getInferiorAround }
