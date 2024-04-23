import Select from './select.js'

//get hold of all cities in city list, array
const selectElements = document.querySelectorAll('[data-custom')

//loop through each city in city list and instantiate each element
selectElements.forEach(selectElement => {
  console.log(new Select(selectElement)); 

})



