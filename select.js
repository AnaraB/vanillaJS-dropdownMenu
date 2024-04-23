export default class Select {
  constructor(element) {
    this.element = element;
    //add all city options
    this.options = getFormattedOptions(element.querySelectorAll("option"));

    //create div that will contain ALL custom elements in the list
    this.customElement = document.createElement("div");
    // create span that gets hold of EACH label in the list
    this.labelElement = document.createElement("span");
    //create ul for each label
    this.optionsCustomElement = document.createElement("ul");

    setupCustomElement(this);
    //hide old default dropdown element
    element.style.display = "none";
    //append customElement to the class element
    element.after(this.customElement);
  }

  //create getter to return selected option
  get selectedOption() {
    return this.options.find((option) => option.selected);
  }

  //function to select city in dropdown list

  selectValue(value) {
    const newSelectedOption = this.options.find((option) => {
      return option.value === value;
    });
    const prevSelectedOption = this.selectedOption;
    //set previous selected flag to false
    //selected object is not selected
    prevSelectedOption.selected = false;
    //selected element is no longer selected
    prevSelectedOption.element.selected = false;
    
     //set current or new selected  to true
    newSelectedOption.selected = true
    newSelectedOption.element.selected = true

    this.labelElement.innerText = newSelectedOption.label
  }
}

function setupCustomElement(select) {
  select.customElement.classList.add("custom-select-container");
  // enable focusability on elm when TAB key is pressed; 0 means focus on close next elm
  select.customElement.tabIndex = 0;

  select.labelElement.classList.add("custom-select-value");
  select.labelElement.innerText = select.selectedOption.label;
  select.customElement.append(select.labelElement);

  select.optionsCustomElement.classList.add("custom-select-options");
  //create new  li element inside  ul by looping each option elm
  select.options.forEach((option) => {
    const optionElement = document.createElement("li");
    optionElement.classList.add("custom-select-option");
    //if option is selected add class 'selected'
    optionElement.classList.toggle("selected", option.selected);
    optionElement.innerText = option.label;
    optionElement.dataset.value = option.value;

    //add eventListener when city option is clicked
    optionElement.addEventListener("click", () => {
      select.optionsCustomElement
      // first select only an option that has selected city value
      //use string interpollation to select data-value and dynamically changing value
      .querySelector(
        `[data-value= "${select.selectedOption.value}"]`)
      // then remove 'selected'
      .classList.remove('selected')

      //select/highlight new selected option
      select.selectValue(option.value);
      //adds flag "selected" to it
      optionElement.classList.add('selected')
      //hide the dropdown list
      select.optionsCustomElement.classList.remove("show");
    });

    //display list of city options by appending optionElement to seleted
    select.optionsCustomElement.append(optionElement);
  });

  select.customElement.append(select.optionsCustomElement);

  select.labelElement.addEventListener("click", () => {
    select.optionsCustomElement.classList.toggle("show");
  });


  //when mouse is out of the dropdown list add 'blur' to loose focus (hide dropdown list)
  select.customElement.addEventListener('blur', () => {
    select.optionsCustomElement.classList.remove("show");

  })
}

//create function that takes each option and converts it into the js object
function getFormattedOptions(optionElements) {
  //first convert optionsElements into an array in order to map it
  //use spread operator
  return [...optionElements].map((optionElement) => {
    return {
      value: optionElement.value,
      label: optionElement.label,
      selected: optionElement.selected,
      element: optionElement,
    };
  });
}
