class Helper_Tools {
    constructor(parameters) {
        
    }

    active(el){
                      
                     if(el.classList.contains("active")){
                      el.classList.remove('active')
                     }else{
                      el.classList.add('active')
                     }
                      console.log(el.classList.contains("active"));
                    }
}

const helperTools=new Helper_Tools();

export default helperTools;