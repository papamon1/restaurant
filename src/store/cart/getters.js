export default{
    // getTotalPrice(state, getters){
    //     debugger
    //     let sum=0
    //     state.items.forEach(element => {
    //       sum+=getters.calcPrice(element)*element.amount
    //     });
        
    //     return Math.round(sum * 100) / 100
    //   },
    //   calcPrice(element){      
    //     let sum=0
    //     let productFound = this.products.find(product => product._id === element._id)
    //     sum+=element.price
    //     if (this.element.size!=''){
    //       sum+= productFound.sizes.find((size)=>{
    //             return size._id === element.size;
    //         }).price
    //     }             
    //     //Extras

    //     element.extras.forEach(elementExtra => {
    //       sum+= this.extrasList.find((extra)=>{
    //             return elementExtra === extra._id;
    //         }).price
    //     });
                        
    //     return Math.round(sum*element.amount * 100) / 100
    //   },
}