export default {

  getProductsByCategory: (state) => (id) => {    
    let products= state.items.filter(product=>{
      return product.category===id
    })
    return products
  }  
}