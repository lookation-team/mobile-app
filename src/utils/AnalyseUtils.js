import { reduce, maxBy, map, sumBy, flatten, filter, find } from 'lodash'
import { formatFixedNumber, formatNumber, getInferiorAround, getSuperiorAround } from './NumberUtil'
import stats from 'stats-lite'

const colors = {
    red: 5,
    orange: 4,
    yellow: 3,
    green: 2,
    blue: 1
}

const remarks = [
    {
        id: 1,
        code: 1,
        plot: 'square',
        color: 'blue',
        title: '',
        logo: '■'
    }, {
        id: 2,
        code: 2,
        plot: 'circle',
        color: 'orange',
        title: '',
        logo: '●'
    }, {
        id: 3,
        code: 3,
        plot: 'diamond',
        color: 'red',
        title: '',
        logo: '◆'
    }, {
        id: 10,
        code: 10,
        plot: 'triangle',
        color: 'black',
        title: '',
        logo: '▲'
    }
]

const getRemarks = (id) => {
    return find(remarks, (o) => {
        return o.id == id
    })
}

const buildObject = (value, parameter = '', unit = '', color = 'white', textColor = 'black', remarkCode = '', inverse = false) => {
    return {
        value: value ? value.toString() : '',
        color: color.toString(),
        textColor: textColor.toString(),
        inverse: inverse.toString(),
        remarkCode: remarkCode ? remarkCode.toString() : '',
        parameter: parameter ? parameter.toString() : '',
        unit: unit ? unit.toString() : ''
    }
}

const getThresholdsColor = (thresholdSelected, value, reverse = false) => {
    if (thresholdSelected.threshold1 || thresholdSelected.threshold1.toString() == '0') {
        if (thresholdSelected.threshold2) {
            if (thresholdSelected.threshold3) {
                if (thresholdSelected.threshold4) {
                    if (value > thresholdSelected.threshold4) {
                        return !reverse ? 'red' : 'blue'
                    } else if (value > thresholdSelected.threshold3 && value < thresholdSelected.threshold4) {
                        return !reverse ? 'orange' : 'green'
                    } else if (value > thresholdSelected.threshold2 && value < thresholdSelected.threshold3) {
                        return 'yellow'
                    } else if (value > thresholdSelected.threshold1 && value < thresholdSelected.threshold2) {
                        return !reverse ? 'green' : 'orange'
                    } else if (value <= thresholdSelected.threshold1) {
                        return !reverse ? 'blue' : 'red'
                    }
                } else if (value > thresholdSelected.threshold3) {
                    return !reverse ? 'red' : 'blue'
                } else if (value > thresholdSelected.threshold2 && value < thresholdSelected.threshold3) {
                    return 'yellow'
                } else if (value > thresholdSelected.threshold1 && value < thresholdSelected.threshold2) {
                    return !reverse ? 'green' : 'orange'
                } else if (value <= thresholdSelected.threshold1) {
                    return !reverse ? 'blue' : 'red'
                }
            } else if (value > thresholdSelected.threshold2) {
                return !reverse ? 'red' : 'blue'
            } else if (value > thresholdSelected.threshold1 && value <= thresholdSelected.threshold2) {
                return !reverse ? 'green' : 'orange'
            } else if (value <= thresholdSelected.threshold1) {
                return !reverse ? 'blue' : 'red'
            }
        } else if (value > thresholdSelected.threshold1) {
            return !reverse ? 'red' : 'blue'
        } else if (value <= thresholdSelected.threshold1) {
            return !reverse ? 'blue' : 'red'
        }
        return 'white'
    }
    return 'white'
}

const getQualityThresholds = (parameter, unit, qualityThersholds) => {
    if (qualityThersholds.length > 0) {
        const thresholdSelected = qualityThersholds.find((b) => {
            if (b.parameterCode) {
                if (b.unit) {
                    return b.parameterCode.toString() === parameter.toString() && b.unit.toString() === unit.toString()
                }
                return b.parameterCode.toString() === parameter.toString()
            }
            return false
        })
        if (!thresholdSelected) {
            return qualityThersholds.find((b) => {
                return !b.parameterCode && !b.unit
            })
        }
        return thresholdSelected
    }
    return undefined
}

const getColorForThreshold = (thresholdSelected, value) => {
    if (thresholdSelected.threshold1 && thresholdSelected.threshold2) {
        const ckeckInverse = thresholdSelected.threshold1 > thresholdSelected.threshold2
        return [getThresholdsColor(thresholdSelected, value, ckeckInverse), ckeckInverse]
    }
    return [getThresholdsColor(thresholdSelected, value), false]
}

const getObject = (remarkCode, value, parameter, unit, qualityThresholds) => {
    const thresholdSelected = getQualityThresholds(parameter, unit, qualityThresholds)
    switch (remarkCode) {
        case '0':
            return buildObject('', parameter, unit, thresholdSelected ? 'gray' : 'white', 'black', remarkCode)
        case '1':
            const result = thresholdSelected ? getColorForThreshold(thresholdSelected, value) : ['white', false]
            return buildObject(value, parameter, unit, result[0], 'black', remarkCode, result[1])
        case '2':
            return buildObject('<' + value, parameter, unit, thresholdSelected ? 'blue' : 'white', 'black', remarkCode)
        case '10':
            return buildObject('<' + value, parameter, unit, thresholdSelected ? 'blue' : 'white', 'black', remarkCode)
        case '3':
            return buildObject('>' + value, parameter, unit, thresholdSelected ? 'red' : 'white', 'black', remarkCode)
        default:
            return buildObject(value, parameter, unit, thresholdSelected ? 'blue' : 'white', 'black', remarkCode)
    }
}

const getReduceMax = (tabValue) => {
    return reduce(tabValue, (result, objectValue) => {
        if (result[objectValue.color]) {
            result[objectValue.color.toString()] = [].concat(result[objectValue.color], [objectValue])
        } else {
            result[objectValue.color.toString()] = [].concat([], [objectValue])
        }
        return result
    }, {})
}

const getMaxColor = (reduceMax) => {
    return maxBy(Object.keys(reduceMax), (o) => {
        return colors[o]
    })
}

const getMaxValue = (tab) => {
    return maxBy(tab, (o) => {
        return o.value
    })
}

const searchMaxValue = (tabValue, classe = false) => {
    if (classe) {
        const objectTab = Object.keys(tabValue).map((key) => {
            if (tabValue[key] && tabValue[key].color) {
                return tabValue[key]
            }
            return false
        })
        const filterMap = filter(objectTab, (o) => {
            return o
        })
        const reduceMax = getReduceMax(filterMap)
        const color = getMaxColor(reduceMax)
        return buildObject(color && colors[color] ? colors[color] : '', '', '', color)
    }
    if (tabValue.length > 1) {
        const reduceMax = getReduceMax(tabValue)
        const color = getMaxColor(reduceMax)
        if (color) {
            return getMaxValue(reduceMax[color])
        }
        return getMaxValue(tabValue)
    }
    return tabValue[0]
}

const getValue = (value) => {
    return parseFloat(value.replace('<', ''))
}

const searchMinMaxValue = (tabValue, minMaxByFunc) => {
    return minMaxByFunc(tabValue, (o) => getValue(o.value))
}

const getFlattenMapReducer = (reducer) => {
    return flatten(map(reducer, (val) => {
        return val
    }))
}

const getAverageValue = (object) => {
    switch (object.remarkCode) {
        case '1':
            return object
        case '3':
            return object
        case '2':
            return Object.assign({}, object, {
                value: getValue(object.value) / 2
            })
        case '10':
            return Object.assign({}, object, {
                value: getValue(object.value) / 2
            })
        default:
            return Object.assign({}, object, {
                value: 0.0
            })
    }
}
const getPercentileValue = (object) => {
    switch (object.remarkCode) {
        case '1':
            return object
        case '3':
            return object
        case '2':
            return Object.assign({}, object, {
                value: getValue(object.value) / 2
            })
        case '10':
            return Object.assign({}, object, {
                value: getValue(object.value) / 2
            })
        default:
            return Object.assign({}, object, {
                value: 0.0
            })
    }
}
const searchAverageValue = (tabValue) => {
    if (tabValue.length > 0) {
        const reduceRemark = reduce(tabValue, (result, objectValue) => {
            if (result[objectValue.remarkCode]) {
                result[objectValue.remarkCode] = [].concat(result[objectValue.remarkCode], [objectValue])
            } else {
                result[objectValue.remarkCode] = [].concat([], [objectValue])
            }
            return result
        }, {})
        const arrayReduce = getFlattenMapReducer(reduceRemark)
        const mapValue = arrayReduce.map((object) => {
            return getAverageValue(object)
        })
        const sumValue = sumBy(mapValue, (a) => {
            return getValue(a.value) ? getValue(a.value) : 0.0
        })
        return buildObject(sumValue.toString() ? formatNumber(sumValue / mapValue.length) : '', tabValue[0].parameter, tabValue[0].unit)
    }
    return undefined
}


const searchQuantile = (tabValue, percentileValue) => {
    if (tabValue.length > 1) {
        const reduceRemark = reduce(tabValue, (result, objectValue) => {
            if (result[objectValue.remarkCode]) {
                result[objectValue.remarkCode] = [].concat(result[objectValue.remarkCode], [objectValue])
            } else {
                result[objectValue.remarkCode] = [].concat([], [objectValue])
            }
            return result
        }, {})
        const arrayReduce = getFlattenMapReducer(reduceRemark)
        const mapValue = arrayReduce.map((object) => {
            return getPercentileValue(object).value
        }).sort()
        const quantile = stats.percentile(mapValue, percentileValue)
        return buildObject(quantile ? formatNumber(quantile) : '', tabValue[0].parameter, tabValue[0].unit)
    }
    return undefined
}

const getInferiorOrSuperiorAround = (value) => {
    const tmp = value.toString().split('.')
    if (tmp[1]) {
        if (tmp[1] >= 0 && tmp[1] < 5) {
            return getInferiorAround(value)
        } else if (tmp[1] >= 5 && tmp[1] <= 9) {
            return getSuperiorAround(value)
        }
    }
    return value
}

const getAroundPositive = (value, quotient) => {
    return getInferiorOrSuperiorAround(((getSuperiorAround(formatFixedNumber(value * 100, 1)) / 10) + quotient)) / 10
}
const getAroundNegative = (value, quotient) => {
    return getInferiorAround(((getInferiorAround(formatFixedNumber((value * 100), 1)) / 10) - quotient)) / 10
}

const getMax = (value, reverse) => {
    const quotient = 0.5
    if (reverse ? value < 0 && value > -1 : value >= 0 && value < 1) {
        return reverse ? getAroundNegative(value, quotient) : getAroundPositive(value, quotient)
    } else if (reverse ? value <= -1 && value > -100 : value >= 1 && value < 100) {
        return reverse ? getAroundNegative(value, quotient * 10) : getAroundPositive(value, quotient * 10)
    } else if (reverse ? value <= -100 && value > -1000 : value >= 100 && value < 1000) {
        return reverse ? getAroundNegative(value, quotient * 100) : getAroundPositive(value, quotient * 100)
    } else if (reverse ? value <= -1000 && value > -10000 : value >= 1000 && value < 10000) {
        return reverse ? getAroundNegative(value, quotient * 1000) : getAroundPositive(value, quotient * 1000)
    } else if (reverse ? value <= -10000 && value > -100000 : value >= 10000 && value < 100000) {
        return reverse ? getAroundNegative(value, quotient * 10000) : getAroundPositive(value, quotient * 10000)
    }
    return value
}

const getMaxY = (value) => {
    if (value < 0) {
        return getMax(value, true)
    }
    return getMax(value, false)
}


export {
    searchMaxValue,
    searchAverageValue,
    searchQuantile,
    buildObject,
    getRemarks,
    remarks,
    getMaxY,
    getMax,
    getAroundPositive,
    getAroundNegative,
    getObject,
    searchMinMaxValue
}
