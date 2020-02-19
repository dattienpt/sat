export function formatDateMMDDYYYY(date){
    if(typeof date == 'number'){
     let  data = new Date(date);
        return data.getDate() + '/' +data.getMonth()+1 +'/'+data.getFullYear(); 
    }else{
      return "";
    }
}