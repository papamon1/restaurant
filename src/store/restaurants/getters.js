export default{

    getOpeningTime(state){
        var ahora = new Date()
        if (ahora.getHours()<16){
            return `Comidas de ${parseInt(state.item.openingTime[ahora.getDay()].lunch.opening)} a ${parseInt(state.item.openingTime[ahora.getDay()].lunch.closing)}`
        }else{
            return `Cenas de ${parseInt(state.item.openingTime[ahora.getDay()].dinner.opening)} a ${parseInt(state.item.openingTime[ahora.getDay()].dinner.closing)}`
        }
    },

    isOpen(state){
        var ahora = new Date()
        if (ahora.getHours()<16){
            return ahora.getHours() >= parseInt(state.item.openingTime[ahora.getDay()].lunch.opening) && ahora <= parseInt(state.item.openingTime[ahora.getDay()].lunch.closing) 
        }else{
            return ahora.getHours() >= parseInt(state.item.openingTime[ahora.getDay()].dinner.opening) && ahora <= parseInt(state.item.openingTime[ahora.getDay()].dinner.closing) 
        }
    }

}