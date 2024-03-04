import icons from './icon'

const {CiStar,FaStar} = icons

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-")

export const formatPrice = number => Number(number.toFixed(1)).toLocaleString()

export const renderStarfromNumber = number => {
    if(!Number(number)) return 
    const rating = []
    for (let i = 0; i < +number; i++){
        rating.push(<FaStar color='orange'/>)
    }
    for (let i = 0; i < 5-(+number); i++){
        rating.push(<CiStar color='orange'/>)
    }
    return rating
}