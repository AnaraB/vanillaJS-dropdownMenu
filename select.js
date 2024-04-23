export default class Select {
  constructor(element){
    this.element = element
    //add all city options
    this.options = getFormattedOptions(element.querySelectorAll('option'))

 

    //create div that will contain ALL custom elements in the list
    this.customElement = document.createElement('div')
    // create span that gets hold of EACH label in the list
    this.labelElement = document.createElement('span')
    //create ul for each label 
    this.optionsCustomElement = document.createElement('ul')

    setupCustomElement(this)
    //append customElement to the class element
    element.after(this.customElement)

  }
}


function setupCustomElement(select){
  select.customElement.classList.add('custom-select-container')

  select.labelElement.classList.add('custom-select-value')
  select.customElement.append(select.labelElement)

  select.optionsCustomElement.classList.add('custom-select-options')
  select.customElement.append(select.optionsCustomElement)
}

  //create function that takes each option and converts it into the js object
function getFormattedOptions(optionElements){
  //first convert optionsElements into an array in order to map it
  //use spread operator
  [...optionElements].map(optionElement => {
    return{
      value: optionElement.value,
      label: optionElement.label,
      selected: optionElement.selected,
      element: optionElement
    }
  })

}