import { filter, orderBy, take } from 'lodash'

const getResult = (list, nbResult) => {
    const order = ['distance', 'name', 'code']
    if (nbResult) {
        return take(orderBy(list, order, ['asc']), nbResult)
    }
    return orderBy(list, order, ['asc'])
}

const filterList = (list, filterInput, nbResult = 0) => {
    if (filterInput) {
        return getResult(filter(list, o => {
            const inName = o.name ? o.name.toLowerCase().includes(filterInput.toLowerCase()) : false
            return o.code.toLowerCase().includes(filterInput.toLowerCase()) || inName
        }), nbResult)
    }
    return getResult(list, nbResult)
}

export { filterList, getResult }
