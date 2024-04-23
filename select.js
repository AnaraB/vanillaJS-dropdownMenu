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

  get selectedOptionIndex() {
    return this.options.indexOf(this.selectedOption);
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
    newSelectedOption.selected = true;
    newSelectedOption.element.selected = true;

    this.labelElement.innerText = newSelectedOption.label;
    this.optionsCustomElement
      // first select only an option that has selected city value
      //use string interpollation to select data-value and dynamically changing value
      .querySelector(`[data-value= "${prevSelectedOption.value}"]`)
      // then remove 'selected'
      .classList.remove("selected");

    const newCustomElement = this.optionsCustomElement.querySelector(
      `[data-value= "${newSelectedOption.value}"]`
    );
    // then add 'selected'
    newCustomElement.classList.add("selected");
    // when new city is typed scroll mathching city and select with block: nearest
    newCustomElement.scrollIntoView({ block: "nearest" });
  }
}

let debounceTimeout;
let searchTerm;

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
      //select/highlight new selected option
      select.selectValue(option.value);
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
  select.customElement.addEventListener("blur", () => {
    select.optionsCustomElement.classList.remove("show");
  });

  //select option using key board, use switch
  select.customElement.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "Space":
        //open and slose dropdown with space key
        select.optionsCustomElement.classList.toggle("show");
        break;
      case "ArrowUp":{
        const prevOption = select.options[select.selectedOptionIndex - 1];
        if (prevOption) {
          select.selectValue(prevOption.value);
        }
        break;
      }
      case "ArrowDown":{
        const nextOption = select.options[select.selectedOptionIndex + 1];
        if (nextOption) {
          select.selectValue(nextOption.value);
        }
        break;
      }
      case "Enter":
      case "Escape":
        select.optionsCustomElement.classList.remove("show");
        break;
      default:
        //add select box functionality to look for city when typing it
        clearTimeout(debounceTimeout);
        //add keys to searchTerm
        searchTerm += e.key;
        debounceTimeout = setTimeout(() => {
          //reset the search after 500ms
          searchTerm = "";
        }, 500);
        //if searched keys match with keys in city option
        const searchedOption = select.options.find((option) => {
          return option.label.toLowerCase().startsWith(searchTerm);
        });

        if (searchedOption) select.selectValue(searchedOption.value);
    }
  });
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
