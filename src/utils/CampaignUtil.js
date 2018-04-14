import ColorConstant from '../components/constants/ColorConstant'
import { getDayDiff } from './DateUtil'

const getColorCampaign = (ending, nbIntegrated, nbAll) => {
    const eDate = new Date(ending)
    const now = new Date()
    if (eDate < now) {
        return ColorConstant.GREY
    } else if (nbIntegrated===nbAll) {
        return ColorConstant.GREEN
    }
    return (getDayDiff(eDate, now) < 31) ? ColorConstant.RED : ColorConstant.ORANGE
}

const getStationColor = dist => {
    if (!dist) {
        return ColorConstant.GREY
    }
    else if (dist < 0.5 && dist <= 3) {
        return ColorConstant.ORANGE
    }
    return (dist > 3) ? ColorConstant.RED : ColorConstant.BLUE
}

export { getColorCampaign, getStationColor }
