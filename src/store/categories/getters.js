export default {
    getCategories (state) {
        // function onlyUnique(value, index, self) { 
        //     return self.indexOf(value) === index;
        // }
        
        // usage example:        
        return unique = state.items.filter( (value, index, self)=>{
            return self.indexOf(value) === index;
        } ); 
      }
}