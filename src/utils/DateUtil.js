import moment from 'moment'

const getDateObj = (date) => {
    if (date) {
        return moment(date, 'DD/MM/YYYY').format()
    }
    return ''
}

const getDate = (date) => {
    if (date) {
        return (
            moment(date).format('DD/MM/YYYY')
        )
    }
    return ''
}
const getHour = (hour) => {
    if (hour) {
        return (
            moment(hour).format('HH:mm:ss')
        )
    }
    return ''
}

const getDateAndHourObj = (date, hour, format ='') => {
    if (date && hour) {
        return moment(`${getDate(date)} ${getHour(hour)}`, 'DD/MM/YYYY HH:mm:ss').format(format)
    }
    return ''
}

const getDateAndHour = (date, hour) => {
    if (date && hour) {
        return getDateAndHourObj(date, hour, 'DD/MM/YYYY HH:mm')
    }
    return ''
}

const getHourAndMinute = (hour) => {
    if (hour) {
        return (
            moment(hour).format('HH:mm')
        )
    }
    return ''
}
const getMiniDate = (date) => {
    if (date) {
        return (
            moment(date).format('DD/MM/YY')
        )
    }
    return ''
}
const getYearDate = (date) => {
    if (date) {
        return (
            moment(date).format('YYYY')
        )
    }
    return ''
}

const getDateExport = () => {
    return (
        moment().format('YYYYMMDDHHmmss')
    )
}

const getYear = (date) => {
    return moment(date).year()
}

const getYearOrString = (date, string) => {
    return (getYear(date)===getYear(new Date())) ? string : getYear(date)
}

const getDayDiff = (date1, date2) => {
    return moment(date1).diff(date2, 'days')
}

export { getDate, getMiniDate, getDayDiff, getYearDate, getYear, getHour, getDateExport, getYearOrString, getDateObj, getDateAndHourObj, getDateAndHour, getHourAndMinute }
