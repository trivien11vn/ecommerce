import icons from './icon'

const {CiStar,FaStar} = icons

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-")

export const formatPrice = number => Number(number?.toFixed(1)).toLocaleString()

export const renderStarfromNumber = (number, size) => {
    if(!Number(number)) return 
    const rating = []
    for (let i = 0; i < +number; i++){
        rating.push(<FaStar color='orange' size= {size||16}/>)
    }
    for (let i = 0; i < 5-(+number); i++){
        rating.push(<CiStar color='orange' size= {size||16}/>)
    }
    return rating
}

export const validate = (payload, setInvalidField) =>{
    let invalids = 0
    const formatPayload = Object.entries(payload)
    for(let array of formatPayload){
        if(array[1].trim() === ""){
            invalids ++
            setInvalidField(prev => [...prev, {name: array[0], mes: "Require this field"}])
        }
    }
    // for(let array of formatPayload){
    //     switch (array[0]) {
    //         case 'email':
    //             const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //             if (!array[1].match(regex)){
    //                 invalids++
    //                 setInvalidField(prev => [...prev, {name: array[0], mes: "Email invalid"}])
    //             }
    //             break;
    //         case 'password':
    //             if (array[1].length<6){
    //                 invalids++
    //                 setInvalidField(prev => [...prev, {name: array[0], mes: "Password contains at least 6 characters"}])
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // }
    return invalids
}