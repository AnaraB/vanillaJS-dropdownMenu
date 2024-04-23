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
    //hide old default dropdown element
    element.style.display = 'none';
    //append customElement to the class element
    element.after(this.customElement)

  }

  //create getter to return selected option
  get selectedOption(){
   return this.options.find(option => option.selected)
  }
}


function setupCustomElement(select){
  select.customElement.classList.add('custom-select-container')
  // enable focusability on elm when TAB key is pressed; 0 means focus on close next elm
  select.customElement.tabIndex = 0 

  select.labelElement.classList.add('custom-select-value')
  select.labelElement.innerText = select.selectedOption.label
  select.customElement.append(select.labelElement)

  select.optionsCustomElement.classList.add('custom-select-options')
  //create new  li element inside  ul by looping each option elm
  select.options.forEach( option => {
    const optionElement = document.createElement('li')
    optionElement.classList.add('custom-select-option')
    //if option is selected add class 'selected'
    optionElement.classList.toggle('selected', option.selected)
    optionElement.innerText = option.label
    optionElement.dataset.value = option.value
    //display list of city options by appending optionElement to seleted 
    select.optionsCustomElement.append(optionElement)
  })

  select.customElement.append(select.optionsCustomElement)

  select.customElement.addEventListener('click', () => {
    select.optionsCustomElement.classList.toggle('show')
  })
}

  //create function that takes each option and converts it into the js object
function getFormattedOptions(optionElements){
  //first convert optionsElements into an array in order to map it
  //use spread operator
  return [...optionElements].map(optionElement => {
    return{
      value: optionElement.value,
      label: optionElement.label,
      selected: optionElement.selected,
      element: optionElement
    }
  })

}