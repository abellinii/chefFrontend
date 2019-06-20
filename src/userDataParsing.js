


    export function getRecipes (input) {
      var list=[];
       //Break Object from keys
       var newInput = Object.entries(input)
         //Iterate through each day
         for (var [day,entrie] of newInput){
          //Break meals from days 
          var newInput = Object.entries(entrie)
            //Iterate through meals 

            for (var [time,entrie] of newInput){
               //Map through recipe ingredients
                list.push(entrie);

          }
       }
       
      return list

      }




     

         


class Enumeration {
  constructor(obj) {
    for (const key in obj) {
      this[key] = obj[key]
    }
    return Object.freeze(this)
  }
  has = (key) => {
    return this.hasOwnProperty(key)
  }
}

export const WEEK = new Enumeration({
  Monday:0,
  Tuesday:1,
  Wednesday:2,
  Thursday:3,
  Friday:4,
  Saturday:5,
  Sunday:6
})

export const MEAL = new Enumeration({
  Breakfast:0,
  Lunch:1,
  Dinner:2,
 
})



      